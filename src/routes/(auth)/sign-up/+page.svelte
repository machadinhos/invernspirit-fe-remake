<script lang="ts">
  import TextInput from '$lib/components/ui/text-input/TextInput.svelte';
  import {
    containsXSSPatterns,
    validateEmail,
    validatePassword
  } from '$lib/utils/input-validation';
  import PasswordRequiredChecksSection from './PasswordRequiredChecksSection.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import CheckBox from '$lib/components/ui/CheckBox.svelte';
  import {
    type FormField,
    generateOnblurCallback,
    validateFormFields
  } from '$lib/utils/auth-form-fields';

  const formFields: { [key: string]: FormField } = $state({
    firstName: {
      value: '',
      name: 'firstName',
      autocomplete: 'given-name',
      type: 'text',
      label: 'First Name',
      isValid: true,
      invalidText: 'Please enter your first name.',
      validate: (value) => value !== '' && !containsXSSPatterns(value)
    },
    lastName: {
      value: '',
      name: 'lastName',
      autocomplete: 'family-name',
      type: 'text',
      label: 'Last Name',
      isValid: true,
      invalidText: 'Please enter your last name.',
      validate: (value) => value !== '' && !containsXSSPatterns(value)
    },
    email: {
      value: '',
      name: 'email',
      autocomplete: 'username',
      type: 'email',
      label: 'Email',
      isValid: true,
      invalidText: 'Please enter a valid email address.',
      validate: validateEmail
    },
    password: {
      value: '',
      name: 'password',
      autocomplete: 'new-password',
      type: 'password',
      label: 'Password',
      isValid: true,
      invalidText: 'Please enter a valid password.',
      validate: (value) => validatePassword(value).isValid
    },
    confirmPassword: {
      value: '',
      autocomplete: 'new-password',
      type: 'password',
      name: 'confirmPassword',
      label: 'Confirm Password',
      isValid: true,
      invalidText: 'Please rewrite your password.',
      validate: (value) =>
        value === formFields.password.value && !containsXSSPatterns(value)
    }
  });

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
      Already have an account? <a class="text-primary underline" href="/sign-in"
        >Sign in</a
      >
    </p>
  </div>

  <Button className="mt-5 w-full" type="submit">Sign up</Button>
</form>
