mobx.useStrict(true);

var countdownTimerFactory = function (durationMinutes, options) {

	var intervalID;

	var timer = {
		id: _.uniqueId('countdownTimer_'),
		originalMinutes: durationMinutes,
		originalMilliseconds: moment.duration(durationMinutes, 'minutes').asMilliseconds()
	};

	var settings = _.assign({
		interval: 100,
		runTime: 0
	}, options);

	mobx.extendObservable(timer, {
		durationAsMilliseconds: timer.originalMilliseconds,
		isTimerRunning: false,
		isComplete: function () {
			return timer.durationAsMilliseconds <= 0;
		},
		display: function () {
			return moment(timer.durationAsMilliseconds).format('mm : ss : SS');
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
		} else if(intervalID) {
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
		startGame: mobx.action('Start Game', function () {
			game.activeBlind.startBlindTimer();
		}),
		pauseGame: mobx.action('Start Game', function () {
			game.activeBlind.pauseBlindTimer();
		}),
		activateBlind: mobx.action('Activate Blind', function (blindToActivate) {
			_.forEach(game.blinds, function (blind) {
				blind.active = false;
			});
			blindToActivate.active = true;
		})
	});

	if (!game.activeBlind) {
		game.blinds[0].activateBlind();
	}

	mobx.autorun(function () {
		if(game.activeBlind.isComplete) {

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
	{duration: 1, little: 20, big: 10},
	{duration: 4, little: 30, big: 60},
	{duration: 4, little: 40, big: 80}
]);
// var testTimer = countdownTimerFactory(1);
// var testBlind = new Blind(1, 100, 50);
ReactDOM.render(
	React.createElement(Main, {
		game: game
	}),
	document.getElementById('mount')
);