<script lang="ts">
  import { auth } from '$content';
  import { goto } from '$app/navigation';
  import SignIn from '$lib/components/ui/auth/SignIn.svelte';

  let { params } = $props();

  const actionAfterAuthentication = (): void => {
    goto(`/${params.country}`);
  };
</script>

<svelte:head><title>{auth.signIn.headTitle}</title></svelte:head>

<SignIn {actionAfterAuthentication} />
