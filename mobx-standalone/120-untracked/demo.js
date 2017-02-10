var person = mobx.observable({
	firstName: 'Matt',
	lastName: 'Ruby',
	age: 0,
	get fullName () {
		console.log('hit fullName');
		return mobx.untracked(function () {
				return person.firstName
			}) + ' ' + this.lastName;
	}
});

mobx.autorun(function auto_fullNameAge () {
	console.log('autorun: ' + person.fullName + ' ' + person.age);
});

// this will print Matt Ruby NN 10 times
_.times(10, function () {
	person.age = _.random(40);
});

// these will not trigger the autorun due to the untracked value
person.firstName = 'Mike';
person.firstName = 'Lissy';

// this will trigger as lastname is still tracked
person.lastName = 'McAwesome';