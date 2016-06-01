var person = mobx.observable({
	firstName: 'Matt',
	lastName: 'Ruby',
	age: 0
});

mobx.spy(function (spyReport) {
	console.log(spyReport);
});

mobx.autorun(function printFirstNameAndAge() {
	console.log(person.firstName + ' ' + person.age);
});

// this will print Matt NN 10 times
_.times(2, function () {
	person.age = _.random(40);
});

