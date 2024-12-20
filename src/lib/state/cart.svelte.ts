import type { Product } from '$types';

class Cart {
  private value: Map<string, number> = new Map();
  size = $state(0);

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadFromLocalStorage();
    }
  }

  private saveToLocalStorage = (): void => {
    const cartArray = Array.from(this.value.entries());
    localStorage.setItem('cart', JSON.stringify(cartArray));
  };

  private loadFromLocalStorage = (): void => {
    const cartString = localStorage.getItem('cart');
    if (cartString) {
      try {
        const cartArray: [string, number][] = JSON.parse(cartString);
        this.value = new Map(cartArray);
        this.size = this.value.values().reduce((sum, quantity) => sum + quantity, 0);
      } catch (error) {
        console.error('Failed to parse cart from local storage:', error);
      }
    }
  };

  private update = () => {
    this.size = this.value.values().reduce((sum, quantity) => sum + quantity, 0);
    this.saveToLocalStorage();
  };

  insertProduct = (product: Product, quantity: number = 1): void => {
    this.value.set(product.id, quantity);
    this.update();
  };

  removeProduct = (product: Product): boolean => {
    const success = this.value.delete(product.id);
    this.update();
    return success;
  };
}

export default new Cart();
