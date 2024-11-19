function logAccess(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalGetter = descriptor.get;
    const originalSetter = descriptor.set;

    descriptor.get = function () {
        console.log(`Getting value of ${String(propertyKey)}`);
        return originalGetter?.call(this);
    };

    descriptor.set = function (value: any) {
        console.log(`Setting value of ${String(propertyKey)} to ${value}`);
        originalSetter?.call(this, value);
    };
}

class Productz {
    private _price: number = 0;

    @logAccess
    get price() {
        return this._price;
    }

    set price(value: number) {
        if (value < 0) {
            console.error('Price cannot be negative!');
        } else {
            this._price = value;
        }
    }
}

const productz = new Productz();
productz.price = 100; // 'Setting value of price to 100' 로그 출력
console.log(productz.price); // 'Getting value of price' 로그 출력 후 100
productz.price = -50; // 'Price cannot be negative!' 오류 출력
