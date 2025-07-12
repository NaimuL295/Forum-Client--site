import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import Swal from 'sweetalert2';

const Payment = () => {
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [currency, setCurrency] = useState('usd');
  const [amount, setAmount] = useState(5000);
  const stripe = useStripe();
  const elements = useElements();

  const toggleCurrency = () => {
    if (currency === 'usd') {
      setCurrency('bdt');
      setAmount(4500);
    } else {
      setCurrency('usd');
      setAmount(5000);
    }
  };

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.log('Stripe not ready');
      return;
    }

    setProcessing(true);

    try {
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (stripeError) throw new Error(stripeError.message);

      // ✅ Full backend URL
      const { data: paymentIntentData } = await axios.post('http://localhost:5000/create-payment-intent', {
        amountInCents: amount,
        currency,
      });

      const { error: confirmError } = await stripe.confirmCardPayment(paymentIntentData.clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmError) throw new Error(confirmError.message);

      // ✅ Badge update
      const userResponse = await axios.patch('http://localhost:5000/user_payment', {
        badge: 'Gold',
      });

      if (!userResponse.data.success) {
        throw new Error('Failed to update user badge');
      }

      Swal.fire({
        icon: 'success',
        title: 'Payment Successful!',
        text: `You paid ${currency === 'usd' ? '$50.00' : '৳45.00'}. Welcome to Gold Membership!`,
      });

      setPaymentSuccess(true);
    } catch (err) {
      console.error('Error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        text: err.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto text-center py-12 px-4">
      <div className="card w-96 bg-base-100 shadow-lg rounded-lg overflow-hidden mb-8">
        <div className="card-body p-6 relative">
          <span className="badge badge-warning absolute top-4 left-4">Most Popular</span>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-semibold">Premium</h2>
            <span className="text-xl">{currency === 'usd' ? '$29/mo' : '৳2499/mo'}</span>
          </div>

          <p className="text-lg mb-6">
            Pay {currency === 'usd' ? '$50' : '৳45'} to unlock unlimited access and Gold badge.
          </p>

          <form onSubmit={handlePayment} className="space-y-4">
            <CardElement className="border p-4 rounded" />
            <button
              type="submit"
              disabled={processing || paymentSuccess || !stripe}
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded shadow"
            >
              {processing
                ? 'Processing...'
                : paymentSuccess
                ? 'Payment Complete'
                : `Pay ${currency === 'usd' ? '$50' : '৳45'}`}
            </button>
          </form>

          {paymentSuccess && (
            <div className="mt-6 text-green-500">
              <p>🎉 Thank you for becoming a Gold Member!</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <button onClick={toggleCurrency} className="text-blue-500 underline">
          Toggle Currency: {currency === 'usd' ? 'USD' : 'BDT'}
        </button>
      </div>
    </div>
  );
};

export default Payment;
