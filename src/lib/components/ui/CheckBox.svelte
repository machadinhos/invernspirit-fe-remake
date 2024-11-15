<script lang="ts">
  import { scale } from 'svelte/transition';

  interface Props {
    checked: boolean;
    label: string;
  }

  let { checked = $bindable(), label }: Props = $props();
</script>

<label class="inline-flex cursor-pointer items-center gap-2">
  <input bind:checked class="absolute hidden cursor-pointer" type="checkbox" />
  <div class="flex h-5 w-5 items-center justify-center border-2 border-text-secondary">
    <div class="h-full w-full">
      {#if checked}
        <svg class="bg-primary text-white" class:checked transition:scale viewBox="0 0 24 24">
          <path
            d="M4 12l5 5L20 7"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
          />
        </svg>
      {/if}
    </div>
  </div>
  <span class="select-none">{label}</span>
</label>
