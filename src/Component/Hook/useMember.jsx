import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';

const useMember = () => {
  const { user, loading: authLoading } = useContext(AuthContext);

  const { data: badge = "Bronze", isLoading: badgeLoading } = useQuery({
    queryKey: ["userBadge", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`https://forum-server-site.vercel.app/users_/${user?.email}`);
      const userData = res.data;
      return userData.badge === "Gold" ? "Gold" : "Bronze";
    }
  });

  return { badge, badgeLoading };
};

export default useMember;
