export interface WebhookEvent {
  id: string;
  type: string;
  data: {
    object: any;
  };
  created: number;
}

export interface PaymentSuccessData {
  sessionId: string;
  customerId: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  customerEmail: string;
  metadata?: Record<string, string>;
}

// Handle different webhook event types
export const handleWebhookEvent = async (event: WebhookEvent): Promise<void> => {
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutSessionCompleted(event.data.object);
      break;
    case 'payment_intent.succeeded':
      await handlePaymentSucceeded(event.data.object);
      break;
    case 'payment_intent.payment_failed':
      await handlePaymentFailed(event.data.object);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
};

const handleCheckoutSessionCompleted = async (session: any): Promise<void> => {
  console.log('Checkout session completed:', session.id);
  
  // Store successful payment data
  const paymentData: PaymentSuccessData = {
    sessionId: session.id,
    customerId: session.customer,
    paymentIntentId: session.payment_intent,
    amount: session.amount_total,
    currency: session.currency,
    customerEmail: session.customer_details?.email || '',
    metadata: session.metadata,
  };
  
  // You can store this in local storage, state management, or send to your backend
  localStorage.setItem('lastPayment', JSON.stringify(paymentData));
  
  // Trigger any post-payment actions (e.g., send confirmation email, update booking status)
  await postPaymentActions(paymentData);
};

const handlePaymentSucceeded = async (paymentIntent: any): Promise<void> => {
  console.log('Payment succeeded:', paymentIntent.id);
  // Handle successful payment logic
};

const handlePaymentFailed = async (paymentIntent: any): Promise<void> => {
  console.log('Payment failed:', paymentIntent.id);
  // Handle failed payment logic
};

const postPaymentActions = async (paymentData: PaymentSuccessData): Promise<void> => {
  // Implement post-payment actions like:
  // - Sending confirmation emails
  // - Updating booking status
  // - Creating calendar events
  // - Notifying cleaning staff
  
  console.log('Processing post-payment actions for:', paymentData.sessionId);
};

// Utility function to retrieve payment data
export const getLastPaymentData = (): PaymentSuccessData | null => {
  const data = localStorage.getItem('lastPayment');
  return data ? JSON.parse(data) : null;
};

export const clearPaymentData = (): void => {
  localStorage.removeItem('lastPayment');
};