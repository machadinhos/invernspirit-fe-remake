<script lang="ts">
  import { backIn, backOut } from 'svelte/easing';
  import type { HTMLAttributes } from 'svelte/elements';
  import { onClickOutside } from '$components-actions';
  import { slide } from 'svelte/transition';

  interface Props {
    className?: HTMLAttributes<HTMLElement>['class'];
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
    children,
  }: Props = $props();

  $effect(() => {
    if (!isOpen) onClose();
  });

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
    style={isFullWidth ? `top: ${position.top}px; left: ${position.left}px` : ''}
    class="fixed z-20 {isFullWidth ? 'left-0 w-full' : ''} bg-background shadow-2xl"
    use:onClickOutside={{
      callback: () => (isOpen = false),
      enabled: closeOnOutsideClick && isOpen,
      otherIncludedElements: [triggerElement],
    }}
    transition:slide={{ duration: 800, easing: isOpen ? backOut : backIn }}
  >
    <div class={className}>
      {@render children()}
    </div>
  </div>
{/if}
