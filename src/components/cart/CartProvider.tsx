
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartContextType } from '@/types/cart';
import { saveCartItems, getCartItems } from '@/utils/cartStorage';
import { getPersonalizations } from '@/utils/personalizationStorage';
import { toast } from "@/hooks/use-toast";
import { stockReduceManager } from '@/utils/StockReduce';
import { calculateCartTotals } from '@/utils/cartCalculations';
import { cartExpirationManager } from '@/utils/cartExpiration';
import { 
  shouldSkipPackagingFee, 
  shouldSkipPackItem, 
  findExistingItem, 
  prepareItemForCart 
} from '@/utils/cartItemManagement';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  personalization?: string;
  fromPack?: boolean;
  pack?: string;
  withBox?: boolean;
  discount_product?: string;
  type_product?: string;
  itemgroup_product?: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [hasNewsletterDiscount, setHasNewsletterDiscount] = useState<boolean>(() => {
    return localStorage.getItem('newsletterSubscribed') === 'true';
  });

  useEffect(() => {
    // First, check for cart expiration (including the 1-day expiration)
    cartExpirationManager.checkExpiration();
    
    const savedItems = getCartItems();
    const personalizations = getPersonalizations();
    
    const itemsWithPersonalization = savedItems.map(item => ({
      ...item,
      personalization: item.personalization || personalizations[item.id] || '',
    }));
    
    if (itemsWithPersonalization.length > 0) {
      setCartItems(itemsWithPersonalization);
      cartExpirationManager.startExpirationTimer();
    }
  }, []);

  useEffect(() => {
    saveCartItems(cartItems);
    if (cartItems.length > 0) {
      cartExpirationManager.startExpirationTimer();
    }
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      if (shouldSkipPackagingFee(prevItems, item)) {
        return prevItems;
      }

      if (shouldSkipPackItem(prevItems, item)) {
        return prevItems;
      }

      const existingItem = findExistingItem(prevItems, item);
      if (existingItem) {
        return prevItems.map(i =>
          i === existingItem
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }

      const itemWithDetails = prepareItemForCart(item);
      return [...prevItems, itemWithDetails];
    });
  };

  const removeFromCart = (id: number) => {
    const itemToRemove = cartItems.find(item => item.id === id);
    
    if (itemToRemove) {
      setCartItems(prevItems => {
        if (itemToRemove.type_product === "Pack" || itemToRemove.fromPack) {
          const packType = itemToRemove.type_product === "Pack" 
            ? itemToRemove.name.split(' - ')[0]
            : itemToRemove.pack;
          
          const remainingItems = prevItems.filter(item => {
            const isPackagingFee = item.type_product === "Pack" && 
                                 item.name.split(' - ')[0] === packType;
            const isPackItem = item.pack === packType && item.fromPack;
            
            return !isPackagingFee && !isPackItem;
          });
          
          toast({
            title: "Pack supprimé",
            description: "Le pack et tous ses articles ont été supprimés du panier",
            style: {
              backgroundColor: '#700100',
              color: 'white',
              border: '1px solid #590000',
            },
            duration: 5000,
          });
          
          return remainingItems;
        }
        
        return prevItems.filter(item => item.id !== id);
      });
    }
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    stockReduceManager.clearItems();
    cartExpirationManager.clearTimers();
    localStorage.removeItem('cartExpirationTime');
    localStorage.removeItem('cartOneDayExpirationTime');
  };

  const applyNewsletterDiscount = () => {
    const subscribedEmail = localStorage.getItem('subscribedEmail');
    if (!subscribedEmail) return;

    const usedDiscountEmails = JSON.parse(localStorage.getItem('usedDiscountEmails') || '[]');
    
    if (usedDiscountEmails.includes(subscribedEmail)) {
      setHasNewsletterDiscount(false);
      localStorage.removeItem('newsletterSubscribed');
      return;
    }

    usedDiscountEmails.push(subscribedEmail);
    localStorage.setItem('usedDiscountEmails', JSON.stringify(usedDiscountEmails));
    
    setHasNewsletterDiscount(true);
    localStorage.setItem('newsletterSubscribed', 'true');
  };

  const removeNewsletterDiscount = () => {
    setHasNewsletterDiscount(false);
    localStorage.removeItem('newsletterSubscribed');
  };

  const calculateTotal = () => {
    return calculateCartTotals(cartItems, hasNewsletterDiscount);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      hasNewsletterDiscount,
      applyNewsletterDiscount,
      removeNewsletterDiscount,
      calculateTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
