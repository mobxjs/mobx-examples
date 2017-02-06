var person = mobx.observable({
	names: [],
	names2: [
		{
			foo: 'Matt'
		}
	]
});

mobx.autorun(function () {
	console.log('will fire: ' + person.names);
});

// note how we're just observing the array, not the object values in the case
mobx.autorun(function () {
	console.log('wont fire: ' + person.names2);
});

person.names.push('Ruby');
person.names.push('Red');
person.names[1] = 'Orange';

// this will not fire as nothing is watching foo
person.names2[0].foo = 'test';