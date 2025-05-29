// Generics Funtions
// Constraints
// Generics Classes
// Special TypeScript Types - Utility Types
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var names = ['insu', 'john', 1];
var names2 = ['insu', 'john', 1];
var promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('This is done!');
    }, 2000);
});
promise.then(function (data) {
    data.split(' ');
});
// 1. Generics Function
function merge(obj1, obj2) {
    return Object.assign({}, obj1, obj2);
}
var mergeObj = merge({ name: 'insu' }, { age: 27 });
// mergeObj. 접근이 안됨 ㅠㅠ
//제네릭을 쓰면?
function merge2(obj1, obj2) {
    return Object.assign({}, obj1, obj2);
}
var mergeObj2 = merge2({ name: 'insu' }, { age: 27 });
console.log(mergeObj2.name); // 접근가능
// 2. Constraints
// what if
var mergeObj3 = merge2({ name: 'insu' }, 27);
console.log('ㄴ어ㅐ머애ㅔㅁ너ㅐㅔ', mergeObj3); // {name: 'insu'} theres no 27
//
function merge3(obj1, obj2) {
    return Object.assign({}, obj1, obj2);
}
// const mergeObj4 = merge3({ name: 'insu' }, 27); // error
var mergeObj4 = merge3({ name: 'insu' }, { age: 27 });
console.log(mergeObj4); // {name: 'insu', age: 27}
function countAndDescribe(element) {
    var descriptionText = 'Got no value';
    if (element.length === 1) {
        descriptionText = "Got 1 value";
    }
    else if (element.length > 1) {
        descriptionText = "Got ".concat(element.length, " values");
    }
    return [element, descriptionText];
}
console.log(countAndDescribe('Hi there!'));
// key of
function extractAndConvert(obj, key) {
    return obj[key];
}
var c1 = extractAndConvert({ name: 'insu', age: 27 }, 'name');
// c1은 string으로 정해지는 반면,
// c2는 string| number임
// function extractAndConvert2<T extends object>(obj: T, key: keyof T) {
//     return obj[key];
// }
// const c2 = extractAndConvert2({ name: 'insu', age: 27 }, 'name');
//
// 3. Generics Class
var DataStorage = /** @class */ (function () {
    function DataStorage() {
        this.data = [];
    }
    DataStorage.prototype.addItem = function (item) {
        this.data.push(item);
    };
    DataStorage.prototype.removeItem = function (item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    };
    DataStorage.prototype.getItems = function () {
        return __spreadArray([], this.data, true);
    };
    return DataStorage;
}());
var textStorage = new DataStorage();
textStorage.addItem('insu');
textStorage.addItem('barney');
console.log(textStorage.getItems());
var numberStorage = new DataStorage();
function createCourseGoal(title, description, date) {
    return { title: title, description: description, completeUntil: date };
}
function createCourseGoal2(title, description, date) {
    var courseGoal = {};
    // 내용 검증 로직 등 ...
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
}
var namess = ['insu', 'barney'];
var namesss = ['insu', 'barney']; // string[] 이 아닌 객체같은거면 더 유용함
// namess.push('Manu'); error
// 그 외 유틸리티 제네릭 https://www.typescriptlang.org/docs/handbook/utility-types.html
