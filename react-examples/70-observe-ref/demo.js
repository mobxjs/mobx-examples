var isChecked = mobx.observable(false);

var Foo	= React.createClass({
        displayName: 'Foo',
        render: function () {
            return React.createElement('li', null,
                React.createElement('input', {
                    type: 'checkbox',
                    checked: this.isChecked,
                    onClick: this.onClick
                })
            );
        },
        onClick: function (clicked) {
            this.isChecked = clicked;
        }
    });

var Bar = mobxReact.observer(
	React.createClass({
		displayName: 'Bar',
		render: function () {
			return React.createElement(Foo, {
                ref: function(_foo) {this.foo = _foo}
            })
		},
        componentDidMount: function () {
            mobx.reaction(
                function() {
                    console.log("reaction: ", this.foo.isChecked);
                    return this.foo.isChecked;
                },
                function() {
                    console.log("This should console log: ", this.foo.isChecked);
                }
            );
        }
    })
);

ReactDOM.render(
	React.createElement(Bar, {}),
	document.getElementById('mount')
);