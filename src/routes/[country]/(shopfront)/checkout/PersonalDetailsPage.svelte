<script lang="ts">
  import {
    FormField,
    mapFormFieldsToValues,
    populateFormFields,
    validateFormFields,
  } from '$lib/utils/form-fields.svelte';
  import type { PersonalDetailsStageData, SelectedStage } from './stages';
  import { validateEmail, validateRequiredInput } from '$lib/utils/input-validation';
  import { bffClient } from '$service';
  import { checkout } from '$content';
  import type { CheckoutStage } from '$types';
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { TextInput } from '$components';

  type Props = {
    stages: CheckoutStage[];
    goToNextStage: (stageData?: SelectedStage['data']) => Promise<void>;
    onStageSubmit: ((e: SubmitEvent) => void) | undefined;
    stageData: PersonalDetailsStageData;
  };

  let { stages = $bindable(), goToNextStage, onStageSubmit = $bindable(), stageData }: Props = $props();

  const formFields = {
    email: new FormField({
      id: 'personal-details-email',
      type: 'email',
      name: 'email',
      autocomplete: 'username',
      label: checkout.personalDetailsPage.formFields.email.label,
      invalidText: checkout.personalDetailsPage.formFields.email.invalidText,
      validate: validateEmail,
      required: true,
    }),
    firstName: new FormField({
      id: 'personal-details-first-name',
      name: 'firstName',
      type: 'text',
      autocomplete: 'given-name',
      label: checkout.personalDetailsPage.formFields.firstName.label,
      invalidText: checkout.personalDetailsPage.formFields.firstName.invalidText,
      validate: validateRequiredInput,
      required: true,
    }),
    lastName: new FormField({
      id: 'personal-details-last-name',
      name: 'lastName',
      type: 'text',
      autocomplete: 'family-name',
      label: checkout.personalDetailsPage.formFields.lastName.label,
      invalidText: checkout.personalDetailsPage.formFields.lastName.invalidText,
      validate: validateRequiredInput,
      required: true,
    }),
  };

  const onFormSubmit = async (): Promise<void> => {
    if (!validateFormFields(formFields)) return;
    const payload = {
      personalDetails: mapFormFieldsToValues(formFields),
    };
    const { availableCheckoutStages, address } = await bffClient.checkout.stages.personalDetails.set(
      page.params.country,
      payload,
    );
    stages = availableCheckoutStages;
    await goToNextStage(address);
  };

  onMount(() => {
    if (stageData) populateFormFields(formFields, stageData);

    onStageSubmit = onFormSubmit;
  });
</script>

<div class="space-y-4">
  {#each Object.values(formFields) as field (field.id)}
    {#if field.name !== 'province' || (field.name === 'province' && page.params.country === 'es')}
      <TextInput {field} />
    {/if}
  {/each}
</div>
