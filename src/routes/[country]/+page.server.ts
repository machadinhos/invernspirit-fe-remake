import { beClient } from '$service-server';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = async () => {
  return (await beClient.getCountries()).map((countryObject) => {
    return { country: countryObject.code.toLowerCase() };
  });
};
