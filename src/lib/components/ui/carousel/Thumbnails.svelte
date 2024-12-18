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

  const options: EmblaOptionsType = {};

  function onInit(event: CustomEvent) {
    thumbsApi = event.detail;
  }

  function generateOnclickCallback(index: number) {
    return () => {
      thumbsApi?.scrollTo(index);
      emblaApi?.scrollTo(index);
    };
  }
</script>

<div class="embla select-none" onemblaInit={onInit} use:emblaCarouselSvelte={{ plugins: [], options }}>
  <div class="embla__container">
    {#each images as { url, alt }, index}
      <button
        class="embla__slide transition-all"
        class:brightness-50={index !== selectedSlide}
        onclick={generateOnclickCallback(index)}
        type="button"
      >
        <img {alt} height="495" src={url} width="495" />
      </button>
    {/each}
  </div>
</div>

<style>
  .embla {
    overflow: hidden;
  }

  .embla__container {
    display: flex;
  }

  .embla__slide {
    flex: 0 0 20%;
    min-width: 0;
  }
</style>
