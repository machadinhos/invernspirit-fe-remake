export interface Country {
  name: string;
  code: string;
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
  taxes: Taxes[];
}

export interface Taxes {
  name: string;
  rate: number;
}
