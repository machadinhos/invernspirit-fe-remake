<script lang="ts">
  interface Props {
    children: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="transition-all active:scale-90">
  {@render children()}
</div>
