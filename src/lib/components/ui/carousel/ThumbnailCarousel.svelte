<script lang="ts">
  import { BiChevronLeftCircle, BiChevronRightCircle } from 'svelte-icons-pack/bi';
  import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import { Icon } from 'svelte-icons-pack';
  import type { Image } from '$types';
  import Thumbnails from '$lib/components/ui/carousel/Thumbnails.svelte';

  interface Props {
    images: Image[];
    className?: HTMLDivElement['className'];
  }

  let { images }: Props = $props();

  let emblaApi: EmblaCarouselType | undefined = $state();
  let thumbsApi: EmblaCarouselType | undefined = $state();
  let selectedSlide = $state(0);

  const options: EmblaOptionsType = {};

  let prevButton: HTMLElement;
  let nextButton: HTMLElement;

  function synchronizeCarousels(sourceApi: EmblaCarouselType, targetApi: EmblaCarouselType) {
    sourceApi.on('select', (eventApi) => {
      const selectedIndex = eventApi.selectedScrollSnap();
      if (selectedIndex !== undefined && targetApi !== undefined) {
        targetApi.scrollTo(selectedIndex);
        selectedSlide = selectedIndex;
      }
    });
  }

  $effect(() => {
    if (emblaApi !== undefined && thumbsApi !== undefined) {
      synchronizeCarousels(emblaApi, thumbsApi);
      synchronizeCarousels(thumbsApi, emblaApi);
    }
  });

  function stopPropagation(fn: { call: (arg0: HTMLElement, arg1: Event) => void }) {
    return function (this: HTMLElement, event: Event) {
      event.stopPropagation();
      fn.call(this, event);
    };
  }

  function onInit(event: CustomEvent) {
    emblaApi = event.detail;

    if (emblaApi !== undefined) {
      prevButton.addEventListener('click', stopPropagation(emblaApi.scrollPrev));
      nextButton.addEventListener('click', stopPropagation(emblaApi.scrollNext));
    }
  }
</script>

<div class="select-none">
  <div class="main-carousel">
    <button bind:this={prevButton} class="prev-button" aria-label="prev slide" type="button">
      <Icon size="30" src={BiChevronLeftCircle} />
    </button>

    <div class="embla" onemblaInit={onInit} use:emblaCarouselSvelte={{ plugins: [], options }}>
      <div class="embla__container">
        {#each images as { url, alt }}
          <div class="embla__slide">
            <img class="object-cover" {alt} src={url} />
          </div>
        {/each}
      </div>
    </div>

    <button bind:this={nextButton} class="next-button" aria-label="next slide" type="button">
      <Icon size="30" src={BiChevronRightCircle} />
    </button>
  </div>
  <Thumbnails {emblaApi} {images} {selectedSlide} bind:thumbsApi />
</div>

<style>
  .main-carousel {
    position: relative;
  }

  .prev-button,
  .next-button {
    position: absolute;
    top: 50%;
    z-index: 20;
    cursor: pointer;
    margin: 10px;
  }

  .next-button {
    right: 0;
  }

  .embla {
    overflow: hidden;
  }

  .embla__container {
    display: flex;
  }

  .embla__slide {
    flex: 0 0 100%;
    min-width: 0;
  }
</style>
