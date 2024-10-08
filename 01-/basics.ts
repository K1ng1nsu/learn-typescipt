function add(a: number, b: number, showResult: boolean, phrase: string) {
    if (showResult) {
        console.log(phrase + (a + b));
    } else {
        return a + b;
    }
}

const n1 = 5;
const n2 = 2.8;
const printResult = true;
const resultPhrase = 'Result is: ';
add(n1, n2, printResult, resultPhrase);
