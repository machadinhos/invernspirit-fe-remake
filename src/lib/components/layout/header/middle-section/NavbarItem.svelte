<script lang="ts">
  interface Props {
    children: import("svelte").Snippet;
  }

  let { children }: Props = $props();
</script>

<li class="w-fit py-1.5">
  <div class="list-item-class inline">
    {@render children()}
  </div>
  <div class="underline-class h-0.5 w-0 bg-white"></div>
</li>

<style>
  .underline-class {
    transition: width 300ms ease-in-out;
  }

  .list-item-class:hover ~ .underline-class {
    width: 100%;
  }
</style>
