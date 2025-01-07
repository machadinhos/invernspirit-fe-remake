import { browser } from '$app/environment';
import { PUBLIC_STOCK_BUCKET_HOST } from '$env/static/public';
import type { StockBucket } from '$types';

export function formatPrice(priceInCents: number): string {
  return (priceInCents / 100).toFixed(2);
}

export function getCookieValue(key: string): string | undefined {
  if (!browser) {
    return undefined;
  }

  const cookies = document.cookie.split(';');

  const cookie = cookies.find((cookie) => {
    const [cookieKey] = cookie.trim().split('=');
    return cookieKey === key;
  });

  if (!cookie) {
    return undefined;
  }

  const [, value] = cookie.trim().split('=');
  return decodeURIComponent(value);
}

export async function getStockFromBucket(productId: string): Promise<StockBucket> {
  return (await fetch(`${PUBLIC_STOCK_BUCKET_HOST}/${productId}`)).json();
}
