<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { cubicIn, cubicOut } from 'svelte/easing';

  export let className: string = '';
  export let isOpen: boolean;
  export let triggerElement: HTMLElement;
  export let isFullWidth = false;

  let position = { top: 0, left: 0 };

  $: if (triggerElement) {
    position = {
      left: isFullWidth ? 0 : triggerElement.offsetLeft,
      top: triggerElement.offsetTop + triggerElement.offsetHeight + 10
    };
  }
</script>

{#if isOpen && triggerElement}
  <div
    class="absolute {isFullWidth ? 'start-0 w-full' : ''} bg-background"
    transition:fade
    style={Object.entries(position)
      .map(([key, value]) => `${key}: ${value}px`)
      .join('; ')}
  >
    <div
      class={className}
      in:scale={{
        duration: 500,
        easing: cubicIn,
        start: 0
      }}
      out:scale={{
        duration: 500,
        delay: 250,
        easing: cubicOut,
        start: 0
      }}
    >
      <slot />
    </div>
  </div>
{/if}
