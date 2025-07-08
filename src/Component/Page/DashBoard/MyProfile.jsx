import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch user info
    axios.get('/api/user/profile',)
      .then(res => setUser(res.data))
      .catch(err => console.error('Error fetching user:', err));

    // Fetch recent posts
    axios.get('/api/posts/user', )
      .then(res => setPosts(res.data.slice(0, 3)))
      .catch(err => console.error('Error fetching posts:', err));
  }, []);

  if (!user) return <div className="text-center mt-10 text-lg">Loading profile...</div>;

  // Badge logic
  const badge = user.isMember ? {
    label: 'Gold Member',
    icon: '🥇', // Replace with image if needed
    color: 'text-yellow-500'
  } : {
    label: 'Bronze Member',
    icon: '🥉',
    color: 'text-orange-500'
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
        <img
          src={user.image || '/default-user.png'}
          alt="User"
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-2xl">{badge.icon}</span>
          <span className={`text-sm font-semibold ${badge.color}`}>{badge.label}</span>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">My Recent Posts</h3>
        <ul className="space-y-4">
          {posts.map(post => (
            <li key={post._id} className="bg-gray-100 p-4 rounded-md shadow-sm">
              <h4 className="font-bold text-lg">{post.title}</h4>
              <p className="text-gray-700 text-sm line-clamp-2">{post.content}</p>
              <p className="text-xs text-gray-500 mt-1">
                Posted on: {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyProfile;
