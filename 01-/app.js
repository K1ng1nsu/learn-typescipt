var userInput;
var userName;
userInput = 5;
userInput = 'insu';
if (typeof userInput === 'string') {
    userName = userInput;
}
function generateError(msg, code) {
    throw { msg: msg, code: code };
}
generateError('An Error occurred!', 500);
