<script lang="ts">
  import { Button, TextInput } from '$components';
  import { FormField, generateFormFieldOnblurCallback, validateFormFields } from '$lib/utils/form-fields.svelte';
  import { validateEmail, validateRequiredInput } from '$lib/utils/input-validation';
  import { contactUs } from '$content';

  const formFields: FormField[] = [
    new FormField({
      id: 'contact-us-name',
      name: 'name',
      type: 'text',
      autocomplete: 'name',
      label: contactUs.formFields.name.label,
      invalidText: contactUs.formFields.name.invalidText,
      validate: validateRequiredInput,
    }),
    new FormField({
      id: 'contact-us-email',
      name: 'email',
      autocomplete: 'email',
      type: 'email',
      label: contactUs.formFields.email.label,
      invalidText: contactUs.formFields.email.invalidText,
      validate: validateEmail,
    }),
    new FormField({
      id: 'contact-us-subject',
      name: 'subject',
      autocomplete: 'off',
      type: 'text',
      label: contactUs.formFields.subject.label,
      invalidText: contactUs.formFields.subject.invalidText,
      validate: validateRequiredInput,
    }),
    new FormField({
      id: 'contact-us-message',
      name: 'message',
      autocomplete: 'off',
      type: 'textarea',
      label: contactUs.formFields.message.label,
      invalidText: contactUs.formFields.message.invalidText,
      validate: validateRequiredInput,
    }),
  ];

  function submitMessage() {
    if (!validateFormFields(Object.values(formFields))) return;

    alert('todo');
  }
</script>

<svelte:head><title>{contactUs.headTitle}</title></svelte:head>

<div class="flex h-full w-full justify-center">
  <div
    class="mt-10 flex h-fit w-[95%] flex-col items-center bg-background shadow-2xl sm:w-[80%] md:w-[65%] lg:w-[50%] xl:w-[30%]"
  >
    <div class="mt-4 flex w-full flex-col items-center">
      <h1 style="font-size: 2.5rem" class="text-center">
        {contactUs.title}
      </h1>
      <div class="pointer-events-none h-0.5 w-[35%] select-none bg-white"></div>
    </div>
    <div class="mb-10 mt-5 w-[75%]">
      <form onsubmit={submitMessage}>
        {#each formFields as field}
          <div class="w-full">
            <TextInput
              id={field.id}
              name={field.name}
              autocomplete={field.autocomplete}
              invalid={!field.isValid}
              invalidText={field.invalidText}
              onblur={generateFormFieldOnblurCallback(field)}
              required
              type={field.type}
              bind:value={field.value}
            >
              {#snippet label()}
                {field.label}
              {/snippet}
            </TextInput>
          </div>
        {/each}
        <Button className="mt-5 w-full" type="submit">{contactUs.submitButton}</Button>
      </form>
    </div>
  </div>
</div>
