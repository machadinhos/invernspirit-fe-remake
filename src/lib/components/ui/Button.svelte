<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';

  export let type: HTMLButtonAttributes['type'] = 'button';
  export let className: HTMLButtonAttributes['class'] = '';
</script>

<button on:click class={`bg-secondary px-1 py-2 hover:bg-primary ${className}`} {type}>
  <slot />
</button>
