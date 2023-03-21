//annotations around objects

const profile = {
  name: 'alex',
  age: 20,
  coords: {
    lat: 0,
    lng: 15
  },
  setAge(age: number): void {
    this.age = age
  }
}

const {age, name: profileName}: {age: number, name: string} = profile;
const {coords: {lat, lng}}: {coords: {lat: number, lng:number}} = profile;
