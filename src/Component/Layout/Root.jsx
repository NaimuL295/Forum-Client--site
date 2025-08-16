import React from 'react';
import Navbar from '../Share/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Share/Footer';

const Root = () => {
    return (
        <div>
         <div className='w-full sticky z-50  top-0'>    <Navbar></Navbar>   </div>
             <div className='min-h-[calc(100vh-130px)]' >     
            <Outlet></Outlet></div>
            <Footer></Footer>
        </div>
    );
};

export default Root;