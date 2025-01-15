export interface Country {
  name: string;
  code: string;
  currencies: [
    {
      code: string;
      name: string;
      symbol: string;
    },
  ];
  taxes: [
    {
      name: string;
      rate: number;
    },
  ];
}
