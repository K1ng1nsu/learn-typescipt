// 2. 메소드 데코레이터
// 사용 용도
// - 로깅
// - 메소드 실행 시간 측정과 같은 작업을 자동화하거나
// - 권한 검증
// - 캐싱 등의 부수적 기능

// 1. 메소드 호출 시 로킹 데코레이터

function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        console.log(`Calling ${propertyKey} with arguments: ${JSON.stringify(args)}`);
        return originalMethod.apply(this, args);
    };
    return descriptor;
}

class Calculator {
    @Log
    add(a: number, b: number) {
        return a + b;
    }
}
const calculator = new Calculator();
console.log(calculator.add(2, 3));

// 2. 메소드 실행 시간 측정
function MeasureTime(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        const start = performance.now();
        const result = originalMethod.apply(this, args);
        const end = performance.now();
        console.log(`Execution time of ${propertyKey}: ${end - start} ms`);

        return result;
    };
    return descriptor;
}

class Task {
    @MeasureTime
    executeTask() {
        for (let i = 0; i < 1000000; i++) {}
    }
}

const task = new Task();
task.executeTask();

// 3. 권한 검증

function Authorized(role: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            if ((this as any).userRole !== role) {
                throw new Error(`User does not have ${role} privileges`);
            }
            return originalMethod.apply(this, args);
        };
        return descriptor;
    };
}

class AdminPanel {
    userRole = 'admin';

    @Authorized('admin')
    deleteDate() {
        console.log('Data deleted.');
    }
}
const admin = new AdminPanel();
admin.deleteDate();

const guest = new AdminPanel();
guest.userRole = 'guest';
guest.deleteDate();

// 4. 오토바인딩

function Autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}

class Printer {
    message = 'This works!';

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}
