<script lang="ts">
  import { slide } from 'svelte/transition';
  import { quartOut } from 'svelte/easing';
  import { onMount } from 'svelte';

  interface Props {
    className?: string;
    isOpen: boolean;
    onClose?: () => void;
    triggerElement: HTMLElement | undefined;
    isFullWidth?: boolean;
    closeOnOutsideClick?: boolean;
    children: import('svelte').Snippet;
  }

  let {
    className = '',
    isOpen = $bindable(),
    onClose = () => {},
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

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      onClose();
    };
  });
</script>

{#if isOpen && triggerElement}
  <div
    bind:this={dropdownElement}
    class="fixed z-20 {isFullWidth ? 'left-0 w-full' : ''} bg-background shadow-2xl"
    transition:slide={{ duration: 800, easing: quartOut }}
    style={isFullWidth ? `top: ${position.top}px; left: ${position.left}px` : ''}
  >
    <div class={className}>
      {@render children()}
    </div>
  </div>
{/if}
