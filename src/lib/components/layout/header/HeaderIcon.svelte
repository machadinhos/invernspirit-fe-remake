<script lang="ts">
  import { Icon, type IconType } from "svelte-icons-pack";

  interface Props {
    src: IconType;
    onclick?: () => void;
    ref?: HTMLButtonElement;
    badge?: string;
  }

  let { src, onclick = () => {}, ref = $bindable(), badge }: Props = $props();
</script>

<button
  bind:this={ref}
  class="outerbutton relative flex h-9 w-9 cursor-pointer items-center justify-center"
  {onclick}
>
  <div class="relative">
    <span class="flex items-center justify-center">
      <Icon color="white" {src} size="20" />
    </span>
    {#if badge}
      <span class="absolute -right-2 -top-4 text-lg font-bold text-white">
        {badge}
      </span>
    {/if}
  </div>
</button>

<style>
  .outerbutton > div {
    transition: all 300ms ease-in-out;
  }

  .outerbutton:hover > div {
    transform: scale(1.75);
    transform-origin: center;
  }
</style>
