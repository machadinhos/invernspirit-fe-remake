<script lang="ts">
  import Button from '$components/ui/Button.svelte';
  import TextInput from '$components/ui/text-input/TextInput.svelte';
  import { content } from '$content';
  import { FormField, generateFormFieldOnblurCallback, validateFormFields } from '$lib/utils/form-fields.svelte';
  import { validateEmail, validateRequiredInput } from '$lib/utils/input-validation';

  const formFields: FormField[] = [
    new FormField({
      id: 'contact-us-name',
      name: 'name',
      type: 'text',
      autocomplete: 'name',
      label: content.contactUs.formFields.name.label,
      invalidText: content.contactUs.formFields.name.invalidText,
      validate: validateRequiredInput
    }),
    new FormField({
      id: 'contact-us-email',
      name: 'email',
      autocomplete: 'email',
      type: 'email',
      label: content.contactUs.formFields.email.label,
      invalidText: content.contactUs.formFields.email.invalidText,
      validate: validateEmail
    }),
    new FormField({
      id: 'contact-us-subject',
      name: 'subject',
      autocomplete: 'off',
      type: 'text',
      label: content.contactUs.formFields.subject.label,
      invalidText: content.contactUs.formFields.subject.invalidText,
      validate: validateRequiredInput
    }),
    new FormField({
      id: 'contact-us-message',
      name: 'message',
      autocomplete: 'off',
      type: 'textarea',
      label: content.contactUs.formFields.message.label,
      invalidText: content.contactUs.formFields.message.invalidText,
      validate: validateRequiredInput
    })
  ];

  function submitMessage() {
    if (!validateFormFields(Object.values(formFields))) return;

    alert('todo');
  }
</script>

<div class="flex h-full w-full justify-center">
  <div
    class="mt-10 flex h-fit w-[95%] flex-col items-center bg-background shadow-2xl sm:w-[80%] md:w-[65%] lg:w-[50%] xl:w-[30%]"
  >
    <div class="mt-4 flex w-full flex-col items-center">
      <h1 class="text-center" style="font-size: 2.5rem">
        {content.contactUs.title}
      </h1>
      <div class="pointer-events-none h-0.5 w-[35%] select-none bg-white"></div>
    </div>
    <div class="mb-10 mt-5 w-[75%]">
      <form onsubmit={submitMessage}>
        {#each formFields as field}
          <div class="w-full">
            <TextInput
              autocomplete={field.autocomplete}
              bind:value={field.value}
              id={field.id}
              invalid={!field.isValid}
              invalidText={field.invalidText}
              name={field.name}
              onblur={generateFormFieldOnblurCallback(field)}
              required
              type={field.type}
            >
              {#snippet label()}
                {field.label}
              {/snippet}
            </TextInput>
          </div>
        {/each}
        <Button className="mt-5 w-full" type="submit">{content.contactUs.submitButton}</Button>
      </form>
    </div>
  </div>
</div>
