// interface - ts only
// it's used to describe Object !!!!!!!!!!
// IT'S NOT A BLUE PRINT !
// IT ENFORCE TO HAVE PROPERTIES AND METHOD

interface Named {
    name: string;
    age?: number;
}

interface Greetable extends Named {
    // 인터페이스는 다중 인터페이스 상속 가능 - extends Named, whateverSomethingelse
    greet(phrase: string): void;
}

// why interface?
// difference type and interface - 지금와서는 별 차이 없어 보이지만 예전에는 implements가 인터페이스만 가능했다고함
// interface advantage - it's almost like JAVA

class Person implements Greetable {
    constructor(public name: string, public age: number) {}

    test(text: string) {
        console.log(text);
    }

    greet(phrase: string) {
        console.log(`${phrase} ${this.name} and I'm ${this.age}years-old`);
    }
}

class Pet implements Greetable {
    constructor(public name: string) {}
    greet(phrase: string): void {
        console.log(`${phrase} ${this.name} and I'm pet`);
    }
}

let user1: Greetable;

user1 = new Person('insu', 27);
user1.greet('Hi there, this is');

user1 = new Pet('Wilson');
user1.greet('Hi there, this is');
