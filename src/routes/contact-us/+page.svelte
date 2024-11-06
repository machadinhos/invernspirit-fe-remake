<script lang="ts">
  import { content } from '$lib/content/content';
  import {
    type FormField,
    generateOnblurCallback,
    validateFormFields
  } from '$lib/utils/auth-form-fields';
  import {
    containsXSSPatterns,
    validateEmail
  } from '$lib/utils/input-validation';
  import TextInput from '$lib/components/ui/text-input/TextInput.svelte';
  import Button from '$lib/components/ui/Button.svelte';

  const formFields: { [key: string]: FormField } = $state({
    name: {
      value: '',
      name: 'name',
      type: 'text',
      autocomplete: 'name',
      label: 'Name',
      isValid: true,
      invalidText: content.contactUs.formFields.name.invalidText,
      validate: (value) => value !== '' && !containsXSSPatterns(value)
    },
    email: {
      value: '',
      name: 'email',
      autocomplete: 'email',
      type: 'email',
      label: content.contactUs.formFields.email.label,
      isValid: true,
      invalidText: content.contactUs.formFields.email.invalidText,
      validate: validateEmail
    },
    subject: {
      value: '',
      name: 'subject',
      autocomplete: 'off',
      type: 'text',
      label: content.contactUs.formFields.subject.label,
      isValid: true,
      invalidText: content.contactUs.formFields.subject.invalidText,
      validate: (value) => value !== '' && !containsXSSPatterns(value)
    },
    message: {
      value: '',
      name: 'message',
      autocomplete: 'off',
      type: 'textarea',
      label: content.contactUs.formFields.message.label,
      isValid: true,
      invalidText: content.contactUs.formFields.message.invalidText,
      validate: (value) => value !== '' && !containsXSSPatterns(value)
    }
  });

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
        {#each Object.values(formFields) as field}
          <div class="w-full">
            <TextInput
              name={field.name}
              autocomplete={field.autocomplete}
              onblur={generateOnblurCallback(field)}
              invalid={!field.isValid}
              invalidText={field.invalidText}
              bind:value={field.value}
              type={field.type}
              required
            >
              {#snippet label()}
                {field.label}
              {/snippet}
            </TextInput>
          </div>
        {/each}
        <Button className="mt-5 w-full" type="submit"
          >{content.contactUs.submitButton}</Button
        >
      </form>
    </div>
  </div>
</div>
