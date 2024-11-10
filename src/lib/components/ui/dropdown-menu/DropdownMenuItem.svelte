<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quintInOut } from 'svelte/easing';

  interface Props {
    children: import('svelte').Snippet;
    classNames?: string;
  }

  let { classNames, children }: Props = $props();
</script>

<div class="overflow-hidden">
  <div
    class="w-fit {classNames}"
    transition:fly={{
      duration: 500,
      y: window.innerHeight,
      easing: quintInOut
    }}
  >
    {@render children()}
  </div>
</div>
