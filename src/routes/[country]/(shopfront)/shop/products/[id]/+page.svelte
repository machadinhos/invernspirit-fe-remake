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

  function getCollectionName(collectionId: string) {
    const collection = data.collections.find((collection) => collection.id === collectionId);
    return collection?.name;
  }

  function onAddToCartClick() {
    cart.insertProduct(data.product, selectedQuantity);
    inCartQuantity += selectedQuantity;
    selectedQuantity = 1;
  }
</script>

<div class="flex gap-5">
  <div class="flex w-1/2 justify-center">
    <ThumbnailCarousel images={data.product.images} />
  </div>
  <div class="w-1/2">
    <h1 class="text-8xl">{data.product.name}</h1>
    <p class="text-6xl">{formatPrice(data.product.priceInCents)}{data.country.currencies[0].symbol}</p>
    <div class="my-5 h-px w-full bg-white"></div>
    <p class="min-h-24">{data.product.description}</p>
    <div class="my-5 h-px w-full bg-white"></div>
    <p>
      {shop.products.id.belongsToCollectionStart}
      <a class="text-primary" href="/{page.params.country}/shop/collections/{data.product.collectionId}"
        >{getCollectionName(data.product.collectionId)}</a
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
