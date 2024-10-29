// intersection types - 객체를 & 하면 합집합이 되는데 유니온 타입을 & 하면 교집합이 됨
// Type Guards
// Discriminated Unions(Tagged union) 구별된 유니온 - Type Guards 중 하나로
// Type Casting
// index type
// Function Overloads
// optional chaining
// Nullish Coalescing (??)

// 1. intersection types
// interface로도 가능하다

// 오브젝트를 intersection 하면 합친게 되는데 - 합집합
// union type 을 intersection 하면 겹친것만 됨 - 교집합
// c = a & b 가 있으면 a와 b를 모두 만족시키는 c가 나오는거

// 합집합이 됨
type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'insu',
    privileges: ['create-server'],
    startDate: new Date(),
};

// 교집합이 됨
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// 2. Type Guards -- 런타임시 타입체크라는 말
// typeof 나 in, instanceof, custom Type Guard 함수로 추론 타입을 좁혀
// 런타임 에러 방지, 컴파일러 자동완성 추론 기능 증대 이점이 있음

function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        // 위에
        return a.toString() + b.toString();
    }
    return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployee(emp: UnknownEmployee) {
    console.log(`Name: ${emp.name}`);

    // console.log(`Privilegs: ${emp.privileges}`); -> error

    if ('privileges' in emp) {
        console.log(`Privilegs: ${emp.privileges}`);
    }
    if ('startDate' in emp) {
        console.log(`Start Date: ${emp.startDate}`);
    }
}

printEmployee({ name: 'insu', startDate: new Date() });

class Car {
    drive() {
        console.log(`Driving...`);
    }
}
class Truck {
    drive() {
        console.log(`Driving a truck`);
    }

    loadCargo(amount: number) {
        console.log(`Loading cargo... ${amount}`);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();

    if (vehicle instanceof Truck) {
        // instanceof
        vehicle.loadCargo(1000);
    }
}

useVehicle(v1);
useVehicle(v2);

// 3. Discriminated Unions(Tagged union)
// interface 로 Unions type을 하면 실제 클래스도 뭣도 아니라서 Type guard를 할 수 없는데
// type 이나 kind 같은 프로퍼티를 추가시켜서 Type Guard를 사용하는 방법
interface Bird {
    type: 'bird';
    flyingSpeed: number;
}
interface Horse {
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log(`Moving apt speed: ${speed}`);
}

moveAnimal({ type: 'bird', flyingSpeed: 100 });

// 4. type casting
// as나 <>를 사용하여 타입스크립트 컴파일러가 알 수 없는 타입 정보를 전달
//

const paragraph = document.querySelector('p');
// const paragraph: HTMLParagraphElement | null

const paragraph2 = document.getElementById('message-output');
// const paragraph2: HTMLElement | null

const paragraph3 = document.getElementById('message-output') as HTMLInputElement;
// const paragraph3: HTMLInputElement

const paragraph4 = <HTMLInputElement>document.getElementById('message-output');
// const paragraph4: HTMLInputElement

// 5. index type
// 컨테이너가 더 유연하면 좋겠다 싶을 때, type을 제한하면서
interface ErrorContainer {
    // { email: 'Not a valid email', username: 'Must start with a character'}
    // prop의 이름도 아직 잘 모르겠고 몇 개가 올지도 모르겠지만
    // prop은 string 이어야하고 value도 string 이어야 한다.
    // [key: KeyType] : ValueType
    // [key in type1 | type2 ] : string;
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    email: 'Not a Valid email!',
    username: 'Must start with a capital character',
};

// 6. Function overload

function add1(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        // 위에
        return a.toString() + b.toString();
    }
    return a + b;
}

const result = add1(1, 5); //as number;
// 결과가 number라는걸 아는데 result는 string|number라고 한다.(casting을 해줘도 되긴 함 )
// 이럴 때 Function Overload를 사용함

function add2(a: number, b: number): number;
function add2(a: string, b: string): string; // 이 두개를 overload 시그니처라고 함
function add2(a: Combinable, b: Combinable) {
    // 실제 구현 부분 위의 모든 호출 방식의 타입을 포괄해야함
    if (typeof a === 'string' || typeof b === 'string') {
        // 위에
        return a.toString() + b.toString();
    }
    return a + b;
}

const result2 = add2(1, 5); // 이러면 number를 받는다는걸 안다

// 7. optional chaining

const user = {
    name: 'Alice',
    address: {
        city: 'Seoul',
        postalCode: '12345',
    },
};
// null 또는 undefined 가 아닌 경우에만 해당 속성이나 함수를 호출하도록 함 -> http 통신등으로 받는걸 정확히 모르는 경우 유용
console.log(user?.address?.city); // "Seoul"
console.log(user?.contact?.phone); // undefined (Error 없이 안전하게 접근)

// 8. nullish coalescing  널리쉬 병합, 널 병합 -- '??'
// 이는 || 연산자와는 달리 0, false, "" 같은 falsy 값은 유지하고, 오직 null과 undefined만 대체합니다
const userInput = '';
const userInput2 = null;

const storedData = userInput || 'DEFAULT'; // ''은 Falsy라서 DEFAULT가 되는데, 오직 null이나 undefined에만 fallback 하고싶을때

const storedData2 = userInput ?? 'DEFAULT';
