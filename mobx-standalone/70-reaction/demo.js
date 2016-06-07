var person = mobx.observable({
	firstName: 'Matt',
	lastName: 'Ruby',
	age: 0
});

// note that this will not fire initially, only on change.
// so you will not see the age 0 run first unlike autorun.
mobx.reaction(function () {
	return person.firstName + ' ' + person.age;
}, function (fnameAndAge) {
	console.log('reaction: ' + fnameAndAge + ' ' + person.lastName);
});

// this will print Matt NN 10 times
_.times(10, function () {
	person.age = _.random(40);
});

// this will print nothing
_.times(10, function () {
	person.lastName = _.random(40);
});