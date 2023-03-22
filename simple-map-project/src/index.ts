/// <reference types="@types/google.maps"/>

import { User } from "./User";
import { Company } from "./Company";
import { installGoogleMapAPI } from "./googleMapAPI";
import { CustomMap } from "./CustomMap";

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
