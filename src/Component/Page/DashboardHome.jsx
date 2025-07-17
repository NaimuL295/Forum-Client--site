import React from 'react';
import useUserRole from '../Hook/useUserRole';
import AdminProfile from './DashBoard/AdminProfile';
import MyProfile from './DashBoard/MyProfile';

const DashboardHome = () => {
       const { role, roleLoading } = useUserRole();
   

    if (roleLoading) {
        return 
    }
           if (role ==="admin"){
            return <AdminProfile></AdminProfile>
           } 
            else {
                return <MyProfile></MyProfile>
            }
        

};

export default DashboardHome;