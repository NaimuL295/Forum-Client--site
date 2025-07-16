import React from 'react';
import { Outlet } from 'react-router';
import logImg  from "../../assets/4957136.jpg"
const Auth = () => {
    return (
        <div className='lg:flex   lg:w-7xl mx-auto'>


<div className="flex flex-col lg:flex-row lg:gap-4 p-10">
     <div className="lg:flex-1 mt-12 lg:mt-0 flex justify-center">
    
 <img
      src={logImg}
      alt="Logo"
     
      className="  max-sm:hidden    rounded-3xl  object-cover"
    /></div>
 


  <div className="lg:flex-1">
    <Outlet />
  </div>


 
</div>


        </div>
    );
};

export default Auth;