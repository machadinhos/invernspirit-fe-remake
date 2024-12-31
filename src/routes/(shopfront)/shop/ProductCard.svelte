<script lang="ts">
  import { Button } from '$components';
  import { cart } from '$state';
  import { formatPrice } from '$lib/utils/general';
  import type { Product } from '$types';
  import ProductQuantitySelector from '../ProductQuantitySelector.svelte';
  import { shop } from '$content';

  interface Props {
    product: Product;
  }

  let { product }: Props = $props();

  let selectedQuantity = $state(1);

  function onAddToCartClick() {
    cart.insertProduct(product, selectedQuantity);
    selectedQuantity = 1;
  }
</script>

<div class="h-fit w-64 bg-background shadow-2xl transition-all duration-300 hover:scale-110">
  <div class="h-64">
    <a href="/shop/products/{product.id}">
      <img alt={product.images[0].alt} src={product.images[0].url} />
    </a>
  </div>
  <div class="px-4 pb-3">
    <div class="my-2 flex justify-between">
      <span class="truncate whitespace-nowrap text-2xl">{product.name}</span>
      <ProductQuantitySelector stock={product.stock} bind:selectedQuantity />
    </div>
    <div class="flex items-center justify-between">
      <span class="text-4xl">{formatPrice(product.priceInCents)}$</span>
      <Button onclick={onAddToCartClick}>{shop.addToCartButtonLabel}</Button>
    </div>
  </div>
</div>
