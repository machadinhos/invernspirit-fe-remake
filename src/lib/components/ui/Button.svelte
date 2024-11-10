<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';

  interface Props {
    type?: HTMLButtonAttributes['type'];
    className?: HTMLButtonAttributes['class'];
    onclick?: () => void;
    children: import('svelte').Snippet;
    disabled?: boolean;
  }

  let { type = 'button', className = '', onclick = () => {}, children, disabled = false }: Props = $props();
</script>

<button
  {onclick}
  class="px-2 py-2 {disabled ? 'cursor-not-allowed bg-[#3c3b38]' : 'bg-secondary hover:bg-primary'} {className}"
  {type}
  {disabled}
>
  {@render children()}
</button>
