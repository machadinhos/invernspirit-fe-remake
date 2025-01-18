<script lang="ts">
  import type { PageData } from './$types';
  import ProductGrid from '../ProductGrid.svelte';
  import { shop } from '$content';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
</script>

<h1 class="mb-9 text-center text-5xl">{shop.products.title}</h1>

<ProductGrid currencySymbol={data.country.currency.symbol} products={data.products} />
