<script lang="ts">
  import { auth } from '$content';
  import { goto } from '$app/navigation';
  import SignUp from '$lib/components/ui/auth/SignUp.svelte';

  let { params } = $props();

  const actionAfterAuthentication = (): void => {
    goto(`/${params.country}`);
  };
</script>

<svelte:head><title>{auth.signUp.headTitle}</title></svelte:head>

<SignUp {actionAfterAuthentication} />
