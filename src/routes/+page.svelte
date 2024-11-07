<script lang="ts">
  import { imageLinks } from '$lib/constants/links';
  import GrainyFilter from '$lib/components/ui/GrainyFilter.svelte';
  import cart from '$lib/state/cart.svelte';
  import Button from '$lib/components/ui/Button.svelte';

  let currentImageIndex = $state(0);
  let nextImageIndex = 1;

  function rotateImages() {
    nextImageIndex =
      (currentImageIndex + 1) % imageLinks.index['bg-images'].length;
    currentImageIndex = nextImageIndex;
  }

  setInterval(rotateImages, 10000);
</script>

<div
  class="pointer-events-none fixed inset-0 -z-10 h-full w-full select-none overflow-hidden grayscale filter"
>
  <GrainyFilter />
  {#each imageLinks.index['bg-images'] as image, index}
    <div>
      <div
        class="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat brightness-[65%] transition-opacity duration-[2s]"
        class:opacity-60={index === currentImageIndex}
        class:opacity-0={index !== currentImageIndex}
        style="background-image: url({image})"
      ></div>
    </div>
  {/each}
</div>

<div class="flex h-full w-full flex-col items-center justify-center px-5">
  <div>
    <div class="mb-4 select-none">
      <div>
        <div class="flex gap-4 font-thin">
          <h1 class="text-6xl md:text-8xl">INVERN</h1>
          <div class="flex flex-col justify-center">
            <p>SPIRIT</p>
            <p>OF THE WINTER</p>
          </div>
        </div>
        <div class="h-0.5 w-full bg-white"></div>
      </div>
      <h2 class="text-2xl md:text-3xl">EACH PIECE, UNIQUELY YOURS.</h2>
    </div>
    <Button className="px-3">Explore our collection</Button>
  </div>
  <button onclick={() => cart.addProduct()}>{'test'}</button>
  {cart.value.length}
</div>
