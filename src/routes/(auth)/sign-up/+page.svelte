<script lang="ts">
  import { Button, CheckBox, TextInput } from '$components';
  import { FormField, generateFormFieldOnblurCallback, validateFormFields } from '$lib/utils/form-fields.svelte';
  import { validateEmail, validatePassword, validateRequiredInput } from '$lib/utils/input-validation';
  import { auth } from '$content';

  import PasswordChecks from './PasswordChecks.svelte';

  const formFields: { [key: string]: FormField } = {
    firstName: new FormField({
      id: 'sign-up-first-name',
      name: 'firstName',
      autocomplete: 'given-name',
      type: 'text',
      label: auth.signUp.formFields.firstName.label,
      invalidText: auth.signUp.formFields.firstName.invalidText,
      validate: validateRequiredInput,
    }),
    lastName: new FormField({
      id: 'sign-up-last-name',
      name: 'lastName',
      autocomplete: 'family-name',
      type: 'text',
      label: auth.signUp.formFields.lastName.label,
      invalidText: auth.signUp.formFields.lastName.invalidText,
      validate: validateRequiredInput,
    }),
    email: new FormField({
      id: 'sign-up-email',
      name: 'email',
      autocomplete: 'username',
      type: 'email',
      label: auth.signUp.formFields.email.label,
      invalidText: auth.signUp.formFields.email.invalidText,
      validate: validateEmail,
    }),
    password: new FormField({
      id: 'sign-up-password',
      name: 'password',
      autocomplete: 'new-password',
      type: 'password',
      label: auth.signUp.formFields.password.label,
      invalidText: auth.signUp.formFields.password.invalidText,
      validate: (value) => validatePassword(value).isValid,
    }),
    confirmPassword: new FormField({
      id: 'sign-up-confirm-password',
      autocomplete: 'new-password',
      type: 'password',
      name: 'confirmPassword',
      label: auth.signUp.formFields.confirmPassword.label,
      invalidText: auth.signUp.formFields.confirmPassword.invalidText,
      validate: (value) => value === formFields.password.value && validatePassword(value).isValid,
    }),
  };

  let rememberMeInput = $state(false);

  function submitSignUp() {
    if (!validateFormFields(Object.values(formFields))) return;

    alert('todo');
  }
</script>

<svelte:head><title>{auth.signUp.headTitle}</title></svelte:head>

<form class="w-full gap-6 pt-10" onsubmit={submitSignUp}>
  <div class="flex w-full gap-4">
    {#each [formFields['firstName'], formFields['lastName']] as field}
      <div class="w-1/2">
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
  </div>

  {#each [formFields['email'], formFields['password'], formFields['confirmPassword']] as field}
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
      {#if field.label === 'Password'}
        <PasswordChecks password={formFields.password.value} />
      {/if}
    </div>
  {/each}

  <CheckBox label="Keep me logged in?" bind:checked={rememberMeInput} />

  <div class="mt-10 flex items-center justify-center">
    <p>
      {auth.signUp.signInMessage}
      <a class="text-primary underline" href="/sign-in">{auth.signIn.title}</a>
    </p>
  </div>

  <Button className="mt-5 w-full" type="submit">{auth.signUp.submitButton}</Button>
</form>
