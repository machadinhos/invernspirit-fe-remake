import type { LineItem, Product, ProductIdAndQuantity } from '$types';
import { browser } from '$app/environment';
import { SvelteMap } from 'svelte/reactivity';

class Cart {
  private value = $state() as SvelteMap<string, number>;
  size = $state() as number;

  constructor() {
    if (browser) {
      this.value = this.getFromLocalStorage();
    } else {
      this.value = new SvelteMap();
    }

    $effect.root(() => {
      $effect(() => {
        this.size = this.calculateSize();
        this.saveToLocalStorage();
      });
    });
  }

  private saveToLocalStorage = (): void => {
    const cartArray = Array.from(this.value.entries());
    localStorage.setItem('cart', JSON.stringify(cartArray));
  };

  private getFromLocalStorage = (): SvelteMap<string, number> => {
    const cartString = localStorage.getItem('cart');
    if (cartString) {
      const cartArray: [string, number][] = JSON.parse(cartString);
      return new SvelteMap(cartArray);
    }
    return new SvelteMap();
  };

  private calculateSize = (): number => {
    return Array.from(this.value.values()).reduce((sum, quantity) => sum + quantity, 0);
  };

  insertProduct = (product: Product, quantity: number = 1): void => {
    this.value.set(product.id, quantity);
  };

  setCartFromLineItemArray = (cart: LineItem[]): void => {
    this.value = new SvelteMap(cart.map((item) => [item.id, item.quantity]));
  };

  getCartArray = (): ProductIdAndQuantity[] => {
    return Array.from(this.value, ([id, quantity]) => ({ id, quantity }));
  };
}

export const cart = new Cart();
