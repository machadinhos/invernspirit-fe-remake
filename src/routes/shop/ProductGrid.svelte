<script lang="ts">
  import type {Product} from "$types";
  import ProductCard from "./ProductCard.svelte";

  interface Props {
    products: Product[]
  }

  let { products }: Props = $props();
</script>

<div class="grid grid-cols-5">
  {#each products as { productId, productName, priceInCents, images }}
    <ProductCard
      id={productId}
      name={productName}
      imageAlt={images[0].alt}
      imageSrc={images[0].url}
      price={priceInCents / 100}
      stock={5}
    />
  {/each}
</div>
