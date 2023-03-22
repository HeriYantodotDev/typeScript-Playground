# Project: Design patterns with TypeScript - simple-map-project

`npx parcel index.html` . We can run parsel without any instalation.

parcel will also auto detect our `ts` and convert it into JS.
Cool isn’t it?

Project:

- We’re going to create a simple app that has user, company, and map.
- We’re going to map the user and company in a map. so like a coordinate.

## Folder Structure, set up and etc

First, we’re going to create several files:

- `index.ts`
- `User.ts`
- `Company.ts`
- `Map.ts`

We’re going to use Faker Library:

- https://github.com/faker-js/faker
- [Faker | Faker (fakerjs.dev)](https://next.fakerjs.dev/)
- To install `npm install @faker-js/faker`
- To import `import { faker } from “@faker-js/faker”;`

The package above natively supports TS, however in many packages, they don’t support TS.

There will be an error : `could not find a declaration file for module xxx`

So take a look at this diagram :

TS Code ⇒ Type Definition File ⇒ JS Library.

If there’s no Type Definition File, then it would be an error.

> The most majority Type Definition Files are available for you:
> `@types/{library name}`

## User class

Here’s how we use the fake library to create a user class.

- parseFloat is to convert string to a floating-poing number

```tsx
import { faker } from '@faker-js/faker';

export class User {
  name: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.name = faker.name.firstName();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    };
  }
}
```

This is a class to generate a user, their name and their location.

> The convention in TypeScript is never use `export default` . So we always use {} when we import something. So we don’t have to be confused when to use curly bracket or not.

> Remember: When initialize the field , TS doesn’t know that location has properties lat and lng, since we haven’t initialized it. Therefore we have to initialize it first.

## Company class

```tsx
import { faker } from '@faker-js/faker';

export class Company {
  companyName: string;
  catchPhrase: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.companyName = faker.company.name();
    this.catchPhrase = faker.company.catchPhrase();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    };
  }
}
```

It’s quite the same like User Above.

## Adding Google Maps Support

Here’s the step:

- Generate a Google Dev Project
  - Go the the google developer console
  - Go to the library
  - Go to `Maps JavaScript API` - click `enable`
    - You have to add credit card.
    - Then You’ll get an API key.
  - use this link : `[https://maps.googleapis.com/maps/api/js?key=](https://maps.googleapis.com/maps/api/js?key=)` to be put in the script tag HTML :
    - `<script src="[https://maps.googleapis.com/maps/api/js?key=](https://maps.googleapis.com/maps/api/js?key=)"></script>`
  - For security use .env
  - It’s still show though in the browser, but it won’t show in the github repo.
- Enable Google Maps support inside the project
  -
- Generate an API key
- add the google maps script tag to our HTML file
  - Then install this `npm install @types/google.maps`
  - and put this in the beginning of `index.ts` ⇒ `/// <reference types="@types/google.maps" />`

then we create a div element :

```tsx
<div id="map" style="height: 100vh;"></div>
```

Now we implement this .

> The code below it looks complicated because I want to save this in the github.
> For normal implementation after we put this in the HTML file : ``<script src="[https://maps.googleapis.com/maps/api/js?key=](https://maps.googleapis.com/maps/api/js?key=)"></script>` just put in the `index.ts` like this :

```tsx
new google.maps.Map(document.getElementById('map') as HTMLInputElement, {
  zoom: 1,
  center: {
    lat: 0,
    lng: 0,
  },
});
```

It should render it correctly.

Now here’s the implementation that I use so the API key is still a secret in the GitHub: (

- `googleMapAPI.ts`
  ```tsx
  import * as dotenv from 'dotenv';
  dotenv.config();

  export function installGoogleMapAPI() {
    return new Promise((resolve, reject) => {
      const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
      const scriptGoogleAPI = document.createElement('script');
      scriptGoogleAPI.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
      scriptGoogleAPI.defer = true;
      scriptGoogleAPI.onload = resolve;
      scriptGoogleAPI.onerror = reject;
      document.body.appendChild(scriptGoogleAPI);
      console.log(API_KEY);
    });
  }
  ```
- `index.ts`
  ```tsx
  /// <reference types="@types/google.maps"/>

  import { User } from './User';
  import { Company } from './Company';
  import { installGoogleMapAPI } from './googleMapAPI';

  async function main() {
    await installGoogleMapAPI();
    new google.maps.Map(document.getElementById('map') as HTMLInputElement, {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0,
      },
    });
  }

  main();

  const user1 = new User();
  const company1 = new Company();

  console.log(user1);
  console.log(company1);
  ```
- `index.html`
  ```tsx
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <div id="map" style="height: 100vh;"></div>
    <script type="module" src="./src/index.ts" defer></script>
    <!-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3Z-Aezz35jzYksXhSAZG7yxsWoFIXQJk"></script> -->

  </body>
  </html>
  ```

## Hiding Functionality

Let’s limit the functionality in our classess . So we can ensure no break in the future.

Here’s the idea:

- Company :
  - new
  - reference name/slogan/lat/lng
- User:
  - new
  - reference name/age/lat/lng
- CustomMap:
  - new
  - addMarker

Here’s how we hide the functionality that we have in the google map.

We create a new class named `CustomMap` :

> As you can see below, we make the property `googleMap` to be private, so we can only access it in the class . The instance won’t be able to access it.

```tsx
export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(divID: string) {
    this.googleMap = new google.maps.Map(
      document.getElementById(divID) as HTMLInputElement,
      {
        zoom: 1,
        center: {
          lat: 0,
          lng: 0,
        },
      }
    );
  }
}
```

Now in the `index.ts`

⇒ In order to make it reusable. we should pass an ID of the Div

```tsx
/// <reference types="@types/google.maps"/>

