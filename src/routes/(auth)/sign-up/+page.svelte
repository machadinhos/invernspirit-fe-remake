<script lang="ts">
  import TextInput from "$lib/components/ui/text-input/TextInput.svelte";
  import {
    containsXSSPatterns,
    validateEmail,
    validatePassword
  } from "$lib/utils/input-validation";
  import PasswordRequiredChecksSection from "./PasswordRequiredChecksSection.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import CheckBox from "$lib/components/ui/CheckBox.svelte";

  interface FormFields {
    [key: string]: {
      value: string;
      label: string;
      isValid: boolean;
      invalidText: string;
      validate: (value: string) => boolean;
    };
  }

  const formFields: FormFields = $state({
    firstName: {
      value: "",
      label: "First Name",
      isValid: true,
      invalidText: "Please enter your first name.",
      validate: (value) => value !== "" && !containsXSSPatterns(value)
    },
    lastName: {
      value: "",
      label: "Last Name",
      isValid: true,
      invalidText: "Please enter your last name.",
      validate: (value) => value !== "" && !containsXSSPatterns(value)
    },
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
    },
    confirmPassword: {
      value: "",
      label: "Confirm Password",
      isValid: true,
      invalidText: "Please rewrite your password.",
      validate: (value) =>
        value === formFields.password.value && !containsXSSPatterns(value)
    }
  });

  let rememberMeInput = $state(false);

  function generateOnblurCallback(field: string) {
    return () => {
      formFields[field].isValid = formFields[field].validate(
        formFields[field].value
      );
    };
  }

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

<form class="w-full gap-6" onsubmit={submitSignUp}>
  <div class="flex w-full gap-4">
    {#each ["firstName", "lastName"] as fieldName}
      <div class="w-1/2">
        <TextInput
          onblur={generateOnblurCallback(fieldName)}
          invalid={!formFields[fieldName].isValid}
          invalidText={formFields[fieldName].invalidText}
          bind:value={formFields[fieldName].value}
          type="text"
          required
        >
          {#snippet label()}
            {formFields[fieldName].label}
          {/snippet}
        </TextInput>
      </div>
    {/each}
  </div>

  {#each ["email", "password", "confirmPassword"] as fieldName}
    <div class="w-full">
      <TextInput
        onblur={generateOnblurCallback(fieldName)}
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
      {#if fieldName === "password"}
        <PasswordRequiredChecksSection password={formFields.password.value} />
      {/if}
    </div>
  {/each}

  <CheckBox bind:checked={rememberMeInput} label="Remember me?" />

  <div class="mt-10 flex items-center justify-center">
    <p>
      Already have an account? <a class="text-primary underline" href="/sign-in"
        >Sign in</a
      >
    </p>
  </div>

  <Button className="mt-5 w-full" type="submit">Sign up</Button>
</form>
