import type { Country } from '$lib/types/country';

export interface Address {
  id: string;
  line1: string;
  postalCode: string;
  city: string;
  line2: string | null;
  country: Country;
}
