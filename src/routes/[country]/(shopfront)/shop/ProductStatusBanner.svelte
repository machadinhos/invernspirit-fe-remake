<script lang="ts">
  import { shop } from '$content';

  interface Props {
    bucketStock: number | undefined;
    inCartQuantity: number;
  }

  let { bucketStock, inCartQuantity }: Props = $props();

  interface Banner {
    text: string;
    bgColor: string;
  }

  const banners: { [key: string]: Banner } = {
    allItemsInCart: {
      text: shop.products.cardBanner.allItemsInCart,
      bgColor: 'bg-warning',
    },
    someItemsInCart: {
      text: shop.products.cardBanner.someItemsInCart,
      bgColor: 'bg-background',
    },
    outOfStock: {
      text: shop.products.cardBanner.outOfStock,
      bgColor: 'bg-error',
    },
  };

  let banner: Banner | undefined = $derived(getCurrentBanner());

  function getCurrentBanner(): Banner | undefined {
    if (bucketStock === undefined) return;
    if (bucketStock === 0) return banners.outOfStock;
    if (inCartQuantity === 0) return;
    if (bucketStock <= inCartQuantity) return banners.allItemsInCart;
    return banners.someItemsInCart;
  }
</script>

{#if banner}
  <div class="px-2 {banner.bgColor}">{banner.text}</div>
{/if}
