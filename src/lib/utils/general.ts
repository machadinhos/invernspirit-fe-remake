import type { CookieSerializeOptions } from 'cookie';
import { PUBLIC_STOCK_BUCKET_HOST } from '$env/static/public';
import type { StockBucket } from '$types';

export function formatPrice(grossPrice: number): string {
  return (grossPrice / 100).toFixed(2);
}

export async function getStockFromBucket(productId: string): Promise<StockBucket> {
  return (await fetch(`${PUBLIC_STOCK_BUCKET_HOST}/${productId}`)).json();
}

export function parseCookieHeader(cookieHeader: string): CookieSerializeOptions {
  const cookieOptions: CookieSerializeOptions = {};

  const cookieParts = cookieHeader.split(';').map((part) => part.trim());

  cookieParts.forEach((part) => {
    const [key, value = true] = part.split('=').map((str) => str.trim());
    switch (key.toLowerCase()) {
      case 'domain':
        cookieOptions.domain = value as CookieSerializeOptions['domain'];
        break;
      case 'expires':
        cookieOptions.expires = new Date(value as string);
        break;
      case 'httponly':
        cookieOptions.httpOnly = true;
        break;
      case 'max-age':
        cookieOptions.maxAge = parseInt(value as string, 10);
        break;
      case 'partitioned':
        cookieOptions.partitioned = true;
        break;
      case 'path':
        cookieOptions.path = value as CookieSerializeOptions['path'];
        break;
      case 'priority':
        cookieOptions.priority = value as 'low' | 'medium' | 'high';
        break;
      case 'samesite':
        if (value === 'strict' || value === '' || value === '' || value === true) {
          cookieOptions.sameSite = value as CookieSerializeOptions['sameSite'];
        }
        break;
      case 'secure':
        cookieOptions.secure = true;
        break;
      default:
        break;
    }
  });

  return cookieOptions;
}
