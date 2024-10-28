<script lang="ts">
  import TextInput from "$lib/components/ui/TextInput.svelte";
  import { validateEmail } from "$lib/utils/general.js";
  import PasswordRequiredChecksSection from "./PasswordRequiredChecksSection.svelte";
  import Button from "$lib/components/ui/Button.svelte";

  let firstNameInput: string = $state("");
  let isEmptyFirstNameInput: boolean = $state(false);
  let lastNameInput: string = $state("");
  let isEmptyLastNameInput: boolean = $state(false);
  let emailInput: string = $state("");
  let isValidEmailInput = $derived(validateEmail(emailInput));
  let passwordInput: string = $state("");
  let isValidPasswordInput = $state(false);
  let confirmPasswordInput: string = $state("");
  let isValidConfirmPasswordInput = $state(false);
</script>

<form class="w-full gap-4">
  <div class="flex w-full gap-4">
    <div class="w-1/2">
      <TextInput
        invalid={isEmptyFirstNameInput}
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
        invalid={isEmptyLastNameInput}
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
      invalid={!isValidEmailInput && emailInput !== ""}
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
      invalid={isValidPasswordInput}
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
  <div class="mt-0.5 w-full">
    <TextInput
      invalid={isValidConfirmPasswordInput}
      invalidText="Please rewrite your password."
      bind:value={confirmPasswordInput}
      type="password"
    >
      {#snippet label()}
        Confirm Password
      {/snippet}
    </TextInput>
  </div>
  <Button className="w-full" onclick={() => alert("todo")} type="submit"
    >Sign up</Button
  >
</form>
