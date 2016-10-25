var person = mobx.observable({
	firstName: 'Matt',
	lastName: 'Ruby',
	age: 34,
	get fullName () {
		console.count('fullName');
		return this.firstName + ' ' + this.lastName;
	}
});

mobx.autorun(function auto_fullNameAge () {
	console.log('autorun: ' + person.fullName + ' ' + person.age);
});

person.firstName = 'Mike';
person.firstName = 'Lissy';