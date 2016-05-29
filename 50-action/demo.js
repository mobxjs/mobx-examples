var person = mobx.observable({
    firstName: 'Matt',
    lastName: 'Ruby',
    age: 0,
    fullName: function () {
        console.count('fullName');
        return this.firstName + ' ' + this.lastName;
    }
});
// you could also instatiate a Person and play with it's prototype.
_.assign(person, {
    setAge: mobx.action(function setAge(age) {
        this.age = age;
    }),
    setFirstName: mobx.action(function setFirstName(firstName) {
        this.firstName = firstName;
    }),
    setLastName: mobx.action(function setLastName(lastName) {
        this.lastName = lastName;
    })
});

mobx.autorun(function () {
    console.log(person.fullName + ' ' + person.age);
});

// this will print Matt NN 1 times
mobx.transaction(function () {
    _.times(10, function () {
        person.setAge(_.random(40));
    });
});
// these will still work as we're not in strict mode
person.firstName = 'Mike';
person.firstName = 'Lissy';

mobx.transaction(function () {
    person.setFirstName('Jon');
    person.setLastName('Smith');
});
