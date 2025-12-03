<script lang="ts">
  import UserDataPage from './UserDataPage.svelte';
  import VerifyEmailPage from './VerifyEmailPage.svelte';

  type Props = {
    actionAfterAuthentication: () => void;
    showAuthSwitchMessage?: boolean;
    email?: string;
  };

  let { actionAfterAuthentication, showAuthSwitchMessage = true, email: initialEmail }: Props = $props();

  // svelte-ignore state_referenced_locally
  let email: string | undefined = $state(initialEmail);
</script>

{#if email === undefined}
  <UserDataPage {actionAfterAuthentication} {showAuthSwitchMessage} bind:email />
{:else}
  <VerifyEmailPage {actionAfterAuthentication} {email} />
{/if}
