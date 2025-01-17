import { PUBLIC_STOCK_BUCKET_HOST } from '$env/static/public';
import type { StockBucket } from '$types';

export function formatPrice(grossPrice: number): string {
  return (grossPrice / 100).toFixed(2);
}

export async function getStockFromBucket(productId: string): Promise<StockBucket> {
  return (await fetch(`${PUBLIC_STOCK_BUCKET_HOST}/${productId}`)).json();
}

export function capitalize(text: string): string {
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
