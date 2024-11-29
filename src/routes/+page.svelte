<script lang="ts">
  import { Button, GrainyFilter } from '$components';
  import { cart } from '$state';
  import { home } from '$content';
  import { imageLinks } from '$lib/constants/links';

  let currentImageIndex = $state(0);
  let nextImageIndex = 1;

  function rotateImages() {
    nextImageIndex = (currentImageIndex + 1) % imageLinks.home.bgImages.length;
    currentImageIndex = nextImageIndex;
  }

  setInterval(rotateImages, 10000);
</script>

<svelte:head><title>{home.headTitle}</title></svelte:head>

<div class="pointer-events-none fixed inset-0 -z-10 h-full w-full select-none overflow-hidden grayscale filter">
  <GrainyFilter />
  {#each imageLinks.home.bgImages as image, index}
    <div>
      <div
        style="background-image: url({image})"
        class="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat brightness-[65%] transition-opacity duration-[2s]"
        class:opacity-0={index !== currentImageIndex}
        class:opacity-60={index === currentImageIndex}
      ></div>
    </div>
  {/each}
</div>

<div class="flex h-full w-full flex-col items-center justify-center px-5">
  <div>
    <div class="mb-4 select-none">
      <div>
        <div class="flex gap-4 font-thin">
          <h1 class="text-6xl md:text-8xl">{home.title}</h1>
          <div class="flex flex-col justify-center">
            <p>{home.subTitle.firstLine}</p>
            <p>{home.subTitle.secondLine}</p>
          </div>
        </div>
        <div class="h-0.5 w-full bg-white"></div>
      </div>
      <h2 class="text-2xl md:text-3xl">{home.description}</h2>
    </div>
    <Button className="px-3">{home.button}</Button>
  </div>
  <button onclick={cart.addProduct} type="button">test</button>
  {cart.value.length}
</div>
