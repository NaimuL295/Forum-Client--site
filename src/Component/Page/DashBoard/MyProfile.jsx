import React, { useEffect, useState,  use } from 'react';
//import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import useSecure from '../../Hook/useSecureInstance';


const MyProfile = () => {
  const { user } = use(AuthContext);  
  const [users, setUsers] = useState(null);   
  const [posts, setPosts] = useState([]);     
  const axiosInstance=useSecure()
  useEffect(() => {
    if (user?.email) {
      // Fetch user profile data
      axiosInstance.get(`http://localhost:5000/user/only?emailParams=${user?.email}`)
        .then(res => setUsers(res.data))
        .catch(err => console.error('Error fetching user:', err));

      // Fetch recent posts data (3 posts)
      axiosInstance.get(`http://localhost:5000/user/post/email?emailParams=${user?.email}`)
        .then(res => setPosts(res.data.slice(0, 3))) // Limit to the first 3 posts
        .catch(err => console.error('Error fetching posts:', err));
    }
  }, [user]);

  if (!user || !users) {
    return <div className="text-center mt-10 text-lg">Loading profile...</div>;
  }

  // Badge logic for Gold/Bronze based on user membership
  const badge = user?.isMember ? {
    label: 'Gold Member',
    icon: '🥇', // Replace with image or icon if needed
    color: 'text-yellow-500'
  } : {
    label: 'Bronze Member',
    icon: '🥉',
    color: 'text-orange-500'
  };
console.log(users);
console.log(posts);
  return (
    <div className="max-w-4xl mx-auto p-6 sm:px-8 lg:px-12 bg-gradient-to-b from-gray-100 to-white rounded-xl shadow-lg">

      {/* Profile Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
        <div className="relative">
          {/* Profile Image with border */}
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
        <ul className="space-y-6   lg:grid lg:grid-cols-3">
          {posts.length === 0 ? (
            <li className="text-center ">No recent posts available.</li>
          ) : (
            posts.map(post => (
              <li key={post?._id} className=" p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 ease-in-out">
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
