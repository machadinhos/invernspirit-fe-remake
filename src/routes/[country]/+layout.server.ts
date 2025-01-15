import { beClient } from '$service-server';
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ params }) => {
  const country = (await beClient.getCountries()).countries.find(
    (country) => country.code === params.country.toUpperCase(),
  );
  if (!country) {
    return redirect(302, '/pt');
  }
  return { country };
};
