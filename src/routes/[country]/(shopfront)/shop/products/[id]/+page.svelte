<script lang="ts">
  import { Button, ThumbnailCarousel } from '$components';
  import { formatPrice, getStockFromBucket } from '$lib/utils/general';
  import { cart } from '$state';
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import type { PageData } from './$types';
  import ProductQuantitySelector from '../../../ProductQuantitySelector.svelte';
  import ProductStatusBanner from '../../ProductStatusBanner.svelte';
  import { shop } from '$content';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let selectedQuantity = $state(1);
  let bucketStock: number | undefined = $state();
  let inCartQuantity = $state(cart.getProductQuantity(data.product.id));
  let availableStock = $derived(bucketStock ? bucketStock - inCartQuantity : 0);

  onMount(async () => {
    bucketStock = (await getStockFromBucket(data.product.id)).data;
  });

  function onAddToCartClick() {
    cart.insertProduct(data.product, selectedQuantity);
    inCartQuantity += selectedQuantity;
    selectedQuantity = 1;
  }
</script>

<div class="margins flex flex-col gap-5 lg:flex-row">
  <div class="flex justify-center lg:w-1/2">
    <ThumbnailCarousel images={data.product.images} />
  </div>
  <div class="lg:w-1/2">
    <h1 class="text-6xl lg:text-8xl">{data.product.name}</h1>
    <p class="text-4xl lg:text-6xl">{formatPrice(data.product.grossPrice)}{data.country.currency.symbol}</p>
    <div class="my-5 h-px w-full bg-white"></div>
    <p class="min-h-24">{data.product.description}</p>
    <div class="my-5 h-px w-full bg-white"></div>
    <p>
      {shop.products.id.belongsToCollectionStart}
      <a class="text-primary underline" href="/{page.params.country}/shop/collections/{data.product.collection.id}"
        >{data.product.collection.name}</a
      >
      {shop.products.id.belongsToCollectionEnd}
    </p>
    <div class="my-4 flex gap-3">
      <ProductQuantitySelector disabled={bucketStock === undefined} stock={availableStock} bind:selectedQuantity />
      <p>{shop.products.id.available}: {data.product.stock}</p>
      <ProductStatusBanner {bucketStock} {inCartQuantity} />
    </div>
    <Button className="w-full" disabled={bucketStock === undefined || availableStock <= 0} onclick={onAddToCartClick}
      >{shop.addToCartButtonLabel}</Button
    >
  </div>
</div>
