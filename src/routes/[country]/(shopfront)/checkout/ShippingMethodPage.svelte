<script lang="ts">
  import type { CheckoutStage, Country, ShippingMethod } from '$types';
  import type { SelectedStage, ShippingStageData } from './stages';
  import { bffClient } from '$service';
  import { checkout } from '$content';
  import { formatPrice } from '$lib/utils/currency-formatting';
  import { onMount } from 'svelte';
  import { page } from '$app/state';

  type Props = {
    country: Country;
    stages: CheckoutStage[];
    goToNextStage: (stageData?: SelectedStage['data']) => Promise<void>;
    onStageSubmit: ((e: SubmitEvent) => void) | undefined;
    stageData: ShippingStageData;
  };

  let { country, stages = $bindable(), goToNextStage, onStageSubmit = $bindable(), stageData }: Props = $props();

  let selectedShippingMethodId: string | undefined = $state();
  let shippingMethods: ShippingMethod[] | undefined = $state();

  const onFormSubmit = async (): Promise<void> => {
    if (!selectedShippingMethodId) return;
    const { availableCheckoutStages, review } = await bffClient.checkout.stages.shipping.set(
      page.params.country,
      selectedShippingMethodId,
    );
    stages = availableCheckoutStages;
    await goToNextStage(review);
  };

  const onkeydown = (e: KeyboardEvent): void => {
    const element = e.target as HTMLInputElement;
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        const prevInput = element.parentElement?.previousElementSibling?.childNodes[0];
        if (prevInput && prevInput instanceof HTMLInputElement) {
          e.preventDefault();
          prevInput.focus();
        }
      } else {
        const nextInput = element.parentElement?.nextElementSibling?.childNodes[0];
        if (nextInput && nextInput instanceof HTMLInputElement) {
          e.preventDefault();
          nextInput.focus();
        }
      }
    }
  };

  onMount(() => {
    shippingMethods = stageData.shippingMethods;
    if (stageData.selectedShippingMethod) selectedShippingMethodId = stageData.selectedShippingMethod.id;

    onStageSubmit = onFormSubmit;
  });
</script>

{#if shippingMethods}
  <div class="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] justify-items-center gap-4">
    {#each shippingMethods as shippingMethod (shippingMethod.id)}
      <label class="w-60 cursor-pointer bg-background p-4">
        <input
          name="shipping-method"
          class="sr-only"
          {onkeydown}
          type="radio"
          value={shippingMethod.id}
          bind:group={selectedShippingMethodId}
        />
        <div
          class={[
            "mx-auto mb-2 grid size-4 place-items-center rounded-full bg-background-dark after:size-2 after:rounded-full after:bg-primary after:transition-opacity after:content-['']",
            shippingMethod.id === selectedShippingMethodId ? 'after:opacity-100' : 'after:opacity-0',
          ]}
        ></div>
        <h2 class="truncate text-2xl">{shippingMethod.name}</h2>
        <p>{checkout.shippingMethodPage.deliveryTime}: {shippingMethod.rate.deliveryTime} days</p>
        <p>
          {checkout.shippingMethodPage.price}:
          <span class="price"
            >{formatPrice(country.locale, country.currency.code, shippingMethod.rate.priceInCents)}</span
          >
        </p>
      </label>
    {/each}
  </div>
{/if}

<style>
  label {
    transition: box-shadow 150ms ease-in-out;

    &:has(input:checked) {
      box-shadow: 0 0 0 1px var(--color-primary);
    }

    &:has(input:not(:checked):focus-visible) {
      box-shadow: 0 0 0 1px white;
    }
  }
</style>
