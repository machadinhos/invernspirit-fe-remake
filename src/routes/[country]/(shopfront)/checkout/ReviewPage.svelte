<script lang="ts">
  import type { Country, StageName } from '$types';
  import { bffClient } from '$service';
  import { checkout } from '$content';
  import { formatPrice } from '$lib/utils/currency-formatting';
  import { goto } from '$app/navigation';
  import LineItemCard from '../LineItemCard.svelte';
  import { loading } from '$state';
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import ReviewSection from './ReviewSection.svelte';
  import type { ReviewStageData } from './stages';

  type Props = {
    country: Country;
    shippingCost: number;
    onStageSubmit: ((e: SubmitEvent) => void) | undefined;
    stageData: ReviewStageData;
    prepareStageData: Record<StageName, () => Promise<void>>;
  };

  let {
    country,
    shippingCost = $bindable(),
    onStageSubmit = $bindable(),
    stageData,
    prepareStageData,
  }: Props = $props();

  const generateGoToSectionClick = (stage: StageName): (() => void) => {
    return async () => {
      await prepareStageData[stage]();
      goto(`/${page.params.country}/checkout?stage=${stage}`);
    };
  };

  const onclick = (): void => {
    loading.withLoading(async () => {
      const { url } = await bffClient.checkout.stages.payment.get(page.params.country);
      if (!url) return;
      window.location.assign(url);
    }, false);
  };

  onMount(() => {
    shippingCost = stageData.shippingMethod.rate.priceInCents;

    onStageSubmit = onclick;
  });
</script>

<div class="mb-4 space-y-5">
  <ReviewSection
    hasEditButton={stageData.personalDetails.isEditable}
    onEditButtonClick={generateGoToSectionClick('personal-details')}
    title={checkout.personalDetailsPage.title}
  >
    <p>{checkout.personalDetailsPage.formFields.email.label}: {stageData.personalDetails.email}</p>
    <p>
      {checkout.personalDetailsPage.fullName}: {stageData.personalDetails.firstName}
      {stageData.personalDetails.lastName}
    </p>
  </ReviewSection>
  <ReviewSection
    hasEditButton={stageData.address.isEditable}
    onEditButtonClick={generateGoToSectionClick('address')}
    title={checkout.addressPage.title}
  >
    <p>{checkout.addressPage.formFields.street.label}: {stageData.address.street}</p>
    <p>{checkout.addressPage.formFields.postalCode.label}: {stageData.address.postalCode}</p>
    <p>{checkout.addressPage.formFields.houseNumber.label}: {stageData.address.houseNumber}</p>
    {#if stageData.address.apartment}
      <p>{checkout.addressPage.formFields.apartment.label}: {stageData.address.apartment}</p>
    {/if}
    <p>{checkout.addressPage.formFields.city.label}: {stageData.address.city}</p>
    {#if stageData.address.province}
      <p>{checkout.addressPage.formFields.province.label}: {stageData.address.province}</p>
    {/if}
  </ReviewSection>
  <ReviewSection
    hasEditButton={stageData.shippingMethod.isEditable}
    onEditButtonClick={generateGoToSectionClick('shipping')}
    title={checkout.shippingMethodPage.title}
  >
    <p>{checkout.shippingMethodPage.shippingCompany}: {stageData.shippingMethod.name}</p>
    <p>{checkout.shippingMethodPage.deliveryTime}: {stageData.shippingMethod.rate.deliveryTime} days</p>
    <p class="price">
      {checkout.shippingMethodPage.price}: {formatPrice(
        country.locale,
        country.currency.code,
        stageData.shippingMethod.rate.priceInCents,
      )}
    </p>
  </ReviewSection>
  <div>
    <div class="mb-2 flex justify-center">
      <h3 style="font-size: 2rem" class="lineunder">{checkout.reviewPage.products}</h3>
    </div>
    <div class="flex flex-col items-center gap-5 xl:overflow-y-auto">
      {#each stageData.cart.products as product (product.id)}
        <LineItemCard {country} {product} />
      {/each}
    </div>
  </div>
</div>
