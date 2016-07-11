// Note how 'color' is referenced in observer then as regular props here
var Button = mobxReact.inject('color')(mobxReact.observer(React.createClass({
	render: function () {
		return React.createElement(
			"button",
			{style: {background: this.props.color}},
			this.props.children
		);
	}
})));

// Note how color is never referenced here
var Message = React.createClass({
	render: function () {
		return React.DOM.div(null,
			this.props.text,
			" ",
			React.createElement(
				Button, null, "Delete"
			)
		);
	}
});

// Note the Provider and color
var MessageList = React.createClass({
	childContextTypes: {
		color: React.PropTypes.string
	},
	render: function () {

		var children = this.props.messages.map(function (message) {
			return React.createElement(Message,
				{text: message.text, key: message.text});
		});

		return React.createElement(mobxReact.Provider, {color: 'green'}, React.DOM.div(null, children
		));
	}
});

ReactDOM.render(
	React.createElement(MessageList, {
		messages: [
			{text: 'Message 1'},
			{text: 'Message 2'},
			{text: 'Message 3'}
		]
	}),
	document.getElementById('mount')
);