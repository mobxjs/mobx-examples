mobx.useStrict(true);
var todoFactory = function (title) {

    var todo = {
        id: Math.random()
    };
    mobx.extendObservable(todo,
        {
            title: title,
            finished: false,
			toggleStatus: mobx.action(function toggleStatus () {
				todo.finished = !todo.finished;
			})
        }
    );
	return RemoteDev(todo, {name: 'Todo: ' + title});
};

var todoListFactory = function () {

    var todoList = mobx.observable({
        todos: [],
        unfinishedTodoCount: function () {
            return todoList.todos.filter(function (todo) {
                return !todo.finished;
            }).length;
        },
		addTodo: mobx.action(function addTodo (todo) {
			todoList.todos.push(todo);
		}),
		addTodos: mobx.action(function addTodos (todos) {
			todoList.todos = todoList.todos.concat(todos);
		})
    });

	return RemoteDev(todoList, {name: 'Todo List'});
};

var TodoListView = mobxReact.observer(function TodoListView() {
        var devtools = mobxDevtools ? React.createElement(mobxDevtools.default) : null;

        var listItems = this.props.todoList.todos.map(function (todo) {
            return React.createElement(TodoView, {todo: todo, key: todo.id});
        });

        return React.createElement('div', null,
            devtools,
            React.createElement('ul', null, listItems),
            'Tasks left: ' + this.props.todoList.unfinishedTodoCount
        );
    }
);

var TodoView = mobxReact.observer(
    React.createClass({
        displayName: 'TodoView',
        render: function () {
            var todo = this.props.todo;
            return React.createElement('li', null,
                React.createElement('input', {
                    type: 'checkbox',
                    checked: todo.finished,
                    onClick: this.selectHandler
                }),
                todo.title
            );
        },
        selectHandler: function () {
            this.props.todo.toggleStatus();
        }
    })
);

var store = todoListFactory();

ReactDOM.render(
    React.createElement(TodoListView, {todoList: store}),
    document.getElementById('mount')
);

store.addTodos([todoFactory('Get Coffee'), todoFactory('Write simpler code')]);
store.todos[0].toggleStatus(true);


