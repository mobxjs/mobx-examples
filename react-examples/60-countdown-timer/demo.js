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
			return _.padStart(timer.minutesRemaining, 2, 0) + ' : ' + _.padStart(timer.secondsRemaining, 2, 0);
		},
		durationAsDate: function () {
			return new Date(timer.durationAsMilliseconds);
		},
		millisecondsRemaining: function () {
			return _.round(timer.durationAsDate.getUTCMilliseconds(), 2);
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

var Main = mobxReact.observer(function (props) {
	var timer = props.timer;
	return React.DOM.div(null,
		React.createElement(mobxDevtools.default),
		React.createElement(timerWithBar, {timer: timer}),
		React.createElement(timerControl, {timer: timer}, timerControl)
	);
});

var timerControl = mobxReact.observer(React.createClass({
	render: function () {
		var timer = this.props.timer;
		var button;

		if (timer.isTimerRunning) {
			button = React.DOM.button({onClick: this.handlePause}, 'pause');
		} else {
			button = React.DOM.button({onClick: this.handleStart}, 'start');
		}

		return React.DOM.div(null, button);
	},
	handleStart: function (event) {
		event.preventDefault();
		this.props.timer.startTimer();
	},
	handlePause: function (event) {
		event.preventDefault();
		this.props.timer.stopTimer();
	}
}));

var timerWithBar = mobxReact.observer(function (props) {
	var timer = props.timer;
	return React.DOM.div({className: 'active-blind'},
		React.createElement(timerPercentageCompleteRenderer, {timer: timer}),
		React.createElement(timerRenderer, {timer: timer})
	);
});

var timerPercentageCompleteRenderer = mobxReact.observer(function (props) {
	return React.DOM.div({className: 'progress-bar-container'},
		React.DOM.div({className: 'progress-bar', style: {width: props.timer.percentageComplete + '%'}})
	);
});

var timerRenderer = mobxReact.observer(function (props) {
	var timer = props.timer;
	return React.DOM.div(null, timer.display);
});

var timer = countdownTimerFactory(10000);
ReactDOM.render(
	React.createElement(Main, {
		timer: timer
	}),
	document.getElementById('mount')
);