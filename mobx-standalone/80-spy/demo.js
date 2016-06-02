var person = mobx.observable({
	firstName: 'Matt',
	lastName: 'Ruby',
	age: 0
});

mobx.spy(function (spyReport) {
	// dig in here.  Have fun picking through all the different types.
	if (spyReport.type) {
		console.log(spyReport.type + ': rawSpyData: ', spyReport);
	}
});

mobx.autorun(function printFirstNameAndAge() {
	console.log(person.firstName + ' ' + person.age);
});

// this will print Matt NN 10 times
_.times(2, function () {
	person.age = _.random(40);
});

