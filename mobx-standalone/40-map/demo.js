var person = mobx.observable({
	stats: mobx.asMap({})
});

mobx.autorun(function auto_statsToJS () {
	console.log('autorun: ' + person.stats);
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