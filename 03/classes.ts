// class
// 타입스크립트에는 접근 제어자가 있음, 자바스크립트에선 없음
// public protected private
// 생성자(constructor)가 구문을 자동 생성함 ts only --> constructor에 접근제어자나 readonly 를 적었을 경우만 - parameter properties
// abstract class abstract method 지원 ts only
// private constructor와 static method로 singleton 구현 가능

abstract class Department {
    //default value is public
    // private readonly id:string;
    // private name: string;
    protected employees: string[] = [];

    static fiscalYear = 2020;

    constructor(protected readonly id: string, protected name: string) {
        // this.id = id;
        // this.name = name;
        // console.log(Department.fiscalYear);
    }

    static createEmployee(name: string) {
        return { name: name };
    }

    abstract describe(this: Department): void;
    // {
    //     console.log(`Department ${this.id}: ${this.name}`);
    // }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees);
    }
}
class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        } else {
            throw new Error("there's no report");
        }
    }

    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Please pass in a valid value!');
        }
        this.addReport(value);
    }

    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    // static 메소드에서의 this는 항상 클래스명
    static getInstance() {
        if (AccountingDepartment.instance) {
            return this.instance;
        } else {
            this.instance = new AccountingDepartment('d2', []);
            return this.instance;
        }
    }

    describe(): void {
        console.log(`Accounting Department -ID : ${this.id}`);
    }

    addEmployee(employee: string): void {
        if (employee === 'insu') {
            return;
        }
        this.employees.push(employee);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printReports() {
        console.log(this.reports);
    }
}

class ITDepartment extends Department {
    constructor(id: string, private admins: string[]) {
        super(id, 'IT');
    }

    describe(): void {
        console.log(`IT Department -ID : ${this.id}`);
    }
}

const employee1 = Department.createEmployee('Wilson');
console.log(employee1, Department.fiscalYear);

const it = new ITDepartment('d2', ['insu']);

it.addEmployee('Max');
it.addEmployee('insu');
it.describe();
it.printEmployeeInformation();

// const accounting = new AccountingDepartment('d1', []);
const accounting = AccountingDepartment.getInstance();
accounting.describe();
// accounting.employees[2] = 'Anna';

// 함수를 콜하는게 아니라 그냥 속성처럼 갖다 씀 ㅇㅇ..
// setter
accounting.mostRecentReport = 'Setter Test';
// getter
console.log(accounting.mostRecentReport);

accounting.addEmployee('insu');
accounting.addEmployee('Anna');
accounting.printEmployeeInformation();
accounting.addReport('Something goes wrong');
accounting.printReports();

// const copy = { name: 'DUMMY', describe: accounting.describe };
// copy.describe();
