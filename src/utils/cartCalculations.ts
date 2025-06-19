
import { CartItem } from '@/types/cart';

export const BOX_PRICE = 30;

export const calculateCartTotals = (cartItems: CartItem[], hasNewsletterDiscount: boolean) => {
  const itemsSubtotal = cartItems.reduce((sum, item) => {
    // Use the item's price directly since it's already discounted when added to cart
    return sum + (item.price * item.quantity);
  }, 0);
  
  const boxTotal = cartItems.reduce((sum, item) => 
    sum + (item.withBox ? BOX_PRICE * item.quantity : 0), 0);
  
  // Calculate subtotal including box prices
  const subtotal = itemsSubtotal + boxTotal;
  
  // Calculate shipping based on total including box prices
  // Free shipping for orders over 299 TND
  const shipping = subtotal >= 299 ? 0 : 8;
  
  // Only apply newsletter discount if it exists
  const discount = hasNewsletterDiscount ? subtotal * 0.05 : 0;
  
  // Total after discount but before shipping
  const total = subtotal - discount;
  
  // Final total with shipping
  const finalTotal = total + shipping;
  
  return { 
    subtotal: itemsSubtotal, 
    discount, 
    total, 
    boxTotal, 
    shipping,
    finalTotal 
  };
};
