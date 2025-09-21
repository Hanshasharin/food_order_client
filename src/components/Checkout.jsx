import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe(`${import.meta.env.STRIPE_PUBLISHABLE_KEY}`);

const Checkout = ({ total, handleOrderSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
   try{
      // 1. Create payment intent on backend
      const { data } = await axios.post(`${import.meta.env.VITE_API_DOMAIN}/api/user/payment`, { total },{withCredentials:true});

      const clientSecret = data.clientSecret;

      // 2. Confirm card payment
      const cardElement = elements.getElement(CardElement);
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        handleOrderSuccess(); // call your order placement logic
      }
    } catch (err) {
      setError(err.response?.data?.message || "Payment failed");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <CardElement />
      <button className="btn btn-primary mt-4 w-full" type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : `Pay ₹${total}`}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

const StripeCheckout = ({ total, handleOrderSuccess }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm total={total} handleOrderSuccess={handleOrderSuccess} />
  </Elements>
);

export default Checkout;
