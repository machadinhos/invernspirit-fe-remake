<script lang="ts">
  import type { Product } from '$types';
  import ProductCard from './ProductCard.svelte';

  interface Props {
    products: Product[];
  }

  let { products }: Props = $props();
</script>

<div class="grid grid-cols-[repeat(auto-fit,minmax(256px,1fr))] justify-center justify-items-center gap-12">
  {#each products as product}
    <ProductCard {product} />
  {/each}
</div>
