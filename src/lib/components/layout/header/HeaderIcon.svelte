<script lang="ts">
  import { Icon, type IconType } from 'svelte-icons-pack';

  export let src: IconType;
</script>

<button class="outerbutton flex h-9 w-9 cursor-pointer items-center justify-center" on:click>
  <span class="flex items-center justify-center">
    <Icon color="white" {src} size="20" />
  </span>
</button>

<style>
  .outerbutton > span {
    transition: scale 300ms ease-in-out;
  }

  .outerbutton:hover > span {
    scale: 150%;
  }
</style>
