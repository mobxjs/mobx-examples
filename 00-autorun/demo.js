console.clear();

var person = mobx.observable({
	firstName: 'Matt',
	lastName: 'Ruby',
	age: 25,
	fullName: function () {
		console.count('fullName called');
		pausecomp(500);
		return this.firstName + ' ' + this.lastName;
	}
});

mobx.autorun(function () {
	console.time('Autorun');
	console.log(person.fullName + ' ' + person.age);
	console.timeEnd('Autorun');
});

_.times(10, function () {
	person.age = _.random(40);
});

// don't ever do this!!
// noprotect
function pausecomp (ms) {
	ms += new Date().getTime();
	while (new Date() < ms) {
	}
}
