<script lang="ts">
  import { Button } from '$components';
  import { cart } from '$content';
  import { page } from '$app/state';
  import { type Toast } from '$state';

  type Props = {
    toast: Toast;
  };

  let { toast }: Props = $props();
</script>

<p>{cart.itemAddedToCart}</p>
<div class="flex justify-center">
  <Button
    class="mt-2"
    as="anchor"
    draggable={false}
    href="/{page.params.country}/cart"
    onclick={toast.destroy}
    shrinkOnClick={false}
  >
    <strong>{cart.viewCart}</strong>
  </Button>
</div>
