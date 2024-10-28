<script lang="ts">
  import TextInput from "$lib/components/ui/TextInput.svelte";
  import { validateEmail, validatePassword } from "$lib/utils/general.js";
  import PasswordRequiredChecksSection from "./PasswordRequiredChecksSection.svelte";
  import Button from "$lib/components/ui/Button.svelte";

  // first name
  let firstNameInput: string = $state("");
  let isValidFirstNameInput: boolean = $state(true);

  // last name
  let lastNameInput: string = $state("");
  let isValidLastNameInput: boolean = $state(true);

  // email
  let emailInput: string = $state("");
  let isValidEmailInput = $state(true);
  $inspect(validateEmail(emailInput));

  // password
  let passwordInput: string = $state("");
  let isValidPasswordInput = $state(true);

  // confirm password
  let confirmPasswordInput: string = $state("");
  let isValidConfirmPasswordInput = $state(true);

  function submitSignUp() {
    let hasError = false;
    if (firstNameInput === "") {
      hasError = true;
      isValidFirstNameInput = false;
    }
    if (lastNameInput === "") {
      hasError = true;
      isValidLastNameInput = false;
    }
    if (!validateEmail(emailInput)) {
      hasError = true;
      isValidEmailInput = false;
    }
    if (validatePassword(passwordInput).hasErrors) {
      hasError = true;
      isValidPasswordInput = false;
    }
    if (confirmPasswordInput !== passwordInput) {
      hasError = true;
      isValidConfirmPasswordInput = false;
    }

    if (hasError) return;
    alert("todo");
  }
</script>

<form class="w-full gap-4">
  <div class="flex w-full gap-4">
    <div class="w-1/2">
      <TextInput
        invalid={!isValidFirstNameInput}
        invalidText="Please enter your first name."
        bind:value={firstNameInput}
        type="text"
      >
        {#snippet label()}
          First Name
        {/snippet}
      </TextInput>
    </div>
    <div class="w-1/2">
      <TextInput
        invalid={!isValidLastNameInput}
        invalidText="Please enter your last name."
        bind:value={lastNameInput}
        type="text"
      >
        {#snippet label()}
          Last Name
        {/snippet}
      </TextInput>
    </div>
  </div>
  <div class="w-full">
    <TextInput
      invalid={!isValidEmailInput}
      invalidText="Please enter a valid email address."
      bind:value={emailInput}
      type="email"
    >
      {#snippet label()}
        Email
      {/snippet}
    </TextInput>
  </div>
  <div class="w-full">
    <TextInput
      invalid={!isValidPasswordInput}
      invalidText="Please enter a valid password."
      bind:value={passwordInput}
      type="password"
    >
      {#snippet label()}
        Password
      {/snippet}
    </TextInput>
    <PasswordRequiredChecksSection password={passwordInput} />
  </div>
  <div class="mb-10 mt-0.5 w-full">
    <TextInput
      invalid={!isValidConfirmPasswordInput}
      invalidText="Please rewrite your password."
      bind:value={confirmPasswordInput}
      type="password"
    >
      {#snippet label()}
        Confirm Password
      {/snippet}
    </TextInput>
  </div>
  <Button className="w-full" onclick={submitSignUp} type="submit"
    >Sign up</Button
  >
</form>
