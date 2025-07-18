import { useQuery } from '@tanstack/react-query';
import { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
 
import axios from 'axios';

const useMember = () => {
  const { user, loading: authLoading } = use(AuthContext);


  const { data: badge = "Bronze", isLoading: badgeLoading } = useQuery({
    queryKey: ["userBadge", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`https://forum-server-site.vercel.app/users_/${user.email}`);
      const userData = res.data;

      if (userData.membership) return "Gold";
      return "Bronze";
    }
  });

  return { badge, badgeLoading };
};

export default useMember;
