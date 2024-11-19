// 1. 클래스 데코레이터
// 사용 용도
// - 클래스의 메타데이터 등록
// - 클래스의 인스턴스화 제어
// - 클래스 인스턴스의 속성 추가 또는 수정

// 1. 메타데이터 추가하기
// 배경 상황: 클래스를 데이터베이스 모델로 사용할 때 테이블 이름을 클래스에 지정하기
function Table(name: string) {
    return function (constructor: Function) {
        // 인스턴스에 tableName Property 추가
        constructor.prototype.tableName = name;
    };
}
@Table('users')
class User {
    constructor(public id: number, public name: string) {}
}

const user1 = new User(1, 'insu');
console.log((user1 as any).tableName);

// 2. 클래스 인스턴스화 제어
function Singleton<T extends { new (...args: any[]): {} }>(constructor: T) {
    let instance: any;
    return class extends constructor {
        constructor(...args: any[]) {
            if (!instance) {
                instance = super(...args);
            }
            return instance;
        }
    };
}

@Singleton
class DatabaseConnection {
    connect() {
        console.log('Connected to database');
    }
}
const db1 = new DatabaseConnection();
const db2 = new DatabaseConnection();
console.log(db1 === db2);

// 3. 클래스 인스턴스의 속성 추가 또는 수정

type Constructor<T = {}> = new (...args: any[]) => T;

function Timestamp<T extends Constructor>(constructor: T) {
    return class extends constructor {
        createdAt = new Date();
    };
}

@Timestamp
class User2 {
    constructor(public name: string) {}
}
const user2 = new User2('insu');
console.log((user2 as any).createdAt);
