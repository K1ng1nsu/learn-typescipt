function add(a, b, showResult, phrase) {
    if (showResult) {
        console.log(phrase + (a + b));
    }
    else {
        return a + b;
    }
}
var n1 = 5;
var n2 = 2.8;
var printResult = true;
var resultPhrase = 'Result is: ';
add(n1, n2, printResult, resultPhrase);
