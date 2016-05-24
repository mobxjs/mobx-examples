var logger = mobx.observable({
	logList: [],
	log: function (message) {
		this.logList.push(message);
	}
});

var logPrinter = mobxReact.observer(React.createClass({
	displayName: 'printer.log',
	render: function () {
		return React.createElement('div', {},
			_.map(this.props.logger.logList, function (logItem, i) {
				return React.createElement(logItemRenderer, {logItem: logItem, key: i});
			})
		);
	}
}));

var logItemRenderer = mobxReact.observer(function logItem (props) {
	var logItem = props.logItem;
	var children = logItem;

	if(_.isObject(logItem)) {
		children = JSON.stringify(logItem);
	} else if(_.isArray(logItem)) {
		children = logItem.join(',');
	}

	return React.createElement('div', null, children);

});

var renderLog = function () {
	ReactDOM.render(
		React.createElement(logPrinter, {logger: logger}),
		document.getElementById('react-log')
	);
};

var wrapConsole = function () {
	console.clear();
	logger.logList = [];

	var original = console.log;
	console.log = function () {
		original.apply(console, arguments);
		logger.log.apply(logger, arguments);
	}
	renderLog();
};

window.onload = function () {
	wrapConsole();
};
