<script lang="ts">
  import { Button, TextInput } from '$components';
  import { FormField, validateFormFields } from '$lib/utils/form-fields.svelte';
  import { validateEmail, validateRequiredInput } from '$lib/utils/input-validation';
  import { contactUs } from '$content';

  const formFields = {
    name: new FormField({
      id: 'contact-us-name',
      name: 'name',
      type: 'text',
      autocomplete: 'name',
      label: contactUs.formFields.name.label,
      invalidText: contactUs.formFields.name.invalidText,
      validate: validateRequiredInput,
      required: true,
    }),
    email: new FormField({
      id: 'contact-us-email',
      name: 'email',
      autocomplete: 'email',
      type: 'email',
      label: contactUs.formFields.email.label,
      invalidText: contactUs.formFields.email.invalidText,
      validate: validateEmail,
      required: true,
    }),
    subject: new FormField({
      id: 'contact-us-subject',
      name: 'subject',
      autocomplete: 'on',
      type: 'text',
      label: contactUs.formFields.subject.label,
      invalidText: contactUs.formFields.subject.invalidText,
      validate: validateRequiredInput,
      required: true,
    }),
    message: new FormField({
      id: 'contact-us-message',
      name: 'message',
      autocomplete: 'off',
      type: 'textarea',
      label: contactUs.formFields.message.label,
      invalidText: contactUs.formFields.message.invalidText,
      validate: validateRequiredInput,
      required: true,
    }),
  };

  const submitMessage = (): void => {
    if (!validateFormFields(formFields)) return;
    alert('todo');
  };
</script>

<svelte:head><title>{contactUs.headTitle}</title></svelte:head>

<div
  class="mx-auto mt-4 grid h-fit w-[90%] max-w-[675px] justify-items-center md:mt-10 md:bg-background-dark md:py-14 md:shadow-2xl"
>
  <h1 style="font-size: 2.5rem" class="lineunder">
    {contactUs.title}
  </h1>
  <div class="w-full md:mt-5 md:w-[75%]">
    <form onsubmit={submitMessage}>
      {#each Object.values(formFields) as field (field.id)}
        <TextInput {field}>
          {#snippet label()}
            {field.label}
          {/snippet}
        </TextInput>
      {/each}
      <Button class="mt-5" fullWidth type="submit">{contactUs.submitButton}</Button>
    </form>
  </div>
</div>
