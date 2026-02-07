<script lang="ts">
  import ProductGrid from '../ProductGrid.svelte';
  import { shop } from '$content';

  let { data } = $props();
</script>

<svelte:head><title>{shop.products.headTitle}</title></svelte:head>

<div class="paddings">
  <h1 class="mb-9 text-center text-5xl">{shop.products.title}</h1>
  <ProductGrid country={data.country} products={data.products} />
</div>
