<script lang="ts">
  import { ArrowLeftIcon, Icon } from '$components-svg-icons';
  import type { CheckoutStage, StageName } from '$types';
  import { config, loading } from '$state';
  import { expand as expandSummary, default as SummarySection } from '../SummarySection.svelte';
  import { getNextStage, getPrevStage, type SelectedStage, stagesTitles } from './stages';
  import { onMount, untrack } from 'svelte';
  import AddressPage from './AddressPage.svelte';
  import { bffClient } from '$service';
  import { BreadCrumbs } from '$components';
  import { checkout } from '$content';
  import { Form } from '$components-utils';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import type { PageData } from './$types';
  import PersonalDetailsPage from './PersonalDetailsPage.svelte';
  import ReviewPage from './ReviewPage.svelte';
  import ShippingMethodPage from './ShippingMethodPage.svelte';

  type Props = {
    data: PageData;
  };

  let { data }: Props = $props();

  let stages: CheckoutStage[] | undefined = $state();
  let selectedStage: SelectedStage | undefined = $state();
  let enabledStages: StageName[] | undefined = $derived(
    stages?.filter((stage) => stage.isEnabled).map((stage) => stage.name),
  );
  let shippingCost = $state(0);
  let onStageSubmit: ((e: SubmitEvent) => Promise<void>) | undefined = $state();
  let isFetchingData = $state(true);

  const prepareStageData: Record<StageName, () => Promise<void>> = {
    'personal-details': async () => {
      selectedStage = {
        name: 'personal-details',
        data: (await bffClient.checkout.stages.personalDetails.get(page.params.country)).personalDetails,
      };
    },
    address: async () => {
      selectedStage = {
        name: 'address',
        data: (await bffClient.checkout.stages.address.get(page.params.country)).address,
      };
    },
    shipping: async () => {
      const { shippingMethods, selectedShippingMethod } = await bffClient.checkout.stages.shipping.get(
        page.params.country,
      );
      selectedStage = {
        name: 'shipping',
        data: { shippingMethods, selectedShippingMethod },
      };
    },
    review: async () => {
      selectedStage = {
        name: 'review',
        data: await bffClient.checkout.stages.review.get(page.params.country),
      };
    },
  };

  const finalOnStageSubmit = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();
    await onStageSubmit?.(e);
  };

  const getStageFromUrl = (): StageName | undefined => (page.url.searchParams.get('stage') as StageName) ?? undefined;

  const goToStage = async (
    getStageFunc: (stage: StageName, stages: StageName[]) => StageName,
    stageData?: SelectedStage['data'],
  ): Promise<void> => {
    if (!selectedStage || !enabledStages) return;
    const newStage = getStageFunc(selectedStage.name, enabledStages);
    if (selectedStage.name === newStage) return;
    if (!stageData) {
      isFetchingData = true;
      await prepareStageData[newStage]();
      isFetchingData = false;
    } else {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      selectedStage = { name: newStage, data: stageData } as any;
    }
    goto(`/${page.params.country}/checkout?stage=${newStage}`);
  };

  const goToNextStage = (nextStageData?: SelectedStage['data']): Promise<void> =>
    goToStage(getNextStage, nextStageData);
  const goToPrevStage = (prevStageData?: SelectedStage['data']): Promise<void> =>
    goToStage(getPrevStage, prevStageData);

  const goToCart = (): Promise<void> => goto(`/${page.params.country}/cart`);

  const isLastStage = (stageName: StageName): boolean => {
    return stages !== undefined && stages.findIndex((stage) => stage.name === stageName) === stages.length - 1;
  };

  $effect(() => {
    const newStage = getStageFromUrl();
    if (
      newStage !== untrack(() => selectedStage)?.name &&
      untrack(() => enabledStages)?.includes(newStage as StageName)
    ) {
      isFetchingData = true;
      prepareStageData[newStage as StageName]().finally(() => {
        isFetchingData = false;
      });
    }
  });

  $effect(() => {
    if (selectedStage?.name === 'review') expandSummary();
  });

  onMount(() => {
    loading.withLoading(async () => {
      const { availableCheckoutStages, isCheckoutPossible } = await config.afterInitialization(() =>
        bffClient.checkout.stages.get(page.params.country),
      );
      if (isCheckoutPossible === false) {
        goto(`/${page.params.country}/cart`, { replaceState: true });
        return;
      }
      stages = availableCheckoutStages;
      const lastEnabledStage = enabledStages?.at(-1);
      isFetchingData = true;
      if (lastEnabledStage !== getStageFromUrl()) {
        await prepareStageData[lastEnabledStage as StageName]();
        goto(`/${page.params.country}/checkout?stage=${lastEnabledStage}`, { replaceState: true });
      } else {
        await prepareStageData[lastEnabledStage as StageName]();
      }
      isFetchingData = false;
    });
  });
