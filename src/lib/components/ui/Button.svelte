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
  class="h-8 px-2 py-2 enabled:bg-secondary enabled:hover:bg-primary disabled:bg-[#3c3b38] {className}"
  {disabled}
  {onclick}
  {type}
>
  {@render children()}
</button>
