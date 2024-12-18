<script lang="ts">
  import { Button } from '$components';
  import ProductQuantityControl from './ProductQuantityControl.svelte';

  interface Props {
    imageSrc: string;
    imageAlt: string;
    price: number;
    name: string;
    stock: number;
    id: string;
  }

  let { imageSrc, imageAlt, id, price, name, stock }: Props = $props();

  let selectedQuantity = $state(1);
</script>

<div class="h-fit w-64 bg-background shadow-2xl transition-all duration-300 hover:scale-110">
  <div class="h-64">
    <a href="/shop/products/{id}">
      <img alt={imageAlt} src={imageSrc} />
    </a>
  </div>
  <div class="px-4 pb-3">
    <div class="flex items-end justify-between">
      <span class="overflow-hidden truncate whitespace-nowrap text-3xl">{name}</span>
      <ProductQuantityControl {stock} bind:selectedQuantity />
    </div>
    <div class="flex items-end justify-between">
      <span class="text-4xl">{price}$</span>
      <Button className="h-8 px-2 py-0">add to cart</Button>
    </div>
  </div>
</div>
