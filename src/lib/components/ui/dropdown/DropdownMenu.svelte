<script lang="ts">
  import { slide } from 'svelte/transition';
  import { quartOut } from 'svelte/easing';

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
    transition:slide={{ duration: 800, easing: quartOut }}
    style={Object.entries(position)
      .map(([key, value]) => `${key}: ${value}px`)
      .join('; ')}
  >
    <div class={className}>
      <slot />
    </div>
  </div>
{/if}
