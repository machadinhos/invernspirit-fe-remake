import type { LineItem, Product, ProductIdAndQuantity } from '$types';
import { browser } from '$app/environment';

class Cart {
  private value: Map<string, number>;
  size = $state() as number;

  constructor() {
    if (browser) {
      this.value = this.getCartFromLocalStorage();
    } else {
      this.value = new Map();
    }
    this.size = this.calculateSize();
  }

  private saveToLocalStorage = (): void => {
    const cartArray = Array.from(this.value.entries());
    localStorage.setItem('cart', JSON.stringify(cartArray));
  };

  private getCartFromLocalStorage = (): Map<string, number> => {
    const cartString = localStorage.getItem('cart');
    if (cartString) {
      try {
        const cartArray: [string, number][] = JSON.parse(cartString);
        return new Map(cartArray);
      } catch (error) {
        console.error('Failed to parse cart from local storage:', error);
        return new Map();
      }
    }
    return new Map();
  };

  private calculateSize = () => {
    return this.value.values().reduce((sum, quantity) => sum + quantity, 0);
  };

  private update = () => {
    this.size = this.calculateSize();
    this.saveToLocalStorage();
  };

  insertProduct = (product: Product, quantity: number = 1): void => {
    this.value.set(product.id, quantity);
    this.update();
  };

  setCartFromLineItemArray = (cart: LineItem[]) => {
    this.value = new Map(cart.map((item) => [item.id, item.quantity]));
    this.update();
  };

  getCartArray = (): ProductIdAndQuantity[] => {
    return Array.from(this.value, ([id, quantity]) => ({ id, quantity }));
  };
}

export const cart = new Cart();
