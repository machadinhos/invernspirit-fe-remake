<script lang="ts">
  import { slide } from "svelte/transition";
  import { quartOut } from "svelte/easing";

  interface Props {
    className?: string;
    isOpen: boolean;
    triggerElement: HTMLElement;
    isFullWidth?: boolean;
    closeOnOutsideClick?: boolean;
    children: import("svelte").Snippet;
  }

  let {
    className = "",
    isOpen = $bindable(),
    triggerElement,
    isFullWidth = false,
    closeOnOutsideClick = true,
    children
  }: Props = $props();

  let position = $derived(
    triggerElement
      ? {
          left: isFullWidth ? 0 : triggerElement.offsetLeft,
          top: triggerElement.offsetTop + triggerElement.offsetHeight + 10
        }
      : { top: 0, left: 0 }
  );

  let dropdownElement: HTMLDivElement | undefined = $state();

  function handleClickOutside(event: MouseEvent) {
    if (!isOpen || !closeOnOutsideClick) return;

    const target = event.target as Node;
    const isClickInsideDropdown = dropdownElement?.contains(target);
    const isClickOnTrigger = triggerElement?.contains(target);

    if (!isClickInsideDropdown && !isClickOnTrigger) {
      isOpen = false;
    }
  }

  $effect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
  });
</script>

{#if isOpen && triggerElement}
  <div
    bind:this={dropdownElement}
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
