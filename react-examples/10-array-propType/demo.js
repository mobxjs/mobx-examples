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
    list: mobxReact.propTypes.arrayOrObservableArray.isRequired
};

ReactDOM.render(
    React.createElement(ListView, {list: sampleArray}),
    document.getElementById('mount')
);


