import { createClient } from "@supabase/supabase-js";
import stripePromise from "../stripe";
import { ensureUserSession } from "./auth";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export interface PaymentData {
  serviceId: string;
  serviceName: string;
  amount: number; // cents ($120 => 12000)
  isRecurring: boolean;
  interval?: "month" | "year";
  customerEmail: string;
  customerName: string;
  metadata?: Record<string, string>;
}

export interface CheckoutSessionData {
  sessionId: string;
  url: string;
}

export const createCheckoutSession = async (
  paymentData: PaymentData
): Promise<CheckoutSessionData> => {
  try {
    // Auto-register/sign-in user and get JWT token
    const token = await ensureUserSession(paymentData.customerEmail);

    const { data, error } = await supabase.functions.invoke<CheckoutSessionData>(
      "create-checkout-session",
      {
        body: paymentData,
        headers: {
          Authorization: `Bearer ${token}`,
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY!,
        },
      }
    );

    if (error) {
      console.error("Supabase function error:", error);
      throw new Error(`Failed to create checkout session: ${error.message}`);
    }
    if (!data)
      throw new Error("No data returned from checkout session creation");
    return data;
  } catch (err) {
    console.error("Error creating checkout session:", err);
    throw err;
  }
};

export const redirectToCheckout = async (sessionId: string) => {
  const stripe = await stripePromise;
  if (!stripe) throw new Error("Stripe failed to load");
  const { error } = await stripe.redirectToCheckout({ sessionId });
  if (error) {
    console.error("Error redirecting to checkout:", error);
    throw error;
  }
};
