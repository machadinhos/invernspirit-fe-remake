<script lang="ts">
  import type { PageData } from './$types';
  import { shop } from '$content';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
</script>

<div class="relative h-full">
  <div class="pointer-events-none absolute inset-0 z-20 mt-5">
    <h1 class="text-center text-6xl">{shop.collections.title}</h1>
  </div>

  <div class="flex h-full justify-center gap-2">
    {#each data.collections as { id, name, image }}
      <a href={`/shop/collections/${id}`}>
        <div class="relative h-full w-[200px]">
          <img
            class="h-full object-cover object-center brightness-[30%] grayscale transition-all hover:scale-y-95 hover:brightness-100"
            alt={image.alt}
            src={image.url}
          />
          <div class="pointer-events-none absolute inset-0 flex items-center justify-center text-4xl">
            {name}
          </div>
        </div>
      </a>
    {/each}
  </div>
</div>
