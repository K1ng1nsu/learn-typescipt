"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    static createEmployee(name) {
        return { name: name };
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees);
    }
}
Department.fiscalYear = 2020;
class AccountingDepartment extends Department {
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        else {
            throw new Error("there's no report");
        }
    }
    set mostRecentReport(value) {
        if (!value) {
            throw new Error('Please pass in a valid value!');
        }
        this.addReport(value);
    }
    constructor(id, reports) {
        super(id, 'Accounting');
        this.reports = reports;
        this.lastReport = reports[0];
    }
    static getInstance() {
        if (AccountingDepartment.instance) {
            return this.instance;
        }
        else {
            this.instance = new AccountingDepartment('d2', []);
            return this.instance;
        }
    }
    describe() {
        console.log(`Accounting Department -ID : ${this.id}`);
    }
    addEmployee(employee) {
        if (employee === 'insu') {
            return;
        }
        this.employees.push(employee);
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printReports() {
        console.log(this.reports);
    }
}
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, 'IT');
        this.admins = admins;
    }
    describe() {
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
const accounting = AccountingDepartment.getInstance();
accounting.describe();
accounting.mostRecentReport = 'Setter Test';
console.log(accounting.mostRecentReport);
accounting.addEmployee('insu');
accounting.addEmployee('Anna');
accounting.printEmployeeInformation();
accounting.addReport('Something goes wrong');
accounting.printReports();
