<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { page } from '$app/state';

  let orderId = $state();

  onMount(() => {
    orderId = page.url.searchParams.get('id');
    if (!orderId) {
      goto('/cart');
    }
  });
</script>

{orderId}
