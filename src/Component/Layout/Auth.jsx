
import React from 'react';
import { Outlet } from 'react-router';
import logImg from "../../assets/login.webp";

const Auth = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2">

        <div className="hidden md:flex items-center justify-center p-10">
          <img
            src={logImg}
            alt="Logo"
            className="rounded-3xl object-cover w-full max-w-md"
          />
        </div>

        {/* Right Form Side */}
        <div className="flex items-center justify-center p-6 md:p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Auth;
