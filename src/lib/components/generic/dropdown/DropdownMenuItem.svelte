<script lang="ts">
  import { fly } from 'svelte/transition';
</script>

<div class="overflow-hidden">
  <div
    transition:fly={{
      duration: 500,
      y: window.innerHeight * 2,
      easing: (t) => {
        return t * t * (3 - 2 * t);
      }
    }}
  >
    <slot />
  </div>
</div>
