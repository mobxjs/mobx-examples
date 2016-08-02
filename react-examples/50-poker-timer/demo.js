mobx.useStrict(true);

var countdownTimerFactory = function (durationMilliseconds, options) {

	var intervalID;

	var timer = {
		id: _.uniqueId('countdownTimer_'),
		originalMilliseconds: durationMilliseconds
	};

	var settings = _.assign({
		interval: 10,
		runTime: 0,
		resetOnComplete: true
	}, options);

	mobx.extendObservable(timer, {
		durationAsMilliseconds: timer.originalMilliseconds,
		isTimerRunning: false,
		isComplete: function () {
			return timer.durationAsMilliseconds <= 0;
		},
		display: function () {
			return _.padStart(timer.minutesRemaining, 2, 0) + ' : '
				   + _.padStart(timer.secondsRemaining, 2, 0) + ' : '
				   + _.padEnd(timer.millisecondsRemaining, 3, 0);
		},
		durationAsDate: function () {
			return new Date(timer.durationAsMilliseconds);
		},
		millisecondsRemaining: function () {
			return timer.durationAsDate.getUTCMilliseconds();
		},
		secondsRemaining: function () {
			return timer.durationAsDate.getUTCSeconds();
		},
		minutesRemaining: function () {
			return timer.durationAsDate.getUTCMinutes();
		},
		hoursRemaining: function () {
			return timer.durationAsDate.getUTCHours();
		},
		percentageComplete: function () {
			return 100 - _.round((timer.durationAsMilliseconds / timer.originalMilliseconds) * 100, 2);
		},
		startTimer: mobx.action('startTimer', function () {
			timer.isTimerRunning = true;
		}),
		stopTimer: mobx.action('stopTimer', function () {
			timer.isTimerRunning = false;
		}),
		reset: mobx.action('resetTimer', function () {
			timer.stopTimer();
			timer.durationAsMilliseconds = timer.originalMilliseconds;
		})
	});

	mobx.autorun('countDownTimer', function () {
		if (timer.isTimerRunning) {
			intervalID = window.setInterval(function () {
				mobx.runInAction('timer tick', function () {
					timer.durationAsMilliseconds -= settings.interval;
					if (timer.isComplete) {
						timer.isTimerRunning = false;
					}
				});
			}, settings.interval);
		} else if (intervalID) {
			if (settings.resetOnComplete) {
				timer.reset();
			}
			window.clearInterval(intervalID);
		}
	});

	return timer;
};

var blindFactory = function (durationInMinutes, littleBlind, bigBlind) {

	var blind = {
		id: _.uniqueId('blind_')
	};

	mobx.extendObservable(blind, {
		bigBlind: bigBlind,
		littleBlind: littleBlind,
		active: false,
		timer: countdownTimerFactory(durationInMinutes),
		activateBlind: mobx.action(function activateBlind () {
			blind.active = true;
		}),
		isRunning: function () {
			return blind.timer.isTimerRunning;
		},
		isComplete: function () {
			return blind.timer.isComplete;
		},
		startBlindTimer: mobx.action(function startBlindTimer () {
			blind.timer.startTimer();
		}),
		pauseBlindTimer: mobx.action(function pauseBlindTimer () {
			blind.timer.stopTimer();
		}),
		resetBlindTimer: mobx.action(function resetBlindTimer () {
			blind.timer.reset();
		})
	});

	return blind;

};

var gameFactory = function (title, blindData) {
	var game = {
		id: _.uniqueId('game_'),
		title: title
	};

	mobx.extendObservable(game, {
		blinds: _.map(blindData, function (blind) {
			return blindFactory(blind.duration, blind.big, blind.little);
		}),
		activeBlind: function () {
			return game.blinds[game.activeBlindIndex];
		},
		activeBlindIndex: function () {
			return _.findIndex(game.blinds, 'active');
		},
		isRunning: function () {
			return game.activeBlind.isRunning;
		},
		isLastBlindActive: function () {
			return game.activeBlindIndex === game.blinds.length - 1;
		},
		isComplete: function () {
			return game.isLastBlindActive && game.activeBlind.isComplete;
		},
		startGame: mobx.action('Start Game', function () {
			game.activeBlind.startBlindTimer();
		}),
		pauseGame: mobx.action('Start Game', function () {
			game.activeBlind.pauseBlindTimer();
		}),
		resetGame: mobx.action('Reset Game', function () {
			_.forEach(game.blinds, function (blind) {
				blind.resetBlindTimer();
			});
			game.activateBlind(game.blinds[0]);
		}),
		endGame: mobx.action('Game Over!', function () {
			game.activateBlind(game.blinds[0]);
		}),
		activateBlind: mobx.action('Activate Blind', function (blindToActivate) {
			_.forEach(game.blinds, function (blind) {
				blind.active = false;
			});
			blindToActivate.active = true;
		}),
		activateNextBlind: mobx.action('Activate next blind', function () {
			game.activateBlind(game.blinds[game.activeBlindIndex + 1]);
		})
	});

	if (!game.activeBlind) {
		game.blinds[0].activateBlind();
	}

	mobx.autorun('Auto Next Blind', function () {
		if (game.isComplete) {
			game.resetGame();
		} else if (game.activeBlind.isComplete) {
			game.activateNextBlind();
			game.activeBlind.startBlindTimer();
		}
	});

	return game;
};


var Main = mobxReact.observer(React.createClass({
	displayName: 'Main',
	render: function () {
		return React.DOM.div(null,
			React.createElement(mobxDevtools.default),
			React.createElement(activeBlindRenderer, {blind: this.props.game.activeBlind}),
			React.createElement(timerControl, {game: this.props.game}, timerControl)
		);
	}
}));

var timerControl = mobxReact.observer(React.createClass({
	render: function () {
		var game = this.props.game;
		var children = [];

		if (game.isRunning) {
			children.push(React.DOM.button({onClick: this.handlePause}, 'pause'));
		} else {
			children.push(React.DOM.button({onClick: this.handleStart}, 'start'));
		}

		return React.DOM.div(null, children);
	},
	handleStart: function (event) {
		event.preventDefault();
		this.props.game.startGame();
	},
	handlePause: function (event) {
		event.preventDefault();
		this.props.game.pauseGame();
	}
}));

var activeBlindRenderer = mobxReact.observer(React.createClass({
	displayName: 'activeBlind',
	render: function () {
		var blind = this.props.blind;
		return React.DOM.div({className: 'active-blind'},
			React.createElement(timerPercentageCompleteRenderer, {timer: blind.timer}),
			React.createElement(timerRenderer, {timer: blind.timer}),
			React.DOM.div({className: 'blinds'},
				React.DOM.div(null, blind.littleBlind),
				React.DOM.div(null, blind.bigBlind)
			)
		);
	}
}));

var timerPercentageCompleteRenderer = mobxReact.observer(function (props) {
	return React.DOM.div({className: 'progress-bar-container'},
		React.DOM.div({className: 'progress-bar', style: {width: props.timer.percentageComplete + '%'}})
	);
});

var timerRenderer = mobxReact.observer(React.createClass({
	displayName: 'timer',
	render: function () {
		var timer = this.props.timer;
		return React.DOM.div(null, timer.display);
	}
}));

var game = gameFactory('test', [
	{duration: 10000, little: 20, big: 10},
	{duration: 1000, little: 30, big: 60},
	{duration: 1000, little: 40, big: 80}
]);
// var testTimer = countdownTimerFactory(1);
// var testBlind = new Blind(1, 100, 50);
ReactDOM.render(
	React.createElement(Main, {
		game: game
	}),
	document.getElementById('mount')
);