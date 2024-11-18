<script lang="ts">
  import { quintInOut } from 'svelte/easing';
  import { fly, type FlyParams } from 'svelte/transition';

  interface Props {
    children: import('svelte').Snippet;
    classNames?: string;
    duration: FlyParams['duration'];
  }

  let { classNames, children, duration }: Props = $props();
</script>

<div class="overflow-hidden">
  <div
    class="w-fit {classNames}"
    transition:fly={{
      duration: duration,
      y: window.innerHeight,
      easing: quintInOut,
    }}
  >
    {@render children()}
  </div>
</div>
