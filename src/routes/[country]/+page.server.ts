import { beClient } from '$service-server';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = async () => {
  return (await beClient.getCountries()).countries.map((countryObject) => {
    return { country: countryObject.code.toLowerCase() };
  });
};
