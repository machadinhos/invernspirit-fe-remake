<script lang="ts">
  import Button from '$components/ui/Button.svelte';
  import CheckBox from '$components/ui/CheckBox.svelte';
  import TextInput from '$components/ui/text-input/TextInput.svelte';
  import { content } from '$content';
  import { FormField, generateFormFieldOnblurCallback, validateFormFields } from '$lib/utils/form-fields.svelte';
  import { validateEmail, validatePassword } from '$lib/utils/input-validation';

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

<form class="w-full gap-6 pt-10" onsubmit={submitSignIn}>
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

  <CheckBox bind:checked={rememberMeInput} label="Keep me logged in?" />

  <div class="mt-10 flex items-center justify-center">
    <p>
      {content.auth.signIn.signUpMessage}<a class="text-primary underline" href="/sign-up"
        >{content.auth['signUp'].title}</a
      >
    </p>
  </div>

  <Button className="mt-5 w-full" type="submit">{content.auth.signIn.submitButton}</Button>
</form>
