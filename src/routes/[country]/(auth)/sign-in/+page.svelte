<script lang="ts">
  import { Button, CheckBox, TextInput } from '$components';
  import { FormField, generateFormFieldOnblurCallback, validateFormFields } from '$lib/utils/form-fields.svelte';
  import { validateEmail, validatePassword } from '$lib/utils/input-validation';
  import { auth } from '$content';
  import AuthSwitchMessage from '../AuthSwitchMessage.svelte';
  import OAuthSection from '../OAuthSection.svelte';
  import { page } from '$app/state';

  let formFields: FormField[] = [
    new FormField({
      id: 'sign-in-email',
      type: 'email',
      name: 'email',
      autocomplete: 'username',
      label: auth.signIn.formFields.email.label,
      invalidText: auth.signIn.formFields.email.invalidText,
      validate: validateEmail,
    }),
    new FormField({
      id: 'sign-in-password',
      name: 'password',
      type: 'password',
      autocomplete: 'current-password',
      label: auth.signIn.formFields.password.label,
      invalidText: auth.signIn.formFields.password.invalidText,
      validate: (value) => validatePassword(value).isValid,
    }),
  ];

  let rememberMeInput = $state(false);

  function submitSignIn() {
    if (!validateFormFields(formFields)) return;

    alert('todo');
  }
</script>

<svelte:head><title>{auth.signIn.headTitle}</title></svelte:head>

<form class="w-full gap-6 pt-10" onsubmit={submitSignIn}>
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

  <div class="flex justify-between">
    <CheckBox label={auth.rememberMeLabel} bind:checked={rememberMeInput} />
    <a class="text-primary underline" href="/{page.params.country}/sign-in">{auth.signIn.forgotPassword}</a>
  </div>

  <Button className="mt-5 w-full" type="submit">{auth.signIn.submitButton}</Button>
</form>

<OAuthSection />

<AuthSwitchMessage
  authPage={auth.signUp.title}
  href="/{page.params.country}/sign-up"
  question={auth.signIn.signUpMessage}
/>