import { User } from './User';
import { Company } from './Company';
import { installGoogleMapAPI } from './googleMapAPI';
import { CustomMap } from './CustomMap';

async function main() {
  await installGoogleMapAPI();
  new CustomMap('map');
}

main();

const user1 = new User();
const company1 = new Company();

console.log(user1);
console.log(company1);
```

## Adding Marker

Here’s the full file :

- `index.html` :
  ```tsx
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <h1>Hoi</h1>
    <p>Number of click: |<span id="numberOfClick"></span>|</p>
    <div id="map" style="height: 30vh;"></div>
    <h1>Hoi</h1>
    <div id="map2" style="height: 30vh;"></div>
    <script type="module" src="./src/index.ts" defer></script>
    <!-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3Z-Aezz35jzYksXhSAZG7yxsWoFIXQJk"></script> -->

  </body>
  </html>
  ```
- `index.ts``
  ```tsx
  /// <reference types="@types/google.maps"/>

  import { User } from './User';
  import { Company } from './Company';
  import { installGoogleMapAPI } from './googleMapAPI';
  import { CustomMap } from './CustomMap';

  async function main() {
    await installGoogleMapAPI();
    const customMap1 = new CustomMap('map');
    const customMap2 = new CustomMap('map2');

    const user1 = new User();
    const company1 = new Company();

    customMap1.addMarker(user1);
    customMap1.addMarker(company1);
  }

  main();
  ```
- `CustomMap.ts`
  ```tsx
  export interface Mappable {
    location: {
      lat: number;
      lng: number;
    };
    markerContent(): string;
  }

  export class CustomMap {
    private googleMap: google.maps.Map;

    constructor(divID: string) {
      this.googleMap = new google.maps.Map(
        document.getElementById(divID) as HTMLInputElement,
        {
          zoom: 1,
          center: {
            lat: 0,
            lng: 0,
          },
        }
      );
    }

    addMarker(mappable: Mappable): void {
      const marker = new google.maps.Marker({
        map: this.googleMap,
        position: {
          lat: mappable.location.lat,
          lng: mappable.location.lng,
        },
      });

      marker.addListener('click', () => {
        const updateClick = document.getElementById(
          'numberOfClick'
        ) as HTMLInputElement;
        updateClick.innerHTML = String(Number(updateClick.innerHTML) + 1);
        const infoWindow = new google.maps.InfoWindow({
          content: mappable.markerContent(),
        });

        infoWindow.open(this.googleMap, marker);
      });
    }
  }
  ```
- `User.ts`
  ```tsx
  import { faker } from '@faker-js/faker';
  import { Mappable } from './CustomMap';

  export class User implements Mappable {
    name: string;
    location: {
      lat: number;
      lng: number;
    };

    constructor() {
      this.name = faker.name.firstName();
      this.location = {
        lat: parseFloat(faker.address.latitude()),
        lng: parseFloat(faker.address.longitude()),
      };
    }

    markerContent(): string {
      return `
      <div>
        User Name: ${this.name}
      </div>`;
    }
  }
  ```
- `Company.ts`
  ```tsx
  import { faker } from '@faker-js/faker';
  import { Mappable } from './CustomMap';

  export class Company implements Mappable {
    companyName: string;
    catchPhrase: string;
    location: {
      lat: number;
      lng: number;
    };

    constructor() {
      this.companyName = faker.company.name();
      this.catchPhrase = faker.company.catchPhrase();
      this.location = {
        lat: parseFloat(faker.address.latitude()),
        lng: parseFloat(faker.address.longitude()),
      };
    }

    markerContent(): string {
      return `
      <div>
        <h2>Company Name: ${this.companyName}</h2> 
        <h3>Slogan: ${this.catchPhrase}</h3
      </div>
        `;
    }
  }
  ```

### `implements`

This is not required, but we can do this to help us to point where is the error.

We can add implements in our classes to ensure that our classes implement certain interface.

How?

- First we export the interface :
  ```tsx
  export interface Mappable {
    location: {
      lat: number;
      lng: number;
    };
    markerContent(): string;
  }
  ```
- Then we import it and add `implements` into the classes :
  ```tsx
  import { Mappable } from "./CustomMap";

  export class User implements Mappable {
    name: string;
    location: {
      lat: number;
      lng: number
    };
  ```

Now this will help us a lot that our class has already implemented certain interfaces.
