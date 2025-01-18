<script generics="T" lang="ts">
  /* eslint-disable no-undef */
  import { onClickOutside } from '$components-actions';
  import type { Snippet } from 'svelte';

  interface Props {
    triggerElement: Snippet;
    optionSnippet: Snippet<[T, number]>;
    options: T[];
    selected: number;
    isOpen: boolean;
  }

  let { triggerElement, optionSnippet, options, selected = $bindable(), isOpen = $bindable() }: Props = $props();
</script>

<div class="relative">
  <button
    class="flex cursor-pointer items-center gap-1 bg-background"
    class:open={isOpen}
    onclick={() => (isOpen = !isOpen)}
    type="button"
    use:onClickOutside={{ callback: () => (isOpen = false) }}
  >
    {@render triggerElement()}
  </button>
  {#if isOpen}
    <div class="absolute top-full flex flex-col rounded-sm">
      {#each options as option, index}
        <button onclick={() => (selected = index)} type="button">
          {@render optionSnippet(option, index)}
        </button>
      {/each}
    </div>
  {/if}
</div>
