"use strict";
const userName = 'insu';
console.log(userName);
// watch mode 자동으로 컴파일함
// npx tsc app.ts -w
// tsc --init  현재 폴더에 있는거 전체에 적용
// 이후엔 tsc 명령 전체에 적용
const button = document.querySelector('button');
button.addEventListener('click', () => {
    console.log('Clicked!');
});
