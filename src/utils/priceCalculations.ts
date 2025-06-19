import { getPersonalizationPrice } from './personalizationPricing';

export const calculateDiscountedPrice = (originalPrice: number, discount: string): number => {
  if (!discount || discount === "") return originalPrice;
  
  // Extract only numeric characters and convert to number
  const numericDiscount = parseFloat(discount.replace(/[^0-9.]/g, ''));
  
  if (isNaN(numericDiscount) || numericDiscount <= 0) return originalPrice;
  return originalPrice * (1 - numericDiscount / 100);
};

export const formatPrice = (price: number): string => {
  return price.toFixed(2);
};

export const calculateFinalPrice = (
  basePrice: number, 
  discount: string, 
  itemGroup?: string, 
  hasPersonalization?: boolean,
  isInPack: boolean = false
): number => {
  // Calculate discount only once
  const discountedPrice = calculateDiscountedPrice(basePrice, discount);
  
  // Get personalization fee from config
  const personalizationFee = hasPersonalization && itemGroup 
    ? getPersonalizationPrice(itemGroup, hasPersonalization ? 'yes' : undefined, isInPack)
    : 0;
  
  const finalPrice = discountedPrice + personalizationFee;
  
  return finalPrice;
};