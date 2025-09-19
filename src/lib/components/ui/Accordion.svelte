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
      padding-inline: 0.5rem;
      display: block;
      overflow: clip;
      block-size: 0;
      transition-property: block-size, content-visibility;
      transition-duration: 0.2s;
      transition-behavior: allow-discrete;
    }

    & > :global(*):last-child {
      padding-bottom: 0.5rem;
    }

    & > summary {
      padding-block: 0.25rem;
      padding-inline: 0.5rem;
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      list-style: none;
      cursor: pointer;

      & ~ :global(*) {
        padding-top: 0.5rem;
      }
      & > :global(svg) {
        transition: rotate 0.2s linear;
        rotate: 0;
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
