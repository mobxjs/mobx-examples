var person = mobx.observable({
	firstName: 'Matt',
	lastName: 'Ruby',
	age: 0
});

mobx.autorun(function auto_firstNameAge () {
	console.log('autorun: ' + person.firstName + ' ' + person.age);
});

// this will print Matt NN 10 times
_.times(10, function () {
	person.age = _.random(40);
});

// this will print nothing
_.times(10, function () {
	person.lastName = _.random(40);
});