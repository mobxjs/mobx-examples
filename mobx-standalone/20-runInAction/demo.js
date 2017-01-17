var person = mobx.observable({
	firstName: 'Matt',
	lastName: 'Ruby',
	age: 0,
	get fullName () {
		console.count('fullName');
		return this.firstName + ' ' + this.lastName;
	}
});

mobx.autorun(function auto_fullNameAge () {
	console.log('autorun: ' + person.fullName + ' ' + person.age);
});

// this will print Matt NN 1 times
mobx.runInAction(function () {
	_.times(10, function () {
		person.age = _.random(40);
	});
});

person.firstName = 'Mike';
person.firstName = 'Lissy';

mobx.runInAction(function () {
	person.firstName = 'Jon';
	person.lastName = 'Smith';
});
