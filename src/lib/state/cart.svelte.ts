class Cart {
  value: string[] = $state([]);

  addProduct = () => {
    this.value.push('test');
  };

  removeProduct = () => {
    this.value.filter((item) => item !== 'test');
  };
}

export default new Cart();
