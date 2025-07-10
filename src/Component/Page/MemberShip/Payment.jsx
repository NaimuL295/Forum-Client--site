import React, { useState, useContext } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import Swal from 'sweetalert2'; // For success/error alerts
import { AuthContext } from '../../Context/AuthContext';

const Payment = () => {
  const { user } = useContext(AuthContext);
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [currency, setCurrency] = useState('usd');
  const [amount, setAmount] = useState(5000); // 5000 USD or 4500 BDT
  const stripe = useStripe();
  const elements = useElements();

  // Handle currency toggle between USD and BDT
  const toggleCurrency = () => {
    if (currency === 'usd') {
      setCurrency('bdt');
      setAmount(4500); // 4500 BDT
    } else {
      setCurrency('usd');
      setAmount(5000); // 5000 USD
    }
  };

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.log('Stripe.js has not loaded yet.');
      return;
    }

    setProcessing(true);

    try {
      // Step 1: Create Payment Method
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      // Step 2: Create Payment Intent (Server-side)
      const { data: paymentIntentData } = await axios.post('/api/create-payment-intent', {
        amountInCents: amount,
        currency: currency,
      });

      // Step 3: Confirm Payment with Stripe
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(paymentIntentData.clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      // Step 4: Update user badge (to 'Gold' in this case)
      const userResponse = await axios.patch('/user', { badge: 'Gold' });

      if (!userResponse.data.success) {
        throw new Error('Failed to update user badge');
      }

      // Step 5: Success alert
      Swal.fire({
        icon: 'success',
        title: 'Payment Successful!',
        text: `Your payment of ${currency === 'usd' ? '$50.00' : '৳45.00'} was successful. Enjoy your Gold Membership!`,
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
      {/* Premium Card */}
      <div className="card w-96 bg-base-100 shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 mb-8">
        <div className="card-body p-6 relative">
          <span className="badge badge-xs badge-warning absolute top-4 left-4 z-10">Most Popular</span>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-semibold text-gray-900">Premium</h2>
            <span className="text-xl font-medium text-gray-800">{currency === 'usd' ? '$29/mo' : '৳2499/mo'}</span>
          </div>

          {/* Payment Description */}
          <p className="text-lg mb-6">
            Pay {currency === 'usd' ? '$50' : '৳45'} to unlock unlimited post access and a Gold badge.
          </p>

          {/* Payment Form */}
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <CardElement className="border p-4 rounded" />
            </div>

            {/* Pay Now Button */}
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

          {/* Success Message */}
          {paymentSuccess && (
            <div className="mt-6 text-green-500">
              <p>🎉 Thank you for becoming a Gold Member! 🎉</p>
            </div>
          )}
        </div>
      </div>

      {/* Currency Toggle Button */}
      <div className="mt-6">
        <button
          onClick={toggleCurrency}
          className="mt-4 text-blue-500"
        >
          Toggle Currency: {currency === 'usd' ? 'USD' : 'BDT'}
        </button>
      </div>
    </div>
  );
};

export default Payment;
