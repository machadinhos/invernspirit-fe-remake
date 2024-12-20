import type { Product } from '$types';

class Cart {
  private value: Map<string, number> = new Map();
  size = $state(0);

  private updateSize = () => {
    this.size = this.value.values().reduce((sum, quantity) => sum + quantity, 0);
  };

  insertProduct = (product: Product, quantity: number = 1): void => {
    this.value.set(product.id, quantity);
    this.updateSize();
  };

  removeProduct = (product: Product): boolean => {
    const success = this.value.delete(product.id);
    this.updateSize();
    return success;
  };
}

export default new Cart();
