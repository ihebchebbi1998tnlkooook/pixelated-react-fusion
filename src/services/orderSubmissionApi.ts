interface UserDetails {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  zip_code: string;
  order_note: string;
  preferred_delivery_date?: string;
  preferred_delivery_time_slot?: string;
}

interface OrderItem {
  item_id: string;
  quantity: number;
  price: number;
  total_price: number;
  name: string;
  size: string;
  color: string;
  personalization: string;
  pack: string;
  box: string;
  image: string;
}

interface PriceDetails {
  subtotal: number;
  shipping_cost: number;
  has_newsletter_discount: boolean;
  newsletter_discount_amount: number;
  final_total: number;
  box_total?: number;
}

interface PaymentDetails {
  method: 'card' | 'cash' | 'reservi';
  status: string;
  konnect_payment_url: string;
  completed_at: string;
}

interface OrderStatus {
  status: string;
  shipped_at: string | null;
  delivered_at: string | null;
}

interface OrderSubmission {
  order_id: string;
  user_details: UserDetails;
  items: OrderItem[];
  price_details: PriceDetails;
  payment: PaymentDetails;
  order_status: OrderStatus;
}

export const submitOrder = async (orderData: OrderSubmission): Promise<any> => {
  try {
    // Use the order note as is since it's already formatted in DeliveryPreference component
    // The format is already "Je préfère être livré le [date] entre [time]" + user notes
    let orderNote = orderData.user_details.order_note;
    
    // If note is empty, set it to '-'
    if (!orderNote || orderNote.trim() === '') {
      orderNote = '-';
    }
    
    // Format data to match the expected API structure
    const formattedOrderData = {
      order_id: orderData.order_id,
      user_details: {
        ...orderData.user_details,
        order_note: orderNote
      },
      items: orderData.items.map(item => ({
        product_id: item.item_id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total_price: item.total_price,
        size: item.size || '-',
        color: item.color || '-',
        personalization: item.personalization || '-', // Ensure non-personalized items have "-"
        pack: item.pack || 'aucun',
        box: item.box || 'Sans box',
        image: item.image
      })),
      price_details: {
        subtotal: Number(orderData.price_details.subtotal),
        shipping_cost: Number(orderData.price_details.shipping_cost),
        has_newsletter_discount: orderData.price_details.has_newsletter_discount ? 1 : 0,
        newsletter_discount_amount: Number(orderData.price_details.newsletter_discount_amount),
        final_total: Number(orderData.price_details.final_total)
      },
      payment: {
        method: orderData.payment.method === 'reservi' 
          ? '50% card_50% cash' 
          : (orderData.payment.method === 'card' ? 'credit_card' : 'cash'),
        status: orderData.payment.method === 'reservi' 
          ? '50% payé' 
          : (orderData.payment.method === 'cash' ? 'A la livraison' : orderData.payment.status),
        konnect_payment_url: orderData.payment.konnect_payment_url,
        completed_at: orderData.payment.completed_at
      },
      order_status: {
        status: orderData.payment.method === 'reservi' 
          ? '50% payé' 
          : (orderData.payment.method === 'cash' ? 'A la livraison' : 'reussie'),
        shipped_at: null,
        delivered_at: null
      }
    };

    const orderResponse = await fetch('https://www.fioriforyou.com/backfiori/submit_all_order.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(formattedOrderData),
    });

    const orderResponseText = await orderResponse.text();

    // Try to parse the response as JSON, but handle HTML error responses
    let orderResult;
    try {
      orderResult = JSON.parse(orderResponseText);
    } catch (e) {
      console.error('Failed to parse order submission response:', e);
      // If the response contains HTML error messages, extract them
      if (orderResponseText.includes('<b>')) {
        const errorMessage = orderResponseText
          .replace(/<[^>]*>/g, ' ') // Remove HTML tags
          .replace(/\s+/g, ' ') // Replace multiple spaces with single space
          .trim();
        throw new Error(`API Error: ${errorMessage}`);
      }
      throw new Error(`Invalid response format: ${orderResponseText}`);
    }

    try {
      await sendOrderConfirmationEmail(formattedOrderData);
    } catch (emailError) {
      console.error('Email confirmation failed but order was submitted:', emailError);
    }

    return orderResult;
  } catch (error) {
    console.error('Error in order submission process:', error);
    throw error;
  }
};

const sendOrderConfirmationEmail = async (orderData: any): Promise<void> => {
  
  try {
    const emailPayload = {
      user_details: {
        email: orderData.user_details.email,
        first_name: orderData.user_details.first_name,
        last_name: orderData.user_details.last_name,
        address: orderData.user_details.address,
        country: orderData.user_details.country,
        zip_code: orderData.user_details.zip_code,
        phone: orderData.user_details.phone,
        order_note: orderData.user_details.order_note || '-'
      },
      order_id: orderData.order_id,
      items: orderData.items.map((item: any) => ({
        name: item.name,
        size: item.size || '-',
        color: item.color || '-',
        quantity: item.quantity,
        total_price: item.total_price,
        personalization: item.personalization || '-',
        pack: item.pack || '-',
        box: item.box || '-'
      })),
      price_details: {
        subtotal: orderData.price_details.subtotal.toString(),
        shipping_cost: orderData.price_details.shipping_cost.toString(),
        newsletter_discount_amount: orderData.price_details.newsletter_discount_amount.toString(),
        final_total: orderData.price_details.final_total.toString()
      },
      payment: {
        method: orderData.payment.method === 'credit_card' ? 'Credit Card' : 'Cash',
        status: orderData.payment.status
      }
    };


    const response = await fetch('https://www.fioriforyou.com/backfiori/testsmtp.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      throw new Error(`Email API error: ${response.status}`);
    }

    const result = await response.text();

    try {
      const jsonResult = JSON.parse(result);
      if (jsonResult.error) {
        throw new Error(`Email service error: ${jsonResult.error}`);
      }
    } catch (parseError) {
      console.log('Response was not JSON, but email might have been sent:', result);
    }
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
};
