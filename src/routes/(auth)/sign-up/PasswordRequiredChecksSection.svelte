<script lang="ts">
  import { validatePassword } from "$lib/utils/general";
  import PasswordRequiredCheck from "./PasswordRequiredCheck.svelte";

  interface Props {
    password: string;
  }

  let { password }: Props = $props();

  let { errors } = $derived(validatePassword(password));
</script>

<PasswordRequiredCheck text={"At least 10 characters."} error={errors.length} />
<PasswordRequiredCheck
  text={"At least 1 uppercase letter."}
  error={errors.uppercaseLetter}
/>
<PasswordRequiredCheck
  text={"At least 1 special character."}
  error={errors.specialCharacters}
/>
