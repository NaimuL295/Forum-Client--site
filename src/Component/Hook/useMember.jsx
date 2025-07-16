import { useQuery } from '@tanstack/react-query';
import { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import useSecure from './useSecureInstance'; 

const useBadge = () => {
  const { user, loading: authLoading } = use(AuthContext);
  const axiosSecure = useSecure();

  const { data: badge = "Bronze", isLoading: badgeLoading } = useQuery({
    queryKey: ["userBadge", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users_/${user.email}`);
      const userData = res.data;

      if (userData.membership) return "Gold";
      return "Bronze";
    }
  });

  return { badge, badgeLoading };
};

export default useBadge;
