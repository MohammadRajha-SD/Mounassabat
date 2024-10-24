// PayPalButton.js
import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';

const PayPalButton = () => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    setToken(token);
  }, [])
  return (
    <PayPalScriptProvider options={{ "client-id": "AR04t4boe7bPPO6JLwSqyLqHyCHQvm8GffKfoUPAtjJYP1QANkgiYEZoCUpfwUISsuB4gsMAyM2Ko4ie" }}>
      <PayPalButtons
        createOrder={async (data, actions) => {
          try {
            const response = await axios.post('http://localhost:8000/api/paypal/payment', {
              price: 100,
            }, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            return response.data.id; // Return the order ID from your backend
          } catch (error) {
            console.error('Error creating order:', error);
            throw new Error('Could not create order.'); // Optional: Handle error
          }
        }}
        onApprove={async (data, actions) => {
          try {
            const response = await axios.get(`http://localhost:8000/api/paypal/success?token=${data.orderID}`);
            alert(response.data); // Handle the success message
          } catch (error) {
            console.error('Error capturing order:', error);
            alert('Error capturing the order.'); // Optional: Handle error
          }
        }}
        onCancel={() => {
          alert('Transaction cancelled');
        }}
        onError={(err) => {
          console.error('PayPal error', err);
          alert('An error occurred during the transaction.'); // Optional: Handle error
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
