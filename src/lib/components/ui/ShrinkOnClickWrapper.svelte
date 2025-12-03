<script lang="ts">
  type Props = {
    children: import('svelte').Snippet;
    scaleConfig?: { scaleX: number; scaleY: number } | { scaleXY: number };
  };

  let { children, scaleConfig = { scaleXY: 90 } }: Props = $props();

  // svelte-ignore state_referenced_locally
  if ('scaleXY' in scaleConfig) scaleConfig = { scaleX: scaleConfig.scaleXY, scaleY: scaleConfig.scaleXY };
</script>

<div style={`--scale-x-value: ${scaleConfig.scaleX / 100}; --scale-y-value: ${scaleConfig.scaleY / 100}`}>
  {@render children()}
</div>

<style>
  div {
    display: contents;
  }

  div > :global(*) {
    transition: scale 150ms ease-in-out;

    &:not(:disabled):active {
      scale: var(--scale-x-value) var(--scale-y-value);
    }
  }
</style>
