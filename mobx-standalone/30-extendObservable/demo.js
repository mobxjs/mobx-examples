var Person = function (firstName, lastName, age) {
	this.id = _.uniqueId('person_');
	mobx.extendObservable(this, {
		firstName: firstName,
		lastName: lastName,
		age: age,
		get fullName () {
			console.count('fullName');
			return this.firstName + ' ' + this.lastName;
		}
	});
};

var person = new Person('Matt', 'Ruby', 0);

mobx.autorun(function auto_fullNameAge () {
	console.log(person.fullName + ' ' + person.age);
});

mobx.extendObservable(person, {nickname: 'Ruby'});

mobx.autorun(function () {
	console.log('Nickname: ' + person.nickname + ' ' + person.age);
});

person.firstName = 'Mike';
person.firstName = 'Lissy';
person.nickname = 'Red';