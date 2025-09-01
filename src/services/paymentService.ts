import stripePromise from "../stripe";

export interface PaymentData {
  serviceId: string;
  serviceName: string;
  amount: number;
  isRecurring: boolean;
  interval?: 'month' | 'year';
  customerEmail: string;
  customerName: string;
}

export interface CheckoutSessionData {
  sessionId: string;
  url: string;
}

export const createCheckoutSession = async (paymentData: PaymentData): Promise<CheckoutSessionData> => {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

export const redirectToCheckout = async (sessionId: string) => {
  const stripe = await stripePromise;
  if (!stripe) {
    throw new Error('Stripe failed to load');
  }

  const { error } = await stripe.redirectToCheckout({ sessionId });
  if (error) {
    console.error('Error redirecting to checkout:', error);
    throw error;
  }
};