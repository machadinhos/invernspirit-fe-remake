<script lang="ts">
  import { cart, config, loading, user } from '$state';
  import { auth } from '$content';
  import { bffClient } from '$service';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { page } from '$app/state';

  let { params } = $props();

  onMount(() => {
    loading.withLoading(async () => {
      try {
        const email = page.url.searchParams.get('email');
        const code = page.url.searchParams.get('code');

        if (!email || !code) {
          goto(`/${params.country}`, { replaceState: true });
          return;
        }

        const payload = {
          email,
          code,
        };

        const { user: signedUpUser, cart: signedUpCart } = await config.afterInitialization(async () => {
          return await bffClient.user.signUp.verifyEmail(params.country, payload);
        });

        user.value = signedUpUser;
        cart.setCart(signedUpCart);
      } finally {
        goto(`/${params.country}`, { replaceState: true });
      }
    });
  });
</script>

<svelte:head><title>{auth.signUp.headTitle}</title></svelte:head>
