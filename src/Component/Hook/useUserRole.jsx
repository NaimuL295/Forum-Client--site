import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import useSecure from './useSecureInstance';


const useUserRole = () => {

    const {user,loading:authLoading}=use(AuthContext)
 const axiosSecure = useSecure();

   const { data: role = "users", isLoading: roleLoading, refetch } = useQuery({
  queryKey: ["useRole", user?.email],
  enabled: !authLoading && !!user?.email,
  queryFn: async () => {
    const res = await axiosSecure.get(`https://forum-server-site.vercel.app/users/${user?.email}/role`);
    return res.data.role;
  },
});

       return { role, roleLoading:  authLoading || roleLoading, refetch };
};

export default useUserRole;