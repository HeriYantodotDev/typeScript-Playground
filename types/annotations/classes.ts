class Vehicle {
  // color: string;
  // constructor(color: string = 'no no color'){
  //   this.color = color;
  // }

  // or we can just use like this 
  constructor(public color: string = 'no no color') {};

  public drive(): void {
    console.log('brumm');
  }

  //We can only use private in this class only
  private sound(): void {
    console.log('Jrenggg!!!')
  } 

  //We can use this in this class and in the child class 
  //But we can't use this in the instance. 
  protected honk(): void {
    console.log('beep beep')
  }
}

class MotorCycle extends Vehicle {
  constructor(public wheels: number = 2, public color: string) {
    super(color);
  }

  //overriding the existing class
  public drive(): void {
    console.log('The motorcyle is running!!!');
  }

  //we can use this in this child class
  protected honk(): void {      
  }
}

const motor = new MotorCycle(2, 'red');
console.log(motor.color);
motor.drive();

const newCar = new Vehicle('orange');
console.log(newCar.color);

const newCar2 = new MotorCycle(3, 'red');
console.log(newCar2.color);