<script generics="Item extends { trigger: unknown; content: unknown }" lang="ts">
  import { ChevronDownIcon, Icon } from '$components-svg-icons';
  import type { Snippet } from 'svelte';

  type Props = {
    accordionTrigger: Snippet<[Item['trigger']]>;
    accordionContent: Snippet<[Item['content']]>;
    items: Item[];
    exclusive?: boolean;
  };

  let { accordionTrigger, accordionContent, items, exclusive }: Props = $props();
  const id = $props.id();
</script>

<div class="out-container space-y-1">
  {#each items as item, index (index)}
    <details name={exclusive ? id : undefined}>
      <summary>
        {@render accordionTrigger(item.trigger)}
        <Icon src={ChevronDownIcon} />
      </summary>
      {@render accordionContent(item.content)}
    </details>
  {/each}
</div>

<style>
  details {
    background: var(--color-background);

    &::details-content {
      display: block;
      transition-behavior: allow-discrete;
      transition-duration: 0.2s;
      transition-property: block-size, content-visibility;
      padding-inline: 0.5rem;
      block-size: 0;
      overflow: clip;
    }

    & > :global(*):last-child {
      padding-bottom: 0.5rem;
    }

    & > summary {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      cursor: pointer;
      padding-inline: 0.5rem;
      padding-block: 0.25rem;
      list-style: none;

      & ~ :global(*) {
        padding-top: 0.5rem;
      }
      & > :global(svg) {
        rotate: 0;
        transition: rotate 0.2s linear;
      }
    }

    &[open] {
      &::details-content {
        block-size: auto;
        block-size: auto;
      }
      & > summary > :global(svg) {
        rotate: 180deg;
      }
    }
  }
</style>
