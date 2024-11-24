<script lang="ts">
  import { FormField, generateFormFieldOnblurCallback, validateFormFields } from '$lib/utils/form-fields.svelte';
  import { validateEmail, validatePassword } from '$lib/utils/input-validation';
  import Button from '$components/ui/Button.svelte';
  import CheckBox from '$components/ui/CheckBox.svelte';
  import { content } from '$content';
  import TextInput from '$components/ui/text-input/TextInput.svelte';

  let formFields: FormField[] = [
    new FormField({
      id: 'sign-in-email',
      type: 'email',
      name: 'email',
      autocomplete: 'username',
      label: content.auth.signIn.formFields.email.label,
      invalidText: content.auth.signIn.formFields.email.invalidText,
      validate: validateEmail,
    }),
    new FormField({
      id: 'sign-in-password',
      name: 'password',
      type: 'password',
      autocomplete: 'current-password',
      label: content.auth.signIn.formFields.password.label,
      invalidText: content.auth.signIn.formFields.password.invalidText,
      validate: (value) => validatePassword(value).isValid,
    }),
  ];

  let rememberMeInput = $state(false);

  function submitSignIn() {
    if (!validateFormFields(formFields)) return;

    alert('todo');
  }
</script>

<svelte:head><title>{content.auth.signIn.headTitle}</title></svelte:head>

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

  <CheckBox label="Keep me logged in?" bind:checked={rememberMeInput} />

  <div class="mt-10 flex items-center justify-center">
    <p>
      {content.auth.signIn.signUpMessage}<a class="text-primary underline" href="/sign-up"
        >{content.auth['signUp'].title}</a
      >
    </p>
  </div>

  <Button className="mt-5 w-full" type="submit">{content.auth.signIn.submitButton}</Button>
</form>
