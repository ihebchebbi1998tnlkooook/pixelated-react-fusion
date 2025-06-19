
export const getAvailableStockForSize = (product: any, size: string): number => {
  // For products without sizes (like wallets, keychains, etc.)
  if (['portefeuilles', 'porte-cles', 'porte-cartes'].includes(product.itemgroup_product)) {
    return parseInt(product.qnty_product) || 0;
  }

  // For costumes which use different size properties
  if (product.itemgroup_product === 'costumes') {
    return product.sizes[size] || 0;
  }

  // Map the size to the corresponding property name in the product object
  const sizeMapping: { [key: string]: string } = {
    'S': 's',
    'M': 'm',
    'L': 'l',
    'XL': 'xl',
    'XXL': 'xxl',
    '3XL': '3xl'
  };

  // Get the property name for the size (e.g., 'm' for size 'M')
  const sizeKey = sizeMapping[size.toUpperCase()];
  
  // Get the stock value from the product object using the size property
  if (sizeKey && product.sizes && product.sizes[sizeKey.toLowerCase()]) {
    return product.sizes[sizeKey.toLowerCase()];
  }
  
  // If we can't find the size or the stock, return 0
  return 0;
};

export const getTotalStock = (product: any): number => {
  return parseInt(product.qnty_product || '0');
};
