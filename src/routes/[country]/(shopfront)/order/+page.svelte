<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { page } from '$app/state';

  let orderId: string | undefined = $state();

  onMount(() => {
    orderId = page.url.searchParams.get('id') || undefined;
    if (!orderId) {
      goto(`/${page.params.country}/cart`);
    }
    // await config.afterInitialization(async () => {
    //   console.log(JSON.stringify(await bffClient.getOrderById(orderId as string, page.params.country), null, 2));
    // });
  });
</script>

{orderId}
