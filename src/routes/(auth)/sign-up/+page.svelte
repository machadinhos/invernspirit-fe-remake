<script lang="ts">
  import TextInput from '$components/ui/text-input/TextInput.svelte';
  import { containsXSSPatterns, validateEmail, validatePassword } from '$lib/utils/input-validation';
  import PasswordRequiredChecksSection from './PasswordRequiredChecksSection.svelte';
  import Button from '$components/ui/Button.svelte';
  import CheckBox from '$components/ui/CheckBox.svelte';
  import { FormField, generateOnblurCallback, validateFormFields } from '$lib/utils/form-fields.svelte';
  import { content } from '$content';

  const formFields: { [key: string]: FormField } = {
    firstName: new FormField({
      name: 'firstName',
      autocomplete: 'given-name',
      type: 'text',
      label: content.auth.signUp.formFields.firstName.label,
      invalidText: content.auth.signUp.formFields.firstName.invalidText,
      validate: (value) => value !== '' && !containsXSSPatterns(value)
    }),
    lastName: new FormField({
      name: 'lastName',
      autocomplete: 'family-name',
      type: 'text',
      label: content.auth.signUp.formFields.lastName.label,
      invalidText: content.auth.signUp.formFields.lastName.invalidText,
      validate: (value) => value !== '' && !containsXSSPatterns(value)
    }),
    email: new FormField({
      name: 'email',
      autocomplete: 'username',
      type: 'email',
      label: content.auth.signUp.formFields.email.label,
      invalidText: content.auth.signUp.formFields.email.invalidText,
      validate: validateEmail
    }),
    password: new FormField({
      name: 'password',
      autocomplete: 'new-password',
      type: 'password',
      label: content.auth.signUp.formFields.password.label,
      invalidText: content.auth.signUp.formFields.password.invalidText,
      validate: (value) => validatePassword(value).isValid
    }),
    confirmPassword: new FormField({
      autocomplete: 'new-password',
      type: 'password',
      name: 'confirmPassword',
      label: content.auth.signUp.formFields.confirmPassword.label,
      invalidText: content.auth.signUp.formFields.confirmPassword.invalidText,
      validate: (value) => value === formFields.password.value && !containsXSSPatterns(value)
    })
  };

  let rememberMeInput = $state(false);

  function submitSignUp() {
    if (!validateFormFields(Object.values(formFields))) return;

    alert('todo');
  }
</script>

<form class="w-full gap-6 pt-10" onsubmit={submitSignUp}>
  <div class="flex w-full gap-4">
    {#each [formFields['firstName'], formFields['lastName']] as field}
      <div class="w-1/2">
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
  </div>

  {#each [formFields['email'], formFields['password'], formFields['confirmPassword']] as field}
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
      {#if field.label === 'Password'}
        <PasswordRequiredChecksSection password={formFields.password.value} />
      {/if}
    </div>
  {/each}

  <CheckBox bind:checked={rememberMeInput} label="Keep me logged in?" />

  <div class="mt-10 flex items-center justify-center">
    <p>
      {content.auth.signUp.signInMessage}
      <a class="text-primary underline" href="/sign-in">{content.auth.signIn.title}</a>
    </p>
  </div>

  <Button className="mt-5 w-full" type="submit">{content.auth.signUp.submitButton}</Button>
</form>