</script>

<svelte:head><title>{checkout.headTitle}</title></svelte:head>

<div class="flex h-full flex-col items-center">
  {#if stages && selectedStage && enabledStages}
    <div class="my-4 grid justify-items-center">
      <div class="ml-2 flex gap-3">
        <button
          aria-label={checkout.goBackButtonLabel}
          disabled={isFetchingData}
          onclick={getPrevStage(selectedStage.name, enabledStages) !== selectedStage.name
            ? (): Promise<void> => goToPrevStage()
            : goToCart}
          type="button"
        >
          <Icon size="20" src={ArrowLeftIcon} />
        </button>
        <BreadCrumbs aria-label="Checkout Stages" breadCrumbs={stages}>
          {#snippet separator()}<span class="select-none">/</span>{/snippet}
          {#snippet breadCrumbSnippet(stage: CheckoutStage)}
            {#if stage.isEnabled}
              <a
                class={['text-primary', stage.isEnabled && stage.name === selectedStage?.name && 'underline']}
                href={isFetchingData ? undefined : `/${page.params.country}/checkout?stage=${stage.name}`}
                >{stage.title}
              </a>
            {:else}
              <span>{stage.title}</span>
            {/if}
          {/snippet}
        </BreadCrumbs>
      </div>
      <h1 style="font-size: 2.5rem" class="lineunder">
        {stagesTitles[selectedStage.name]}
      </h1>
    </div>
    <Form
      class="flex size-full min-h-fit items-center max-md:flex-col md:items-start md:justify-center md:gap-5 lg:gap-10"
      onsubmit={finalOnStageSubmit}
      bind:processing={isFetchingData}
    >
      <div class="flex w-[90%] max-w-[675px] flex-1 flex-col gap-4 md:mb-5 md:w-2/3">
        {#if selectedStage.name === 'personal-details'}
          <PersonalDetailsPage {goToNextStage} stageData={selectedStage.data} bind:onStageSubmit bind:stages />
        {:else if selectedStage.name === 'address'}
          <AddressPage
            country={data.country}
            {goToNextStage}
            stageData={selectedStage.data}
            bind:onStageSubmit
            bind:stages
          />
        {:else if selectedStage.name === 'shipping'}
          <ShippingMethodPage
            country={data.country}
            {goToNextStage}
            stageData={selectedStage.data}
            bind:onStageSubmit
            bind:stages
          />
        {:else if selectedStage.name === 'review'}
          <ReviewPage
            country={data.country}
            {prepareStageData}
            stageData={selectedStage.data}
            bind:onStageSubmit
            bind:shippingCost
          />
        {/if}
      </div>
      <SummarySection
        class="sticky bottom-0 w-full md:top-0 md:w-1/3 md:max-w-[396px]"
        additionalCharges={selectedStage.name === 'review' && shippingCost
          ? [{ name: checkout.shippingCost, price: shippingCost }]
          : undefined}
        buttonText={isLastStage(selectedStage.name) ? checkout.continueToPaymentButton : checkout.continueButton}
        buttonType="submit"
        country={data.country}
      />
    </Form>
  {/if}
</div>
