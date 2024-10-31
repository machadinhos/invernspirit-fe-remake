<script lang="ts">
  import { imageLinks } from "$lib/constants/links";
  import GrainyFilter from "$lib/components/ui/GrainyFilter.svelte";
  import { fade } from "svelte/transition";
  import cart from "$lib/state/cart.svelte";

  let currentImageIndex = $state(0);
  let nextImageIndex = 1;

  function rotateImages() {
    nextImageIndex =
      (currentImageIndex + 1) % imageLinks.index["bg-images"].length;
    currentImageIndex = nextImageIndex;
  }

  setInterval(rotateImages, 10000);
</script>

<div
  transition:fade
  class="pointer-events-none fixed inset-0 -z-10 h-full w-full select-none overflow-hidden bg-background grayscale filter"
>
  <GrainyFilter>
    <div></div>
  </GrainyFilter>
  {#each imageLinks.index["bg-images"] as image, index}
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

<button onclick={() => cart.addProduct()}>test</button>
{cart.value.length}
