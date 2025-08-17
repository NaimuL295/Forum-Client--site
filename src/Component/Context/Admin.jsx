import React, {  use } from 'react';
import useUserRole from '../Hook/useUserRole';
import { AuthContext } from './AuthContext';
// admin check
const Admin = ({children}) => {
    const {user,loading}=use(AuthContext)
const {role,roleLoading}= useUserRole();



 if (loading || roleLoading) {
         return   <div className="flex justify-center items-center min-h-[200px]">
    <span className="loading loading-spinner text-primary w-16"></span>
  </div>
    }


if (!user|| role !=="admin") {
     return <Navigate state={{ from: location.pathname }} to="/"></Navigate>
}
    return children
};

export default Admin;