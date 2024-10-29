<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  interface Props {
    type?: HTMLButtonAttributes["type"];
    className?: HTMLButtonAttributes["class"];
    onclick?: () => void;
    children: import("svelte").Snippet;
  }

  let {
    type = "button",
    className = "",
    onclick = () => {},
    children
  }: Props = $props();
</script>

<button
  {onclick}
  class={`bg-secondary px-1 py-2 hover:bg-primary ${className}`}
  {type}
>
  {@render children()}
</button>
