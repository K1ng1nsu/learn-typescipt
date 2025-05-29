// Generics Funtions
// Constraints
// Generics Classes
// Special TypeScript Types - Utility Types

const names: Array<string | number> = ['insu', 'john', 1];
const names2: (string | number)[] = ['insu', 'john', 1];

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('This is done!');
  }, 2000);
});

promise.then((data) => {
  data.split(' ');
});

// 1. Generics Function

function merge(obj1: object, obj2: object) {
  return Object.assign({}, obj1, obj2);
}
const mergeObj = merge({ name: 'insu' }, { age: 27 });
// mergeObj. 접근이 안됨 ㅠㅠ

//제네릭을 쓰면?
function merge2<T, U>(obj1: T, obj2: U): T & U {
  return Object.assign({}, obj1, obj2);
}

const mergeObj2 = merge2({ name: 'insu' }, { age: 27 });
console.log(mergeObj2.name); // 접근가능

// 2. Constraints
// what if
const mergeObj3 = merge2({ name: 'insu' }, 27);
console.log(mergeObj3); // {name: 'insu'} theres no 27
//
function merge3<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  return Object.assign({}, obj1, obj2);
}
// const mergeObj4 = merge3({ name: 'insu' }, 27); // error
const mergeObj4 = merge3({ name: 'insu' }, { age: 27 });
console.log(mergeObj4); // {name: 'insu', age: 27}

//
interface Lengthy {
  length: number;
}
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value';
  if (element.length === 1) {
    descriptionText = `Got 1 value`;
  } else if (element.length > 1) {
    descriptionText = `Got ${element.length} values`;
  }
  return [element, descriptionText];
}

console.log(countAndDescribe('Hi there!'));

// key of
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return obj[key];
}
const c1 = extractAndConvert({ name: 'insu', age: 27 }, 'name');
// c1은 string으로 정해지는 반면,
// c2는 string| number임
// function extractAndConvert2<T extends object>(obj: T, key: keyof T) {
//     return obj[key];
// }
// const c2 = extractAndConvert2({ name: 'insu', age: 27 }, 'name');
//
// 3. Generics Class

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }
  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }
  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('insu');
textStorage.addItem('barney');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// const objStorage = new DataStorage<object>();
// objStorage.addItem({ name: 'insu' });
// objStorage.addItem({ name: 'barney' });
// // objStorage.removeItem({name:'insu'}); --> 논리적 오류 --> 제약조건 추가 원시타입만 가능하게

// 4. Special TypeScript Types
// Partial<> -> 이 객체는 나중에 괄호안에 것이 될거다.

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  return { title, description, completeUntil: date };
}

function createCourseGoal2(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  // 내용 검증 로직 등 ...
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

const namess: readonly string[] = ['insu', 'barney'];
const namesss: Readonly<string[]> = ['insu', 'barney']; // string[] 이 아닌 객체같은거면 더 유용함
// namess.push('Manu'); error

// 그 외 유틸리티 제네릭 https://www.typescriptlang.org/docs/handbook/utility-types.html
