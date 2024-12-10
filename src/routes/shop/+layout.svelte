<script lang="ts">
  interface Props {
    children: import('svelte').Snippet;
  }

  const { children }: Props = $props();
</script>

<div class="h-full w-full px-8 py-14">
  {@render children()}
</div>
