var sampleArray = mobx.observable(["Matt", "Kelly"]);

var ListView = mobxReact.observer(function ListView() {
       return React.createElement('ul', null,
            this.props.list.map(function (name) {
                return React.createElement('div', {key: name}, name);
            })
        );
    }
);
ListView.propTypes = {
    list: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.instanceOf(Array)
    ]).isRequired
};

ReactDOM.render(
    React.createElement(ListView, {list: sampleArray}),
    document.getElementById('mount')
);


