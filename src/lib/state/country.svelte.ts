import { countries } from '$constants';

class Country {
  value: (typeof countries)[number] = $state('PT');
}

export const country = new Country();
