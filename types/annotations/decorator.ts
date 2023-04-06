@classDecorator
class Boat {
  @testDecorator
  color: string = 'red';

  @testDecorator
  get formattedColor(): string {
    return `This boat color is ${this.color}`;
  };

  @logError('Ooop.... it\'s sinking!!! Help')
  pilot(
    @parameterDecorator speed: string, 
    @parameterDecorator live: boolean
    ): void {
    if (speed === 'fast') {
      console.log('swish');
    } else {
      console.log('nothing');
    }
  };
};

function logError(errorMessage: string) {
  return function (target: any, key: string, desc: PropertyDescriptor): void {
    const method = desc.value;
    desc.value = function () {
      try {
        method();
      } catch (err) {
        console.log(errorMessage);
      };
    };
  };
};

function testDecorator(target: any, key: string) {
  console.log(key);
};

function parameterDecorator(target: any, key: string, index: number ) {
  console.log(key, index);
}

function classDecorator(constructor: typeof Boat) {
  console.log(constructor);
}

//result
// color
// formattedColor
// pilot 1
// pilot 0
// [Function: Boat]