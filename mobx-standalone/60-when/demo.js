var person = mobx.observable({
	firstName: 'Matt',
	lastName: 'Ruby',
	age: 0
});

// you can call the disposer() to kill off the when early.
var disposer = mobx.when(
	function () {
		console.log('Age: ' + person.age);
		return person.age >= 20;
	},
	function () {
		console.log('You\'re too old now.  I\'m done watching.');
	}
);

// this will print 'Age: NN' until the age randomly is 20 or higher
_.times(20, function () {
	person.age = _.random(40);
});