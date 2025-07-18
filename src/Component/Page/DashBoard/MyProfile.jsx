import React, { use } from 'react';
import { useQuery } from '@tanstack/react-query';


import { AuthContext } from '../../Context/AuthContext';
import useSecure from '../../Hook/useSecureInstance';

const MyProfile = () => {
  const { user } = use(AuthContext);
  const axiosInstance = useSecure();


  const { data: users, isLoading: userLoading } = useQuery({
    queryKey: ['user', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/user/only?emailParams=${user?.email}`);
      return res.data;
    },
  });

 
  const { data: posts = [], isLoading: postsLoading } = useQuery({
    queryKey: ['posts', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/user/post/email?emailParams=${user?.email}`);
      return res.data.slice(0, 3); // limit to 3
    },
  });

  if (userLoading || postsLoading || !users) {
    return <div className="text-center mt-10 text-lg">Loading profile...</div>;
  }

  const badge = {...users}?.badge === 'Gold'
    ? { label: 'Gold Member', icon: '🥇', color: 'text-yellow-500' }
    : { label: 'Bronze Member', icon: '🥉', color: 'text-orange-500' };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:px-8 lg:px-12 bg-gradient-to-b from-gray-100 to-white rounded-xl shadow-lg">
   
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
        <div className="relative">
          <img
            src={user?.photoURL || '/default-user.png'}
            alt="User"
            className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-xl mb-4"
          />
          <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md">
            <span className="text-2xl">{badge.icon}</span>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">{users?.name}</h2>
        <p className="text-gray-600">{users?.email}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg">{badge.icon}</span>
          <span className={`text-sm font-semibold ${badge.color}`}>{badge.label}</span>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">My Recent Posts</h3>
        <ul className="space-y-6 lg:grid lg:grid-cols-3 lg:gap-6">
          {posts.length === 0 ? (
            <li className="text-center col-span-3">No recent posts available.</li>
          ) : (
            posts.map(post => (
              <li key={post?._id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 ease-in-out">
                <h4 className="font-semibold text-xl text-gray-800">{post.title}</h4>
                <p className="text-gray-700 text-sm mt-2 line-clamp-3">{post.content}</p>
                <p className="text-xs text-gray-500 mt-4">
                  Posted on: {new Date(post?.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default MyProfile;

