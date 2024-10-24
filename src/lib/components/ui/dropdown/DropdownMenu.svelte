<script lang="ts">
  import { slide } from "svelte/transition";
  import { quartOut } from "svelte/easing";

  interface Props {
    className?: string;
    isOpen: boolean;
    triggerElement: HTMLElement;
    isFullWidth?: boolean;
    children: import("svelte").Snippet;
  }

  let {
    className = "",
    isOpen,
    triggerElement,
    isFullWidth = false,
    children,
  }: Props = $props();

  let position = $derived(
    triggerElement
      ? {
          left: isFullWidth ? 0 : triggerElement.offsetLeft,
          top: triggerElement.offsetTop + triggerElement.offsetHeight + 10,
        }
      : { top: 0, left: 0 },
  );
</script>

{#if isOpen && triggerElement}
  <div
    class="absolute {isFullWidth ? 'start-0 w-full' : ''} bg-background"
    transition:slide={{ duration: 800, easing: quartOut }}
    style={Object.entries(position)
      .map(([key, value]) => `${key}: ${value}px`)
      .join("; ")}
  >
    <div class={className}>
      {@render children()}
    </div>
  </div>
{/if}
