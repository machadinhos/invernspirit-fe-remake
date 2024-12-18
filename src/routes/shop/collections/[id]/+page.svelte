<script lang="ts">
  import { BsArrowReturnLeft } from 'svelte-icons-pack/bs';
  import { Icon } from 'svelte-icons-pack';
  import type { PageData } from './$types';
  import ProductGrid from '../../ProductGrid.svelte';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
</script>

<div class="flex h-full items-center">
  <div class="w-1/2 pl-40">
    <h1 class="text-6xl">{data.collection.collectionName}</h1>
    <div class="mt-5 w-fit">
      <a href="/shop/collections">
        <Icon size="40" src={BsArrowReturnLeft} />
      </a>
    </div>
  </div>
  <div class="w-1/2">
    <p>{data.collection.description}</p>
  </div>
</div>

<ProductGrid products={data.collection.products} />
