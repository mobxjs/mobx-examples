mobx.useStrict(true);

var person = mobx.observable({
    firstName: 'Matt',
    lastName: 'Ruby',
    age: 0,
    get fullName () {
        console.count('fullName');
        return this.firstName + ' ' + this.lastName;
    },
    setAge: mobx.action(function setAge(age) {
        var self = this;
        // Note how the action creates a transaction.
        // none of these random this.age assignments will affect the autorun.
        _.times(10, function () {
            self.age = _.random(40);
        });
        // this will set as it's the last part of the transaction
        this.age = age;
    }),
    setFirstName: mobx.action(function setFirstName(firstName) {
        this.firstName = firstName;
    }),
    setLastName: mobx.action(function setLastName(lastName) {
        this.lastName = lastName;
    }),
    setFirstAndLastName: mobx.action(function setFirstAndLastName (firstName, lastName) {
        this.setFirstName(firstName);
        this.setLastName(lastName);
    })
});

mobx.autorun(function auto_fullNameAge () {
    console.log(person.fullName + ' ' + person.age);
});

// this will print Matt NN 1 times
person.setAge(_.random(40));

// Note how we're changing 2 fields without using transaction.
// action wraps everything inside a transaction automatically
person.setFirstAndLastName('Jon', 'Smith');

// these will fire an error as we are in strict mode
person.firstName = 'Mike';
person.firstName = 'Lissy';
