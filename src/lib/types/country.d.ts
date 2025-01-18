export interface Country {
  name: string;
  code: string;
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
  taxes: [
    {
      name: string;
      rate: number;
    },
  ];
}
