<script lang="ts">
  import { scale } from "svelte/transition";

  interface Props {
    checked: boolean;
    label: string;
  }

  let { checked = $bindable(), label }: Props = $props();
</script>

<label class="inline-flex cursor-pointer items-center gap-2">
  <input type="checkbox" bind:checked class="absolute hidden cursor-pointer" />
  <div
    class="flex h-5 w-5 items-center justify-center border-2 border-text-secondary"
  >
    <div class="h-full w-full">
      {#if checked}
        <svg
          transition:scale
          viewBox="0 0 24 24"
          class:checked
          class="bg-primary text-white"
        >
          <path
            d="M4 12l5 5L20 7"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      {/if}
    </div>
  </div>
  <span class="select-none">{label}</span>
</label>
