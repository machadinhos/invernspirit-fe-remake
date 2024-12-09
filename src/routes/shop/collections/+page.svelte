<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<div class="flex h-full justify-center">
  {#each data.collections as collection}
    <a href={`/shop/collections/${collection.collectionId}`}>
      <div class="h-full w-[200px]">
        <img class="h-full object-cover object-center" alt={collection.image.alt} src={collection.image.url} />
      </div>
    </a>
  {/each}
</div>
