<script lang="ts">
  import { auth, profile } from '$content';
  import { Button, TextInput } from '$components';
  import { config, user } from '$state';
  import { FormField, mapFormFieldsToValues, validateFormFields } from '$lib/utils/form-fields.svelte';
  import { validateEmail, validateRequiredInput } from '$lib/utils/input-validation';
  import { bffClient } from '$service';
  import { Form } from '$components-utils';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { page } from '$app/state';

  let ready = $state(false);

  const formFields = {
    firstName: new FormField({
      id: 'sign-up-first-name',
      name: 'firstName',
      autocomplete: 'given-name',
      type: 'text',
      label: auth.signUp.formFields.firstName.label,
      invalidText: auth.signUp.formFields.firstName.invalidText,
      validate: validateRequiredInput,
      required: true,
      filterFunction: (value: string): boolean => value.trim() !== user.value?.firstName,
    }),
    lastName: new FormField({
      id: 'sign-up-last-name',
      name: 'lastName',
      autocomplete: 'family-name',
      type: 'text',
      label: auth.signUp.formFields.lastName.label,
      invalidText: auth.signUp.formFields.lastName.invalidText,
      validate: validateRequiredInput,
      required: true,
      filterFunction: (value: string): boolean => value.trim() !== user.value?.lastName,
    }),
    email: new FormField({
      id: 'sign-up-email',
      name: 'email',
      autocomplete: 'username',
      type: 'email',
      label: auth.signUp.formFields.email.label,
      invalidText: auth.signUp.formFields.email.invalidText,
      validate: validateEmail,
      required: true,
      includeInMapping: false,
      filterFunction: (value: string): boolean => value.trim() !== user.value?.email,
    }),
  };

  const onSaveChanges = async (): Promise<void> => {
    if (!validateFormFields(formFields)) return;
    const payload = mapFormFieldsToValues(formFields);
    if (Object.keys(payload).length > 0) {
      user.value = await bffClient.user.update.personalInformation(page.params.country, payload);
    }

    if (formFields.email.filterFunction(formFields.email.value)) {
      await bffClient.user.update.email.submitEmail(page.params.country, formFields.email.value);
      goto(`/${page.params.country}/profile/user-details/verify-new-email?new-email=${formFields.email.value}`, {
        replaceState: true,
      });
      return;
    }

    goto(`/${page.params.country}/profile/user-details`, { replaceState: true });
  };

  const onCancelChanges = (): void => {
    goto(`/${page.params.country}/profile/user-details`, { replaceState: true });
  };

  onMount(() => {
    config.afterInitialization(() => {
      if (!user.value) return;
      formFields.email.value = user.value.email;
      formFields.firstName.value = user.value.firstName;
      formFields.lastName.value = user.value.lastName;

      ready = true;
    });
  });
</script>

{#if ready}
  <Form class="max-w-[450px]" onsubmit={onSaveChanges}>
    <TextInput field={formFields.email} />
    <TextInput field={formFields.firstName} />
    <TextInput field={formFields.lastName} />
    <div class="flex gap-5">
      <Button class="flex-1" type="submit">{profile.userDetails.saveChanges}</Button>
      <Button class="flex-1" onclick={onCancelChanges}>{profile.userDetails.cancelChanges}</Button>
    </div>
  </Form>
{/if}
