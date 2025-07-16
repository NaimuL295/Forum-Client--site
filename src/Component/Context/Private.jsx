import React, { use } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router';

const Private = ({ children}) => {
const {user,loading}=use(AuthContext)


if (loading) {
    <div className="flex justify-center items-center min-h-[200px]">
    <span className="loading loading-spinner text-primary w-16"></span>
  </div>
}
if (!user ||!user.email) {
    <Navigate to="/login" state={{From:location.pathname}}></Navigate>
}
    return (
    children   
    );
};

export default Private;