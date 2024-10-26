<script lang="ts">
  import { Icon, type IconType } from "svelte-icons-pack";

  interface Props {
    src: IconType;
    onclick?: () => void;
    ref?: HTMLButtonElement;
  }

  let { src, onclick = () => {}, ref = $bindable() }: Props = $props();
</script>

<button
  bind:this={ref}
  class="outerbutton flex h-9 w-9 cursor-pointer items-center justify-center"
  {onclick}
>
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
