const baseDomain = 'invernspirit.com';
const protocol = 'https://';

function generateInternalURL(pathName: string, subDomain?: string) {
  const fullDomain = subDomain
    ? `${subDomain}${subDomain.endsWith('.') ? '' : '.'}${baseDomain}`
    : baseDomain;

  const fullPath = pathName.startsWith('/') ? pathName : `/${pathName}`;

  return new URL(`${protocol}${fullDomain}${fullPath}`).toString();
}

export const imageLinks = {
  index: {
    'bg-images': [
      generateInternalURL('/products/ceramics-product-1-1.jpeg', 'images.'),
      generateInternalURL('/products/ceramics-product-2-1.jpeg', 'images.'),
      generateInternalURL('/products/ceramics-product-3-1.jpeg', 'images.'),
      generateInternalURL('/products/ceramics-product-4-1.jpeg', 'images.')
    ]
  }
};

export const socialMediaLinks = {
  instagram: new URL('https://www.lamaisonregina.com/pt').toString(),
  pinterestP: new URL('https://www.lamaisonregina.com/pt').toString(),
  youtube: new URL('https://www.lamaisonregina.com/pt').toString()
};
