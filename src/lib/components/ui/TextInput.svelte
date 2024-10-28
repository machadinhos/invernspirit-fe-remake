<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    value: string;
    type: import("svelte/elements").HTMLInputTypeAttribute;
    label?: Snippet;
    className?: string;
    invalid?: boolean;
    invalidText?: string;
  }

  let {
    value = $bindable(),
    type,
    label,
    className = "",
    invalid = false,
    invalidText
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
        class="pointer-events-none absolute left-0 select-none text-lg text-[#a6a6a6] transition-all peer-focus:-top-3.5 peer-focus:text-sm {value
          ? '-top-3.5 text-sm'
          : 'top-2 text-base'}"
      >
        {@render label()}
      </label>
    {/if}
    <p
      class="pointer-events-none select-none {invalid
        ? 'opacity-100'
        : 'opacity-0'} text-error"
    >
      {invalidText}
    </p>
  </div>
</div>
