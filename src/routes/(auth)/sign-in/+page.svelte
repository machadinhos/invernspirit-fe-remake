<script lang="ts">
  import { validateEmail, validatePassword } from '$lib/utils/input-validation';
  import {
    type FormField,
    generateOnblurCallback,
    validateFormFields
  } from '$lib/utils/auth-form-fields';
  import TextInput from '$lib/components/ui/text-input/TextInput.svelte';
  import CheckBox from '$lib/components/ui/CheckBox.svelte';
  import Button from '$lib/components/ui/Button.svelte';

  let formFields: FormField[] = $state([
    {
      value: '',
      type: 'email',
      name: 'email',
      autocomplete: 'username',
      label: 'Email',
      isValid: true,
      invalidText: 'Please enter a valid email address.',
      validate: validateEmail
    },
    {
      value: '',
      name: 'password',
      type: 'password',
      autocomplete: 'current-password',
      label: 'Password',
      isValid: true,
      invalidText: 'Please enter a valid password.',
      validate: (value) => validatePassword(value).isValid
    }
  ]);

  let rememberMeInput = $state(false);

  function submitSignIn() {
    if (!validateFormFields(formFields)) return;

    alert('todo');
  }
</script>

<form class="w-full gap-6 pt-10" onsubmit={submitSignIn}>
  {#each formFields as field}
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

  <CheckBox bind:checked={rememberMeInput} label="Keep me logged in?" />

  <div class="mt-10 flex items-center justify-center">
    <p>
      Don't have an account?? <a class="text-primary underline" href="/sign-up"
        >Sign un</a
      >
    </p>
  </div>

  <Button className="mt-5 w-full" type="submit">Sign In</Button>
</form>
