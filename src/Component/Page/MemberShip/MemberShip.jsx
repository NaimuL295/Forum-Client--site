import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './Payment';
import useMember from '../../Hook/useMember';
import Spinner from '../../Share/Spinner';

const stripePromise = loadStripe(import.meta.env.VITE_payment_Key); 

const MemberShip = () => {
    const { badge, badgeLoading } = useMember();

 if (badgeLoading) {
    return (
      <div className="text-center py-10 text-lg font-medium"> membership status...
      <Spinner></Spinner>
      </div>
    );
  }
    if (badge ==="Gold") {
      return  (
      <div className="text-center py-10 text-xl font-semibold text-green-600">
        You are already a <span className="underline">Gold Member</span>! 🎉
      </div>
    );

}
  return (
    <>
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
    </>
  );
};

export default MemberShip;
