<script lang="ts">
  import { imageLinks } from '$lib/utils/links';

  let currentImageIndex = 0;
  let nextImageIndex = 1;

  function rotateImages() {
    nextImageIndex = (currentImageIndex + 1) % imageLinks.index['bg-images'].length;
    setTimeout(() => {
      currentImageIndex = nextImageIndex;
    }, 500);
  }

  setInterval(rotateImages, 5000);
</script>

<!-- background images carousel -->
<div class="absolute inset-0 h-full w-full overflow-hidden bg-gray-600 grayscale filter">
  {#each imageLinks.index['bg-images'] as image, index}
    <div
      class="fixed h-full w-full bg-cover bg-center bg-no-repeat transition-opacity duration-500"
      class:opacity-100={index === currentImageIndex}
      class:opacity-0={index !== currentImageIndex}
      style="background-image: url({image});"
    />
  {/each}
</div>
