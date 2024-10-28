<script lang="ts">
  import TextInput from "$lib/components/ui/TextInput.svelte";
  import { validateEmail, validatePassword } from "$lib/utils/general.js";
  import PasswordRequiredChecksSection from "./PasswordRequiredChecksSection.svelte";
  import Button from "$lib/components/ui/Button.svelte";

  interface FormFields {
    [key: string]: {
      value: string;
      isValid: boolean;
      invalidText: string;
      validate: (value: string) => boolean;
    };
  }

  const formFields: FormFields = $state({
    firstName: {
      value: "",
      isValid: true,
      invalidText: "Please enter your first name.",
      validate: (value) => value !== ""
    },
    lastName: {
      value: "",
      isValid: true,
      invalidText: "Please enter your last name.",
      validate: (value) => value !== ""
    },
    email: {
      value: "",
      isValid: true,
      invalidText: "Please enter a valid email address.",
      validate: validateEmail
    },
    password: {
      value: "",
      isValid: true,
      invalidText: "Please enter a valid password.",
      validate: (value) => !validatePassword(value).hasErrors
    },
    confirmPassword: {
      value: "",
      isValid: true,
      invalidText: "Please rewrite your password.",
      validate: (value) => value === formFields.password.value
    }
  });

  function submitSignUp() {
    let hasError = false;

    for (const [, field] of Object.entries(formFields)) {
      const isValid = field.validate(field.value);
      field.isValid = isValid;
      if (!isValid) hasError = true;
    }

    if (hasError) return;
    alert("todo");
  }
</script>

<form class="w-full gap-6">
  <div class="flex w-full gap-4">
    {#each ["firstName", "lastName"] as fieldName}
      <div class="w-1/2">
        <TextInput
          invalid={!formFields[fieldName].isValid}
          invalidText={formFields[fieldName].invalidText}
          bind:value={formFields[fieldName].value}
          type="text"
        >
          {#snippet label()}
            {fieldName === "firstName" ? "First Name" : "Last Name"}
          {/snippet}
        </TextInput>
      </div>
    {/each}
  </div>

  {#each ["email", "password", "confirmPassword"] as fieldName}
    <div class="w-full">
      <TextInput
        invalid={!formFields[fieldName].isValid}
        invalidText={formFields[fieldName].invalidText}
        bind:value={formFields[fieldName].value}
        type={fieldName === "email" ? "email" : "password"}
      >
        {#snippet label()}
          {fieldName.charAt(0).toUpperCase() +
            fieldName.slice(1).replace(/([A-Z])/g, " $1")}
        {/snippet}
      </TextInput>
      {#if fieldName === "password"}
        <PasswordRequiredChecksSection password={formFields.password.value} />
      {/if}
    </div>
  {/each}

  <Button className="w-full mt-4" onclick={submitSignUp} type="submit">
    Sign up
  </Button>
</form>
