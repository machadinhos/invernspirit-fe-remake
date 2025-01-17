<script lang="ts">
  import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import type { Image } from '$types';

  interface Props {
    images: Image[];
    emblaApi: EmblaCarouselType | undefined;
    thumbsApi: EmblaCarouselType | undefined;
    selectedSlide: number;
  }

  let { images, emblaApi, thumbsApi = $bindable(), selectedSlide }: Props = $props();

  const options: EmblaOptionsType = { containScroll: 'keepSnaps', dragFree: true, axis: 'y' };

  function onInit(event: CustomEvent) {
    thumbsApi = event.detail;
  }

  function generateOnclickCallback(index: number) {
    return () => emblaApi?.scrollTo(index);
  }
</script>

<div class="embla select-none">
  <div class="embla__viewport" onemblaInit={onInit} use:emblaCarouselSvelte={{ plugins: [], options }}>
    <div class="embla__container">
      {#each images as { url, alt }, index}
        <button
          class="embla__slide transition-all"
          class:brightness-50={index !== selectedSlide}
          onclick={generateOnclickCallback(index)}
          type="button"
        >
          <img class="h-full w-full object-cover" {alt} src={url} />
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  .embla {
    margin: auto;
    --slide-height: 25%;
    --slide-size: 25%;
  }

  .embla__viewport {
    overflow: hidden;
  }

  .embla__container {
    display: flex;
    touch-action: pan-x pinch-zoom;
    height: 35vw;
    flex-direction: column;
  }

  .embla__slide {
    transform: translate3d(0, 0, 0);
    flex: 0 0 var(--slide-size);
    min-height: 0;
    aspect-ratio: 1/1;
  }
</style>
