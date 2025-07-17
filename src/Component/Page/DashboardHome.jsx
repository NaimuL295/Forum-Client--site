import React from 'react';
import useUserRole from '../Hook/useUserRole';
import AdminProfile from './DashBoard/AdminProfile';
import MyProfile from './DashBoard/MyProfile';

const DashboardHome = () => {
       const { role, roleLoading } = useUserRole();
   

    if (roleLoading) {
        return   <div className="flex justify-center items-center min-h-[200px]">
    <span className="loading loading-spinner text-primary w-16"></span>
  </div> 
    }
           if (role ==="admin"){
            return <AdminProfile></AdminProfile>
           } 
            else {
                return <MyProfile></MyProfile>
            }
        

};

export default DashboardHome;