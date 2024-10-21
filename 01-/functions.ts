function add(n1: number, n2: number): number {
    return n1 + n2;
}

const add2 = (n1: number, n2: number): number => {
    return n1 + n2;
};

const add3 = function (n1: number, n2: number): number {
    return n1 + n2;
};

// 아래 함수는 리턴이 void지만 실제로는 undefined를 리턴함
function printResult(num: number) {
    console.log('result: ' + num);
}

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
    const result = n1 + n2;
    cb(result);
}

printResult(add(5, 12));

let combineValues: (a: number, b: number) => number;
let test: (...args: Parameters<typeof add>) => ReturnType<typeof add>;

combineValues = add;

console.log(combineValues(8, 8));

addAndHandle(10, 20, (result) => {
    console.log(result);
});
