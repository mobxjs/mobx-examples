console.clear();

var person = mobx.observable({
	firstName: 'Matt',
	lastName: 'Ruby',
	age: 25
});

mobx.autorun(function () {
	console.log(person.firstName + ' ' + person.age);
});

_.times(10, function () {
	person.age = _.random(40);
});
