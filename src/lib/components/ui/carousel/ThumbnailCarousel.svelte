<script lang="ts">
  import { BiSolidChevronLeftCircle, BiSolidChevronRightCircle } from 'svelte-icons-pack/bi';
  import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import { Icon } from 'svelte-icons-pack';
  import type { Image } from '$types';
  import Thumbnails from '$lib/components/ui/carousel/Thumbnails.svelte';

  interface Props {
    images: Image[];
  }

  let { images }: Props = $props();

  let emblaApi: EmblaCarouselType | undefined = $state();
  let thumbsApi: EmblaCarouselType | undefined = $state();
  let selectedSlide = $state(0);

  const options: EmblaOptionsType = { loop: true };

  let prevButton: HTMLElement;
  let nextButton: HTMLElement;

  $effect(() => {
    if (emblaApi !== undefined && thumbsApi !== undefined) {
      emblaApi.on('select', (eventApi) => {
        const selectedIndex = eventApi.selectedScrollSnap();
        if (selectedIndex !== undefined && thumbsApi !== undefined) {
          thumbsApi.scrollTo(selectedIndex);
          selectedSlide = selectedIndex;
        }
      });
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

<div class="flex select-none">
  <div class="h-[35vw] w-[8.75vw]">
    <Thumbnails {emblaApi} {images} {selectedSlide} bind:thumbsApi />
  </div>

  <div class="relative h-[35vw] w-[35vw]">
    <button bind:this={prevButton} class="prev-button" aria-label="prev slide" type="button">
      <Icon size="25" src={BiSolidChevronLeftCircle} />
    </button>

    <div class="embla" onemblaInit={onInit} use:emblaCarouselSvelte={{ plugins: [], options }}>
      <div class="embla__container">
        {#each images as { url, alt }}
          <div class="embla__slide">
            <img class="h-[35vw] object-cover" {alt} src={url} />
          </div>
        {/each}
      </div>
    </div>

    <button bind:this={nextButton} class="next-button" aria-label="next slide" type="button">
      <Icon size="25" src={BiSolidChevronRightCircle} />
    </button>
  </div>
</div>

<style>
  .prev-button,
  .next-button {
    position: absolute;
    top: 45%;
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
