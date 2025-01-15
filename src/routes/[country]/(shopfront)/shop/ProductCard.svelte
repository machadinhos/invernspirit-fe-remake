<script lang="ts">
  import { formatPrice, getStockFromBucket } from '$lib/utils/general';
  import { Button } from '$components';
  import { cart } from '$state';
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import type { Product } from '$types';
  import ProductQuantitySelector from '../ProductQuantitySelector.svelte';
  import ProductStatusBanner from './ProductStatusBanner.svelte';
  import { shop } from '$content';

  interface Props {
    product: Product;
    currencySymbol: string;
  }

  let { product, currencySymbol }: Props = $props();

  let selectedQuantity = $state(1);
  let bucketStock: number | undefined = $state();
  let inCartQuantity = $state(cart.getProductQuantity(product.id));
  let availableStock = $derived(bucketStock ? bucketStock - inCartQuantity : 0);

  onMount(async () => {
    bucketStock = (await getStockFromBucket(product.id)).data;
  });

  function onAddToCartClick() {
    cart.insertProduct(product, selectedQuantity);
    inCartQuantity += selectedQuantity;
    selectedQuantity = 1;
  }
</script>

<div class="h-fit w-64 bg-background shadow-2xl transition-all duration-300 hover:scale-110">
  <div class="relative h-64">
    <div class="pointer-events-none absolute left-2 top-2 select-none">
      <ProductStatusBanner {bucketStock} {inCartQuantity} />
    </div>
    <a href="/{page.params.country}/shop/products/{product.id}">
      <img alt={product.images[0].alt} src={product.images[0].url} />
    </a>
  </div>
  <div class="px-4 pb-3">
    <div class="my-2 flex justify-between">
      <h3 class="truncate whitespace-nowrap text-2xl">{product.name}</h3>
      <ProductQuantitySelector disabled={bucketStock === undefined} stock={availableStock} bind:selectedQuantity />
    </div>
    <div class="flex items-center justify-between">
      <span class="text-4xl">{formatPrice(product.priceInCents)}{currencySymbol}</span>
      <Button disabled={bucketStock === undefined || availableStock <= 0} onclick={onAddToCartClick}
        >{shop.addToCartButtonLabel}</Button
      >
    </div>
  </div>
</div>
