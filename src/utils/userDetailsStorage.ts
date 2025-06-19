
export interface UserDetails {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  country: string;
  zipCode: string;
  orderNote?: string;
  preferredDeliveryDate?: Date;
  preferredDeliveryTimeSlot?: string;
}

export const saveUserDetails = (details: UserDetails) => {
  localStorage.setItem('userDetails', JSON.stringify({
    ...details,
    orderNote: details.orderNote || '',
    preferredDeliveryDate: details.preferredDeliveryDate ? details.preferredDeliveryDate.toISOString() : null,
    preferredDeliveryTimeSlot: details.preferredDeliveryTimeSlot || null
  }));
};

export const getUserDetails = (): UserDetails | null => {
  const details = localStorage.getItem('userDetails');
  if (!details) return null;
  
  const parsedDetails = JSON.parse(details);
  
  // Convert the ISO date string back to a Date object if it exists
  if (parsedDetails.preferredDeliveryDate) {
    parsedDetails.preferredDeliveryDate = new Date(parsedDetails.preferredDeliveryDate);
  }
  
  return parsedDetails;
};
