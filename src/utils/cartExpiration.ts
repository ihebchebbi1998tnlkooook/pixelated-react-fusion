
import { toast } from "@/hooks/use-toast";
import { getCartItems, saveCartItems } from "./cartStorage";

const EXPIRATION_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds for session expiration
const WARNING_TIME = 15 * 60 * 1000; // 15 minutes warning before session expiration
const ONE_DAY_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

class CartExpirationManager {
  private expirationTimer: NodeJS.Timeout | null = null;
  private warningTimer: NodeJS.Timeout | null = null;
  private oneDayTimer: NodeJS.Timeout | null = null;

  startExpirationTimer() {
    // Clear any existing timers
    this.clearTimers();

    // Set expiration time
    const expirationTime = Date.now() + EXPIRATION_TIME;
    localStorage.setItem('cartExpirationTime', expirationTime.toString());

    // Also set one day expiration time
    const oneDayExpirationTime = Date.now() + ONE_DAY_EXPIRATION;
    localStorage.setItem('cartOneDayExpirationTime', oneDayExpirationTime.toString());

    // Set warning timer
    const timeUntilWarning = EXPIRATION_TIME - WARNING_TIME;
    this.warningTimer = setTimeout(() => {
      const minutesLeft = Math.ceil(WARNING_TIME / (60 * 1000));
      toast({
        title: "Attention !",
        description: `Votre panier expirera dans ${minutesLeft} minutes`,
        style: {
          backgroundColor: '#700100',
          color: 'white',
          border: '1px solid #590000',
        },
        duration: 10000, // Show for 10 seconds
      });
    }, timeUntilWarning);

    // Set expiration timer
    this.expirationTimer = setTimeout(() => {
      this.clearCart("Votre panier a été vidé en raison de l'expiration du délai");
    }, EXPIRATION_TIME);

    // Set one day expiration timer
    this.oneDayTimer = setTimeout(() => {
      this.clearCart("Votre panier a été automatiquement vidé après 24 heures");
    }, ONE_DAY_EXPIRATION);
  }

  clearTimers() {
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
      this.expirationTimer = null;
    }
    if (this.warningTimer) {
      clearTimeout(this.warningTimer);
      this.warningTimer = null;
    }
    if (this.oneDayTimer) {
      clearTimeout(this.oneDayTimer);
      this.oneDayTimer = null;
    }
  }

  clearCart(message: string = "Votre panier a été vidé") {
    saveCartItems([]);
    localStorage.removeItem('cartExpirationTime');
    localStorage.removeItem('cartOneDayExpirationTime');
    this.clearTimers();
    
    toast({
      title: "Panier expiré",
      description: message,
      style: {
        backgroundColor: '#700100',
        color: 'white',
        border: '1px solid #590000',
      },
    });
  }

  checkExpiration() {
    // Check session expiration
    const expirationTime = localStorage.getItem('cartExpirationTime');
    if (expirationTime) {
      const timeLeft = parseInt(expirationTime) - Date.now();
      
      if (timeLeft <= 0) {
        this.clearCart("Votre panier a été vidé en raison de l'expiration du délai");
        return;
      } else {
        // Restart timer with remaining time
        if (this.expirationTimer) clearTimeout(this.expirationTimer);
        
        // Set warning if within warning period
        if (timeLeft <= WARNING_TIME) {
          const minutesLeft = Math.ceil(timeLeft / (60 * 1000));
          toast({
            title: "Attention !",
            description: `Votre panier expirera dans ${minutesLeft} minutes`,
            style: {
              backgroundColor: '#700100',
              color: 'white',
              border: '1px solid #590000',
            },
            duration: 10000,
          });
        }

        this.expirationTimer = setTimeout(() => {
          this.clearCart("Votre panier a été vidé en raison de l'expiration du délai");
        }, timeLeft);

        if (timeLeft > WARNING_TIME && this.warningTimer === null) {
          this.warningTimer = setTimeout(() => {
            const minutesLeft = Math.ceil(WARNING_TIME / (60 * 1000));
            toast({
              title: "Attention !",
              description: `Votre panier expirera dans ${minutesLeft} minutes`,
              style: {
                backgroundColor: '#700100',
                color: 'white',
                border: '1px solid #590000',
              },
              duration: 10000,
            });
          }, timeLeft - WARNING_TIME);
        }
      }
    }

    // Check one day expiration
    const oneDayExpirationTime = localStorage.getItem('cartOneDayExpirationTime');
    if (oneDayExpirationTime) {
      const timeLeft = parseInt(oneDayExpirationTime) - Date.now();
      
      if (timeLeft <= 0) {
        this.clearCart("Votre panier a été automatiquement vidé après 24 heures");
        return;
      } else if (this.oneDayTimer === null) {
        // Restart one day timer with remaining time
        this.oneDayTimer = setTimeout(() => {
          this.clearCart("Votre panier a été automatiquement vidé après 24 heures");
        }, timeLeft);
      }
    } else if (getCartItems().length > 0) {
      // If cart has items but no expiration time is set, set it now
      const oneDayExpirationTime = Date.now() + ONE_DAY_EXPIRATION;
      localStorage.setItem('cartOneDayExpirationTime', oneDayExpirationTime.toString());
      
      // Set one day expiration timer
      this.oneDayTimer = setTimeout(() => {
        this.clearCart("Votre panier a été automatiquement vidé après 24 heures");
      }, ONE_DAY_EXPIRATION);
    }
  }
}

export const cartExpirationManager = new CartExpirationManager();
