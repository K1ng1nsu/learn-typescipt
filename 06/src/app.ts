// 데코레이터 사용하려면 tsconfig experimentalDecorators 설정

//  1. 데코레이터는 함수의 일종
//  2. 데코레이터는 대문자로 시작
//  3. 사용은 @Decorator
//  4. 데코레이터 함수를 리턴하는 데코레이터 팩토리
//
//  데코레이터 종류
//
//  1. 클래스 (생성자 함수를 매개변수로 받아야함)
//  2. 메소드
//  3. 속성(Property)
//  4. 매개변수(parameter)
//  5. 접근자(getter, setter)

// 1. 클래스 데코레이터

// function 클래스데코레이터(constructor: Function) {
//     // 데코레이터 로직
// }

// 2. 메소드 데코레이터

// function 데코레이터이름(
//     target: any, 메소드가 정의된 클래스의 프로토타입 객체
//     propertyKey: string, 메소드의 이름 (문자열로 전달)
//     descriptor: PropertyDescriptor 속성 기술자(PropertyDescriptor) 객체로, 메소드의 속성 정보와 동작을 수정할 수 있음
// ) {
//     // 데코레이터 로직
// }

// 3. 속성 데코레이터

// function 데코레이터이름(
//target: any, //프로토타입
//propertyKey: string // 속성의 이름) {
//     // 데코레이터 로직
// }

// 4. 매개변수 데코레이터

// function ParameterDecorator(
//     target: any,  // 메서드를 소유한 클래스의 prototype 또는 생성자 함수
//     propertyKey: string | symbol, // 메서드의 이름 해당 메서드가 클래스의 인스턴스 메서드라면, 메서드 이름이 됩니다
//     parameterIndex: number // 데코레이터가 적용된 매개변수의 인덱스 (0부터 시작)) {
//     // 데코레이터 로직
//   }

// 5. 접근자 데코레이터

// function Accessor(target: any,  // 접근자 메서드를 포함한 클래스의 프로토타입입니다.
//      propertyKey: string | symbol, // 접근자 메서드의 이름입니다.
//       descriptor: PropertyDescriptor // 메서드의 프로퍼티 설명자입니다. 이는 메서드에 대한 정보(속성, getter, setter)를 포함합니다.) {
//     // 데코레이터 로직
//   }





// 데코레이터 실행 순서

