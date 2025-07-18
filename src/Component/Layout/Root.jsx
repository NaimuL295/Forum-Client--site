import React from 'react';
import Navbar from '../Share/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Share/Footer';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
             <div className='min-h-[calc(100vh-200px)]' >     
            <Outlet></Outlet></div>
            <Footer></Footer>
        </div>
    );
};

export default Root;