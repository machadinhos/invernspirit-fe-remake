<script lang="ts">
  import { fly } from "svelte/transition";
  interface Props {
    children: import("svelte").Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="overflow-hidden">
  <div
    class="w-fit"
    transition:fly={{
      duration: 500,
      y: window.innerHeight * 2,
      easing: (t) => {
        return t * t * (3 - 2 * t);
      }
    }}
  >
    {@render children()}
  </div>
</div>
