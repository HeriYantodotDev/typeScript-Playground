import 'reflect-metadata';

@controller
class Cat {
  color: string = 'green';

  @get('/login')
  sound(): void {
    console.log('meaw meaw');
  };
};

function get(path: string) {
  return function (target: Cat, key: string) {
    Reflect.defineMetadata('path', path, target, key);
  };
};

//this is how we apply to constractor class
function controller(target: typeof Cat){
  for (let key in target.prototype) {
    const secret = Reflect.getMetadata('path', target.prototype, key );
    console.log(secret); //this is going to run it at the first time the class is read
  };

};

function main() {
  const secret = Reflect.getMetadata('secret', Cat.prototype, 'sound');

  console.log(secret);
};

// main();

