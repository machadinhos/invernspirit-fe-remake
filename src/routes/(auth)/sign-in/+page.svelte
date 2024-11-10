<script lang="ts">
  import { validateEmail, validatePassword } from '$lib/utils/input-validation';
  import { FormField, generateOnblurCallback, validateFormFields } from '$lib/utils/form-fields.svelte';
  import TextInput from '$components/ui/text-input/TextInput.svelte';
  import CheckBox from '$components/ui/CheckBox.svelte';
  import Button from '$components/ui/Button.svelte';
  import { content } from '$content';

  let formFields: FormField[] = [
    new FormField({
      id: 'sign-in-email',
      type: 'email',
      name: 'email',
      autocomplete: 'username',
      label: content.auth.signIn.formFields.email.label,
      invalidText: content.auth.signIn.formFields.email.invalidText,
      validate: validateEmail
    }),
    new FormField({
      id: 'sign-in-password',
      name: 'password',
      type: 'password',
      autocomplete: 'current-password',
      label: content.auth.signIn.formFields.password.label,
      invalidText: content.auth.signIn.formFields.password.invalidText,
      validate: (value) => validatePassword(value).isValid
    })
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
        id={field.id}
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
      {content.auth.signIn.signUpMessage}<a class="text-primary underline" href="/sign-up"
        >{content.auth['signUp'].title}</a
      >
    </p>
  </div>

  <Button className="mt-5 w-full" type="submit">{content.auth.signIn.submitButton}</Button>
</form>
