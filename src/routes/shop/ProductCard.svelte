<script lang="ts">
  import Button from '$components/ui/Button.svelte';

  interface Props {
    imageSrc: string;
    imageAlt: string;
    price: number;
    name: string;
    quantity: number;
    id: string;
  }

  let { imageSrc, imageAlt, id, price, name, quantity }: Props = $props();

  let selectedQuantity = $state(1);
  let canIncrementSelectedQuantity = $derived(selectedQuantity < quantity);
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
    disabled={type === 'increment'
      ? !canIncrementSelectedQuantity
      : !canDecrementSelectedQuantity}
    onclick={type === 'increment'
      ? incrementSelectedQuantity
      : decrementSelectedQuantity}
    className="flex h-6 w-6 items-center justify-center px-0 py-0"
    >{type === 'increment' ? '+' : '-'}</Button
  >
{/snippet}

<div
  class="h-fit w-64 bg-background shadow-2xl transition-all duration-300 hover:scale-110"
>
  <div class="h-64">
    <a href="/shop/products/{id}">
      <img src={imageSrc} alt={imageAlt} />
    </a>
  </div>
  <div class="px-4 pb-3">
    <div class="flex items-end justify-between">
      <span class="text-3xl">{name}</span>
      <div class="flex">
        {@render quantityButton('decrement')}
        <div class="flex w-4 justify-center">
          <span>{selectedQuantity}</span>
        </div>
        {@render quantityButton('increment')}
      </div>
    </div>
    <div class="flex items-end justify-between">
      <span class="text-4xl">{price}$</span>
      <Button className="h-8 px-2 py-0">add to cart</Button>
    </div>
  </div>
</div>
