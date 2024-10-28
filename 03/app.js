"use strict";
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    test(text) {
        console.log(text);
    }
    greet(phrase) {
        console.log(`${phrase} ${this.name} and I'm ${this.age}years-old`);
    }
}
class Pet {
    constructor(name) {
        this.name = name;
    }
    greet(phrase) {
        console.log(`${phrase} ${this.name} and I'm pet`);
    }
}
let user1;
user1 = new Person('insu', 27);
user1.greet('Hi there, this is');
user1 = new Pet('Wilson');
user1.greet('Hi there, this is');
