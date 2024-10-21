let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'insu';

if (typeof userInput === 'string') {
    userName = userInput;
}

function generateError(msg: string, code: number): never {
    throw { msg, code };
}

generateError('An Error occurred!', 500);
