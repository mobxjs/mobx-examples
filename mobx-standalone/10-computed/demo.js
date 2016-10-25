var person = mobx.observable({
	firstName: 'Matt',
	lastName: 'Ruby',
	age: 0,
	get fullName () {
		// Note how this computed value is cached.
		// We only hit this function 3 times.
		console.log('hit fullName');
		return this.firstName + ' ' + this.lastName;
	}
});

mobx.autorun(function auto_fullNameAge () {
	console.log('autorun: ' + person.fullName + ' ' + person.age);
});

// this will print Matt Ruby NN 10 times
_.times(10, function () {
	person.age = _.random(40);
});

person.firstName = 'Mike';
person.firstName = 'Lissy';