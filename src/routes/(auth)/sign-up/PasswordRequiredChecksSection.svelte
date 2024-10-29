<script lang="ts">
  import { validatePassword } from "$lib/utils/input-validation";
  import PasswordRequiredCheck from "./PasswordRequiredCheck.svelte";

  interface Props {
    password: string;
  }

  let { password }: Props = $props();

  let { errors } = $derived(validatePassword(password));
</script>

<PasswordRequiredCheck
  text={"Between 10 and 128 characters."}
  error={errors.length}
/>
<PasswordRequiredCheck
  text={"At least 1 uppercase letter."}
  error={errors.uppercaseLetter}
/>
<PasswordRequiredCheck
  text={"At least 1 special character."}
  error={errors.specialCharacters}
/>
