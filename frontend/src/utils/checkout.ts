import { loadStripe } from "@stripe/stripe-js";

export default async function checkout({lineItems, query_id}:any) {
    let stripePromise:any = null;
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ? process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY : ""    
    let getStripe = () => {
        if(!stripePromise) {
            stripePromise = loadStripe(key)
        }

        return stripePromise
    }

    const stripe = await getStripe();
    stripe.redirectToCheckout({
        mode: "payment",
        lineItems,
        successUrl: `${window.location.origin}/download?session_id={CHECKOUT_SESSION_ID}&query_id=${query_id}`,
        cancelUrl: `${window.location.origin}`
    })
  }
  