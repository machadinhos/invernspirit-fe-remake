<script lang="ts">
  import { Button } from '$components';
  import { cart } from '$content';
  import CartItem from './CartItem.svelte';
  import type { LineItem } from '$types';

  const dummyProduct: LineItem = {
    id: 'tFwLGaZsoU9QMGPiEFLKuV',
    name: 'Raku Fire',
    description: "Watershed' hand formed, raku fired ceramic",
    stock: 10,
    collectionId: 'xvUp7CsLTSbvBUdrptvJE1',
    priceInCents: 500,
    images: [
      {
        url: 'https://images.invernspirit.com/products/ceramics-product-2-1.jpeg',
        alt: 'Raku Fire',
      },
      {
        url: 'https://images.invernspirit.com/products/ceramics-product-2-2.jpeg',
        alt: 'Raku Fire',
      },
      {
        url: 'https://images.invernspirit.com/products/ceramics-product-2-3.jpeg',
        alt: 'Raku Fire',
      },
      {
        url: 'https://images.invernspirit.com/products/ceramics-product-2-4.jpeg',
        alt: 'Raku Fire',
      },
    ],
    quantity: 2,
  };

  const dummyProduct2: LineItem = {
    id: 'tFwLGaZsoU9QMGPiEFLKuV',
    name: 'Raku Fire',
    description: "Watershed' hand formed, raku fired ceramic",
    stock: 5,
    collectionId: 'xvUp7CsLTSbvBUdrptvJE1',
    priceInCents: 500,
    images: [
      {
        url: 'https://images.invernspirit.com/products/ceramics-product-2-1.jpeg',
        alt: 'Raku Fire',
      },
      {
        url: 'https://images.invernspirit.com/products/ceramics-product-2-2.jpeg',
        alt: 'Raku Fire',
      },
      {
        url: 'https://images.invernspirit.com/products/ceramics-product-2-3.jpeg',
        alt: 'Raku Fire',
      },
      {
        url: 'https://images.invernspirit.com/products/ceramics-product-2-4.jpeg',
        alt: 'Raku Fire',
      },
    ],
    quantity: 1,
  };

  let cartProducts: LineItem[] = $state([]);
  let totalPrice = $derived(cartProducts.reduce((sum, item) => sum + item.priceInCents * item.quantity, 0));

  const test = () => {
    cartProducts.push(dummyProduct);
    cartProducts.push(dummyProduct2);
  };

  test();
</script>

<div class="flex h-full w-full justify-center">
  <div
    class="mt-10 flex h-fit w-[95%] flex-col items-center bg-background shadow-2xl sm:w-[80%] md:w-[65%] lg:w-[50%] xl:w-[30%]"
  >
    <div class="mt-4 flex w-full flex-col items-center">
      <h1 style="font-size: 2.5rem" class="text-center">
        {cart.title}
      </h1>
      <div class="pointer-events-none h-0.5 w-[35%] select-none bg-white"></div>
    </div>
    <div class="mb-10 mt-5 flex min-h-[60vh] w-[75%] flex-col place-content-between">
      {#if cartProducts.length > 0}
        <div class="flex flex-col gap-3">
          {#each cartProducts as product}
            <CartItem {product} bind:cartProducts />
          {/each}
        </div>
      {:else}
        <p class="text-center">
          {cart.emptyCartMessage} <a class="text-primary underline" href="shop/products">{cart.fillUpCTA}</a>
        </p>
      {/if}
      <div class="w-full">
        <div class="mb-3 flex flex-col gap-0.5">
          <div class="h-0.5 bg-white"></div>
          <div class="flex place-content-between text-3xl">
            <span>{cart.total}</span>
            <span>{totalPrice / 100}$</span>
          </div>
          <div class="h-0.5 bg-white"></div>
        </div>
        <Button className="w-full" disabled={cartProducts.length < 1}>{cart.checkoutButtonLabel}</Button>
      </div>
    </div>
  </div>
</div>
