import React from 'react';
import { Outlet } from 'react-router';
import logImg  from "../../assets/4957136.jpg"
const Auth = () => {
    return (
        <div className='lg:flex   w-7xl mx-auto'>


<div className="flex flex-col lg:flex-row lg:gap-6 p-10">





     <div className="lg:flex-1 mt-12 lg:mt-0 flex justify-center">
    <img
      src={logImg}
      alt="Logo"
      className=" h-auto w-2xl  max-sm:hidden  object-cover"
    />
  </div>
  {/* Left Section: Outlet */}

  <div className="lg:flex-1">
    <Outlet />
  </div>

  {/* Right Section: Image */}
 
</div>


        </div>
    );
};

export default Auth;