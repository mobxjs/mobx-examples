var person = mobx.observable({
	firstName: 'Matt',
	lastName: 'Ruby',
	age: 0,
	fullName: function () {
		mobx.untracked(function () {
			console.log('hit fullName');
		});
		return this.firstName + ' ' + this.lastName;
	}
});

mobx.autorun(function () {
	console.log(person.fullName + ' ' + person.age);
});

// this will print Matt Ruby NN 10 times
_.times(10, function () {
	person.age = _.random(40);
});

person.firstName = 'Mike';
person.firstName = 'Lissy';
