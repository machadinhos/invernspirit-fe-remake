<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    value: string;
    type: import("svelte/elements").HTMLInputTypeAttribute;
    label?: Snippet;
    helperText?: Snippet;
    className?: string;
    invalid?: boolean;
  }

  let {
    value = $bindable(),
    type,
    label,
    helperText,
    className = "",
    invalid = false
  }: Props = $props();
</script>

<div class="pt-2.5">
  <div class="relative">
    <input
      {type}
      bind:value
      class="peer h-10 w-full border-b-2 border-white bg-transparent text-white focus:border-primary focus:outline-none {invalid
        ? 'focus:border-error'
        : ''} {className}"
    />
    {#if label}
      <label
        class="pointer-events-none absolute left-0 select-none text-sm transition-all peer-focus:-top-3.5 peer-focus:text-sm {value
          ? '-top-3.5'
          : 'top-2 text-base'}"
      >
        {@render label()}
      </label>
    {/if}
    {@render helperText?.()}
  </div>
</div>
