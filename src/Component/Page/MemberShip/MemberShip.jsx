import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './Payment';
const MemberShip = () => {
   const stripePromise = loadStripe(import.meta.env.VITE_payment_Key)
    return (
        <div>
          <Elements stripe={stripePromise}>
         <Payment></Payment>
        </Elements>   
        </div>
    );
};

export default MemberShip;

