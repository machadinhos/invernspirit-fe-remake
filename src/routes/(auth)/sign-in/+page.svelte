<script lang="ts">
  import { validateEmail, validatePassword } from "$lib/utils/input-validation";
  import {
    type FormFields,
    generateOnblurCallback,
    validateFormFields
  } from "$lib/utils/auth-form-fields";
  import TextInput from "$lib/components/ui/text-input/TextInput.svelte";
  import CheckBox from "$lib/components/ui/CheckBox.svelte";
  import Button from "$lib/components/ui/Button.svelte";

  let formFields: FormFields = $state({
    email: {
      value: "",
      label: "Email",
      isValid: true,
      invalidText: "Please enter a valid email address.",
      validate: validateEmail
    },
    password: {
      value: "",
      label: "Password",
      isValid: true,
      invalidText: "Please enter a valid password.",
      validate: (value) => validatePassword(value).isValid
    }
  });

  let rememberMeInput = $state(false);

  function submitSignIn() {
    if (!validateFormFields(formFields)) return;

    alert("todo");
  }
</script>

<form class="mb-8 w-full gap-6 pt-10" onsubmit={submitSignIn}>
  {#each ["email", "password"] as fieldName}
    <div class="w-full">
      <TextInput
        onblur={generateOnblurCallback(formFields, fieldName)}
        invalid={!formFields[fieldName].isValid}
        invalidText={formFields[fieldName].invalidText}
        bind:value={formFields[fieldName].value}
        type={fieldName === "email" ? "email" : "password"}
        required
      >
        {#snippet label()}
          {formFields[fieldName].label}
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
