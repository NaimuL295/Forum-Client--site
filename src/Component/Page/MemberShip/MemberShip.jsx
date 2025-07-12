import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './Payment';


const stripePromise = loadStripe(import.meta.env.VITE_payment_Key); 

const MemberShip = () => {
  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );
};

export default MemberShip;
