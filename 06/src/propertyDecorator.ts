// 3. 속성 데코레이터
// 사용 용도
// - 속성 메타데이터 변경
// - 속성 검증

// 1. 읽기 전용 데코레이터

function Readonly(target: any, propertyKey: string) {
    let value = target[propertyKey]; // 초기 값 저장

    Object.defineProperty(target, propertyKey, {
        get() {
            return value;
        },
        set(newValue) {
            if (value !== undefined) {
                throw new Error(`${propertyKey} is read-only`);
            }
            value = newValue;
        },
        configurable: true,
        enumerable: true,
    });
}

class User111 {
    @Readonly
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}
const user = new User111('insu');
console.log(user.name);

console.log(user);

// user.name = 'Barney'; --> error

// 2. 기본값 설정 데코레이터

function DefaultValue(value: any) {
    return function (target: any, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            value: value,
            writable: true,
        });
    };
}

class Product {
    // @DefaultValue('Unknown')
    // name: string;
    // @DefaultValue(0)
    // price: number;
    // 위 처럼 하는것 보다
    // 아래 처럼 하는게 낫지않을까?..
    name = 'Unknown';
    price = '0';
}

const product = new Product();
console.log(product.name);
console.log(product.price);

// 3. 데이터 검증 데코레이터

function Positive(target: any, propertyKey: string) {
    let value: number;

    Object.defineProperty(target, propertyKey, {
        get: () => value,
        set(newValue: number) {
            if (newValue < 0) {
                throw new Error(`${propertyKey} 는 양수여야함`);
            }
            value = newValue;
        },
        enumerable: true,
        configurable: true,
    });
}

class Person2 {
    @Positive
    age: number;

    constructor(age: number) {
        this.age = age;
    }
}

const person2 = new Person2(25);
console.log(person2.age);
person2.age = -1;

// 4. 메타데이터 추가 데코레이터

function Metadata(key: string, value: any) {
    return function (target: any, propertyKey: string) {
        if (!target.constructor.metadata) {
            target.constructor.metadata = {};
        }
        target.constructor.metadata[propertyKey] = { [key]: value };
    };
}

class Book {
    @Metadata('required', true)
    title: string;

    @Metadata('maxLength', 100)
    description: string;

    constructor(title: string, description: string) {
        this.title = title;
        this.description = description;
    }
}

// 사용 예시
console.log((Book as any)['metadata']); // { title: { required: true }, description: { maxLength: 100 } }
