var person = mobx.observable({
	firstName: 'Matt',
	lastName: 'Ruby',
	age: 0,
	fullName: function () {
		console.count('fullName');
		return this.firstName + ' ' + this.lastName;
	}
});

mobx.autorun(function () {
	console.log('autorun: ' + person.fullName + ' ' + person.age);
});

// this will print Matt NN 1 times
mobx.transaction(function () {
	_.times(10, function () {
		person.age = _.random(40);
	});
});

person.firstName = 'Mike';
person.firstName = 'Lissy';

mobx.transaction(function () {
	person.firstName = 'Jon';
	person.lastName = 'Smith';
});
