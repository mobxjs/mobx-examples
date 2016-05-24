var logger = mobx.observable({
	logList: [],
	log: function (message) {
		this.logList.push(message);
	}
});

var renderLog = function () {
	React.render(
		React.createElement(logPrinter, {logger: logger}),
		document.getElementById('react-log')
	);
};

var logPrinter = mobxreact.observer(React.createClass({
	displayName: 'printer.log',
	render: function () {
		return _.map(this.props.logger.logList, function (logItem) {
			React.createElement('div', null, logItem);
		});
	}
}));
