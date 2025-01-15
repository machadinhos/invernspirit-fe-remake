<script lang="ts">
  import { Button, PulsatingLogo } from '$components';
  import { cart as cartState, config, loading } from '$state';
  import { bffClient } from '$service';
  import { cart } from '$content';
  import CartItem from './CartItem.svelte';
  import { flip } from 'svelte/animate';
  import { formatPrice } from '$lib/utils/general';
  import type { LineItem } from '$types';
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import type { PageData } from './$types';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let cartProducts: LineItem[] | undefined = $state();
  let totalPrice = $derived(cartProducts?.reduce((sum, item) => sum + item.priceInCents * item.quantity, 0));

  onMount(() => {
    config.afterInitialization(async () => {
      if (cartState.size === 0) {
        cartProducts = [];
        return;
      }
      cartProducts = (await bffClient.getCart(cartState.getCartArray(), page.params.country)).cart.products;
    });
  });

  $effect(() => {
    if (cartProducts !== undefined) cartState.setCartFromLineItemArray(cartProducts);
  });

  async function onCheckout() {
    loading.value = true;
    const data = await bffClient.checkout(
      { products: cartState.getCartArray(), countryCode: page.params.country },
      page.params.country,
    );
    window.location.assign(data.checkout.url);
  }
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
    <div class="mb-10 mt-5 flex h-[60vh] w-[75%] flex-col place-content-between overflow-hidden">
      <div class="flex h-full flex-col gap-3 overflow-y-auto">
        {#if cartProducts !== undefined}
          {#if cartProducts.length > 0}
            {#each cartProducts as product (product.id)}
              <div animate:flip={{ duration: 150 }}>
                <CartItem {product} bind:cartProducts />
              </div>
            {/each}
          {:else}
            <p class="text-center">
              {cart.emptyCartMessage}
              <a class="text-primary underline" href="/{page.params.country}/shop/products">{cart.fillUpCTA}</a>
            </p>
          {/if}
        {:else}
          <div class="flex h-full w-full items-center justify-center">
            <PulsatingLogo />
          </div>
        {/if}
      </div>
      <div class="mt-2 w-full">
        <div class="mb-3 flex flex-col gap-0.5">
          <div class="h-0.5 bg-white"></div>
          <div class="flex place-content-between text-3xl">
            <span>{cart.total}</span>
            <span>
              {#if totalPrice !== undefined}
                {formatPrice(totalPrice)}
              {:else}
                --.--
              {/if}{data.country.currencies[0].symbol}
            </span>
          </div>
          <div class="h-0.5 bg-white"></div>
        </div>
        <Button
          className="w-full"
          disabled={cartProducts !== undefined ? cartProducts.length < 1 : true}
          onclick={onCheckout}>{cart.checkoutButtonLabel}</Button
        >
      </div>
    </div>
  </div>
</div>
