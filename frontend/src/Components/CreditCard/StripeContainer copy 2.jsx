// PaymentForm.js
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51OdOFNKPwcneq4cfGY5dJmtpoZCmPivYiWVOcfKiWGEv6dsh8x2kSl0STrr9giYpVeXZbU0DxHJA99yArGXN7yvF00y0YQCe17');

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card'); // Default to card payment

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (paymentMethod === 'card') {
      // Handle card payment
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.post('http://127.0.0.1:8000/api/pay-by-creditcard', { amount: 1000 }, { headers: { Authorization: `Bearer ${token}` } });
        const { clientSecret } = data;

        if (!stripe || !elements) {
          alert('Stripe not loaded');
          return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: cardElement },
        });

        if (paymentError) {
          console.error(paymentError);
          alert('Payment failed');
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
          alert('Payment successful!');
        }
      } catch (error) {
        console.error('Error processing payment:', error);
        alert('Something went wrong');
      }
    } else {
      // Handle PayPal payment
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.post('http://127.0.0.1:8000/api/create-paypal-checkout-session', { amount: 1000 }, { headers: { Authorization: `Bearer ${token}` } });
        const { id } = data;

        const result = await stripe.redirectToCheckout({ sessionId: id });

        if (result.error) {
          console.error(result.error);
          alert('Redirect to PayPal failed');
        }
      } catch (error) {
        console.error('Error creating PayPal session:', error);
        alert('Something went wrong with PayPal');
      }
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto bg-white rounded shadow-md">
      <h2 className="mb-4">Select Payment Method</h2>
      <div className="mb-4">
        <label>
          <input
            type="radio"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={() => setPaymentMethod('card')}
          />
          Credit Card
        </label>
        <label className="ml-4">
          <input
            type="radio"
            value="paypal"
            checked={paymentMethod === 'paypal'}
            onChange={() => setPaymentMethod('paypal')}
          />
          PayPal
        </label>
      </div>

      {paymentMethod === 'card' && (
        <CardElement className="border p-2 rounded-md mb-4" />
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
      >
        {isLoading ? 'Processing...' : paymentMethod === 'card' ? 'Pay $10.00' : 'Pay with PayPal'}
      </button>
    </form>
  );
};

const StripeContainer = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default StripeContainer;
