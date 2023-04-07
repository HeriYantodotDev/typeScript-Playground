import 'reflect-metadata';

@printMetaData
class Cat {
  color: string = 'green';

  @markFunction('Hello World')
  sound(): void {
    console.log('meaw meaw');
  };
};

function markFunction(secretInfo: string) {
  return function (target: Cat, key: string) {
    Reflect.defineMetadata('secret', secretInfo, target, key);
  };
};

//this is how we apply to constractor class
function printMetaData(target: typeof Cat){
  for (let key in target.prototype) {
    const secret = Reflect.getMetadata('secret', target.prototype, key );
    console.log(secret); //this is going to run it at the first time the class is read
  };

};