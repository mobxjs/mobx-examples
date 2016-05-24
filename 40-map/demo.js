console.clear();

var person = mobx.observable({
	stats: mobx.map()
});

mobx.autorun(function () {
	console.log(person.stats.toJs());
});

person.stats.set('height', 6);
person.stats.set('weight', 155);
person.stats.set('height', 6);
person.stats.set('height', '5 feet, 11 inches');
person.stats.set('height', 5);
person.stats.delete('height');

mobx.transaction(function () {
	person.stats.set('weight', 160);
	person.stats.set('height', 6);
	person.stats.set('height', '5 feet, 11 inches');
	person.stats.set('height', 5);
});




