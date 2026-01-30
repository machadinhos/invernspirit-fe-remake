<script lang="ts">
  import type { ClassValue } from 'svelte/elements';
  import { ShrinkOnClickWrapper } from '$components';

  // there is a long standing typescript bug that cause the types not to be inferred correctly
  // https://github.com/microsoft/TypeScript/issues/20863?utm_source=chatgpt.com
  type ConditionalTypes =
    | {
        as?: 'button';
        type?: HTMLButtonElement['type'];
        ref?: HTMLButtonElement;
        disabled?: boolean;
        href?: never;
        draggable?: never;
      }
    | {
        as: 'anchor';
        type?: never;
        href: HTMLAnchorElement['href'];
        ref?: HTMLAnchorElement;
        draggable?: HTMLAnchorElement['draggable'];
        disabled?: never;
      };

  type Props = {
    class?: ClassValue;
    onclick?: (event: Event) => void;
    children: import('svelte').Snippet;
    shrinkOnClick?: boolean;
    reverseColors?: boolean;
    fullWidth?: boolean;
  } & ConditionalTypes;

  let {
    as = 'button',
    class: className,
    onclick,
    children,
    shrinkOnClick = true,
    reverseColors = false,
    ref = $bindable(),
    fullWidth,
    href,
    type = 'button',
    disabled,
    draggable,
  }: Props = $props();
</script>

{#snippet button()}
  {#if as === 'button'}
    <button
      bind:this={ref}
      class={[fullWidth && 'full-width', reverseColors && 'reverse-colors', className]}
      {disabled}
      {onclick}
      type={type ?? 'button'}
    >
      {@render children()}
    </button>
  {:else if as === 'anchor'}
    <a
      bind:this={ref}
      class={[fullWidth && 'full-width', reverseColors && 'reverse-colors', className]}
      {draggable}
      {href}
      {onclick}
    >
      {@render children()}
    </a>
  {/if}
{/snippet}

{#if !shrinkOnClick}
  {@render button()}
{:else}
  <ShrinkOnClickWrapper>
    {@render button()}
  </ShrinkOnClickWrapper>
{/if}

<style>
  button,
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    @media (hover: hover) and (pointer: fine) {
      &:not(:disabled):hover {
        background: var(--color-primary);
        color: var(--color-secondary-dark);
      }
      &.reverse-colors:not(:disabled):hover {
        background: var(--color-secondary-dark);
        color: #fff;
      }
    }
    &,
    &.reverse-colors:not(:disabled):active {
      background: var(--color-secondary-dark);
      color: #fff;
    }
    &:not(:disabled):active,
    &.reverse-colors {
      background: var(--color-primary);
      color: var(--color-secondary-dark);
    }
    &:disabled {
      filter: brightness(1.5);
    }
    &.reverse-colors:disabled {
      filter: brightness(0.5);
    }
  }

  .full-width {
    width: 100%;
  }
</style>
