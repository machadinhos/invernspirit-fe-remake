<script lang="ts">
  import { Button } from '$components';

  interface Props {
    stock: number;
    selectedQuantity: number;
  }

  let { stock, selectedQuantity = $bindable() }: Props = $props();

  let canIncrementSelectedQuantity = $derived(selectedQuantity < stock);
  let canDecrementSelectedQuantity = $derived(selectedQuantity > 1);

  function incrementSelectedQuantity() {
    selectedQuantity++;
  }

  function decrementSelectedQuantity() {
    selectedQuantity--;
  }
</script>

{#snippet quantityButton(type: 'increment' | 'decrement')}
  <Button
    className="flex h-6 w-6 items-center justify-center px-0 py-0"
    disabled={type === 'increment' ? !canIncrementSelectedQuantity : !canDecrementSelectedQuantity}
    onclick={type === 'increment' ? incrementSelectedQuantity : decrementSelectedQuantity}
    >{type === 'increment' ? '+' : '-'}</Button
  >
{/snippet}

<div class="flex">
  {@render quantityButton('decrement')}
  <div class="flex w-4 justify-center">
    <span>{selectedQuantity}</span>
  </div>
  {@render quantityButton('increment')}
</div>
