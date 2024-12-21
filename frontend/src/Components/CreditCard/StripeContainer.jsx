import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';

const PayPalButton = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);
  }, []);

  return (
    <PayPalScriptProvider options={{ "client-id": "AYXjOmFXvDTfxT7SXSVfnb2YNglIjPUXmfndHC5soxBuDxrp16nM26d2MvhDJOMcnSCRTU-RfGK2xJPr" }}>
      <PayPalButtons
        createOrder={async (data, actions) => {
          try {
            const response = await axios.post(
              'http://127.0.0.1:8000/api/paypal/payment',
              { price: 100 },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.status === 'success' && response.data.approval_url) {
              return response.data.id;
            } else {
              alert('Order creation failed. Please try again.');
            }
          } catch (error) {
            console.error('Error creating order:', error);
            alert('Error creating order. Please try again.');
            throw error;
          }
        }}


        onApprove={async (data, actions) => {
          try {
            const response = await axios.get(
              `http://127.0.0.1:8000/api/paypal/success`,
              {
                params: { token: data.orderID }, // Pass token as query param
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            console.log('Payment Success:', response.data);
            if (response.data.status === 'success') {
              alert('Payment completed successfully!');
            } else {
              alert('Payment failed. Please try again.');
            }
          } catch (error) {
            console.error('Error capturing order:', error);
            alert('Error capturing the order.');
          }
        }}


        onCancel={() => {
          alert('Transaction cancelled');
        }}

        onError={(err) => {
          console.error('PayPal error:', err);
          alert('An error occurred during the transaction.');
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
