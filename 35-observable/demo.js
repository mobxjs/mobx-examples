var personFactory = function (firstName, lastName, age) {
	return mobx.observable({
		firstName: firstName,
		lastName: lastName,
		age: age,
		fullName: function () {
			console.count('fullName');
			return this.firstName + ' ' + this.lastName;
			}
	});
};

var person = personFactory('Matt', 'Ruby', 0);

mobx.autorun(function () {
	console.log(person.fullName + ' ' + person.age);
});

mobx.extendObservable(person, { nickname: 'Ruby'});

mobx.autorun(function () {
	console.log('Nickname: ' + person.nickname + ' ' + person.age);
});

person.firstName = 'Mike';
person.firstName = 'Lissy';
person.nickname = 'Red';