// boolean
// number
// bigint
// string
// Array<> ,[]
// Enum
// any, unknown, void
// Union Types
// Type Aliases
// Interface
// Intersection Types
// Utility Types -> 05
// 등등..

let isDone: boolean = false;

let num: number = 6;

let str: string = 'Hello, World!';

let arr: number[] = [1, 2, 3];
let arr2: Array<number> = [1, 2, 3];

let bignum: bigint = 1111n;

enum Color {
    Red = 1,
    Green = 'green',
    Blue = 2,
}

let c: Color = Color.Green;

let anything: any = 4;

// 실제로는 undefined 반환함
function warnUser(): void {
    console.log('This is a warning message');
}

let n: null = null;

let u: undefined = undefined;

let obj: object = { name: 'John' };

let notSure: unknown = 4;

// Union Types
let id: number | string;
id = 10; // OK
id = 'hello'; // OK

// Type Aliases
type Point = { x: number; y: number };
let p1: Point = { x: 10, y: 20 };

// Interface
interface Person {
    name: string;
    age?: number; // 선택적 속성 '?'
}

let user1: Person = { name: 'Alice' };

// Intersection Types
interface A {
    a: string;
}
interface B {
    b: number;
}

type C = A & B;

const obj2: C = { a: 'hello', b: 42 };
