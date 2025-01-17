<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { FaSolidX } from 'svelte-icons-pack/fa';
  import type { HTMLAttributes } from 'svelte/elements';
  import { Icon } from 'svelte-icons-pack';
  import { quintOut } from 'svelte/easing';

  interface Props {
    isOpen: boolean;
    children: import('svelte').Snippet;
    className?: HTMLAttributes<HTMLElement>['class'];
    side?: 'left' | 'right';
    fullWidth?: boolean;
  }

  let { isOpen = $bindable(), children, side = 'left', fullWidth = true, className = '' }: Props = $props();

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isOpen) isOpen = false;
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
  <div class="fixed inset-0 z-50 h-full w-full bg-black bg-opacity-50" transition:fade={{ duration: 500 }}></div>
  <div
    class="fixed top-0 z-50 h-full bg-background shadow-lg {fullWidth ? 'w-full' : 'w-auto'} {side === 'left'
      ? 'left-0'
      : 'right-0'} {className}"
    transition:fly={{
      duration: 500,
      easing: quintOut,
      x: side === 'left' ? -window.innerWidth : window.innerWidth,
      opacity: 1,
    }}
  >
    <div class="h-full overflow-y-auto p-4">
      <button
        class="absolute top-12 {side === 'left' ? 'right-8' : 'left-8'} text-gray-500 hover:text-gray-700"
        onclick={() => (isOpen = false)}
        type="button"
      >
        <Icon color="white" src={FaSolidX} />
      </button>
      {@render children()}
    </div>
  </div>
{/if}
