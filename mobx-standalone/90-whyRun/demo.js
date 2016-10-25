var person = mobx.observable({
	firstName: 'Matt',
	lastName: 'Ruby',
	age: 0,
	// this field won't tell you about the fields
	get fullName () {
		// this call will not list out the observed fields!
		// Why? Because they haven't been accessed yet, so MobX doesn't know about them yet.
		mobx.whyRun();
		return this.firstName + ' ' + this.lastName;
	},
	// this field will show the observed fields
	get fullName2 () {
		var fullName = this.firstName + ' ' + this.lastName;
		mobx.whyRun();
		return fullName;
	},
	setFirstAndLastName: mobx.action(function setFirstAndLastName (firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	})
});

mobx.autorun(function auto_fullNameAge () {
	console.log('autorun fullName: ' + person.fullName + ' ' + person.age);
});

mobx.autorun(function auto_fullName2Age () {
	console.log('autorun fullName2: ' + person.fullName2 + ' ' + person.age);
});

person.setFirstAndLastName('Jon', 'Smith');
