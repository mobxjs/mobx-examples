var sampleArray = mobx.observable(["Matt", "Kelly"]);

var obsArrayPropType =  React.PropTypes.oneOfType([
    React.PropTypes.array,
    function(props, propName, componentName) {
        if (!mobx.isObservableArray(props[propName])) {
            return new Error(
                'Invalid prop `' + propName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
            );
        }
    }
]);

var ListView = mobxReact.observer(function ListView() {
       return React.createElement('ul', null,
            this.props.list.map(function (name) {
                return React.createElement('div', {key: name}, name);
            })
        );
    }
);
ListView.propTypes = {
    list: obsArrayPropType.isRequired
};

ReactDOM.render(
    React.createElement(ListView, {list: sampleArray}),
    document.getElementById('mount')
);


