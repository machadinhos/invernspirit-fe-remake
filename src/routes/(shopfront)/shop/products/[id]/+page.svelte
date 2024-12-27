<script lang="ts">
  import { Button, ThumbnailCarousel } from '$components';
  import { cart } from '$state';
  import { formatPrice } from '$lib/utils/general';
  import type { PageData } from './$types';
  import ProductQuantityControl from '../../../ProductQuantityControl.svelte';
  import { shop } from '$content';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let selectedQuantity = $state(1);

  function getCollectionName(collectionId: string) {
    const collection = data.collections.find((collection) => collection.id === collectionId);
    return collection?.name;
  }

  function onAddToCartClick() {
    cart.insertProduct(data.product, selectedQuantity);
    selectedQuantity = 1;
  }
</script>

<div class="flex gap-5">
  <div class="flex w-1/2 justify-center">
    <ThumbnailCarousel images={data.product.images} />
  </div>
  <div class="w-1/2">
    <h1 class="text-8xl">{data.product.name}</h1>
    <p class="text-6xl">{formatPrice(data.product.priceInCents)}$</p>
    <div class="my-5 h-px w-full bg-white"></div>
    <p class="min-h-24">{data.product.description}</p>
    <div class="my-5 h-px w-full bg-white"></div>
    <p>
      {shop.products.id.belongsToCollectionStart}
      <a class="text-primary" href="/shop/collections/{data.product.collectionId}"
        >{getCollectionName(data.product.collectionId)}</a
      >
      {shop.products.id.belongsToCollectionEnd}
    </p>
    <div class="my-4 flex gap-3">
      <ProductQuantityControl stock={data.product.stock} bind:selectedQuantity />
      <p>{shop.products.id.available}: {data.product.stock}</p>
    </div>
    <Button className="w-full" onclick={onAddToCartClick}>{shop.addToCartButtonLabel}</Button>
  </div>
</div>
