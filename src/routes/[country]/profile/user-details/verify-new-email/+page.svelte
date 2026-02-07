<script lang="ts">
  import { Button, VerificationCodeInput } from '$components';
  import { bffClient } from '$service';
  import { Form } from '$components-utils';
  import { goto } from '$app/navigation';
  import { profile } from '$content';
  import { user } from '$state';
  import { validateRequiredInput } from '$lib/utils/input-validation';

  let { params } = $props();

  let code: string = $state('');

  const validateCode = (value: string): boolean => {
    return value.length === 8 && /^[0-9]+$/.test(value) && validateRequiredInput(value);
  };

  const submitCode = async (): Promise<void> => {
    if (!validateCode(code)) return;

    user.value = await bffClient.user.update.email.validateCode(params.country, code);
    goto(`/${params.country}/profile/user-details`);
  };
</script>

<Form class="grid place-items-center" onsubmit={submitCode}>
  <h1 class="mb-2.5 text-3xl">{profile.userDetails.updateEmail.title}</h1>
  <p>{profile.userDetails.updateEmail.description}</p>
  <VerificationCodeInput length={8} type="numeric" bind:value={code} />

  <Button class="mt-5" fullWidth type="submit">{profile.userDetails.updateEmail.submitButton}</Button>
</Form>
