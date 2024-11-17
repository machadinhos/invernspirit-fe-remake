class Cart {
  value: string[] = $state([]);

  addProduct = () => {
    this.value.push('test');
  };

  removeProduct = () => {
    this.value.filter((item) => item !== 'test');
  };
}

const cart = new Cart();
export default cart;
