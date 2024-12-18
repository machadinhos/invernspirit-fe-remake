<script lang="ts">
  import { Button, ThumbnailCarousel } from '$components';
  import type { PageData } from './$types';
  import ProductQuantityControl from '../../ProductQuantityControl.svelte';
  import { shop } from '$content';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let selectedQuantity = $state(1);

  function getCollectionName(collectionId: string) {
    const collection = data.collections.find((collection) => collection.collectionId === collectionId);
    return collection?.collectionName;
  }
</script>

<div class="flex gap-5">
  <div class="flex w-1/2 justify-center">
    <div class="w-[65%]">
      <ThumbnailCarousel className="w-" images={data.product.images} />
    </div>
  </div>
  <div class="w-1/2">
    <h1 class="text-8xl">{data.product.productName}</h1>
    <p class="text-6xl">{data.product.priceInCents / 100}$</p>
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
    <div class="my-4 flex">
      <ProductQuantityControl stock={5} bind:selectedQuantity />
      <p>{shop.products.id.available}: {5}</p>
    </div>
    <Button className="w-full">{shop.products.id.addToCart}</Button>
  </div>
</div>
