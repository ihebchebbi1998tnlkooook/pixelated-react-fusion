
import { CartItem } from "@/types/cart";
import { UserDetails, getUserDetails } from "./userDetailsStorage";
import { getCartItems } from "./cartStorage";
import { getPersonalizations } from "./personalizationStorage";

export interface OrderData {
  cartItems: CartItem[];
  userDetails: UserDetails | null;
  personalizations: Record<number, string>;
  total: number;
  shipping: number;
  finalTotal: number;
  paymentMethod: 'card' | 'cash' | 'reservi' | null;
  orderId: string;
  orderDate: string;
}

export const collectOrderData = (): OrderData => {
  // Get cart items and calculate totals
  const cartItems = getCartItems();
  
  // Calculate total including box prices
  const total = cartItems.reduce((sum, item) => {
    let itemTotal = item.price * item.quantity;
    // Add box price if item has box
    if (item.withBox) {
      itemTotal += 30 * item.quantity; // 30 TND per box
    }
    return sum + itemTotal;
  }, 0);

  // Free shipping over 299 TND (including box prices)
  const shipping = total >= 299 ? 0 : 8;
  const finalTotal = total + shipping;

  // Get user details
  const userDetails = getUserDetails();
  
  // Get personalizations
  const personalizations = getPersonalizations();

  // Get payment method (if stored)
  const paymentMethod = localStorage.getItem('paymentMethod') as 'card' | 'cash' | 'reservi' | null;

  // Generate order ID
  const orderId = `ORDER-${Date.now()}`;

  const orderData: OrderData = {
    cartItems,
    userDetails,
    personalizations,
    total,
    shipping,
    finalTotal,
    paymentMethod,
    orderId,
    orderDate: new Date().toISOString(),
  };

  return orderData;
};

// Helper function to save payment method
export const savePaymentMethod = (method: 'card' | 'cash' | 'reservi') => {
  localStorage.setItem('paymentMethod', method);
};

// Helper function to clear all order related data
export const clearOrderData = () => {
  localStorage.removeItem('cartItems');
  localStorage.removeItem('userDetails');
  localStorage.removeItem('personalizations');
  localStorage.removeItem('paymentMethod');
};

// Example of how to use this with an API call
export const submitOrderToAPI = async (orderData: OrderData) => {
  
  try {
    // Replace with your actual API endpoint and logic
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit order');
    }

    const result = await response.json();
    
    // Clear local storage after successful submission
    clearOrderData();
    
    return result;
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  }
};
