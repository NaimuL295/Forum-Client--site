import React, { useEffect, useState, use } from 'react';
import {  Link } from 'react-router';
import { FaTrashAlt, FaComments } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthContext';
import useSecure from '../../Hook/useSecureInstance';

const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);
  const { user } = use(AuthContext);
    const axiosInstance=useSecure()
  useEffect(() => {
    if (user?.email) {
      axiosInstance.get(`https://forum-server-site.vercel.app/user/post/email?emailParams=${user.email}`)
        .then(res => setMyPosts(res.data))
        .catch(err => console.error(err));
    }
  }, [user?.email]);
  const handleDelete = (id) => {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "This post will be deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://forum-server-site.vercel.app/post_delate/${id}`)
          .then(()=> {
              Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
              const filters=data =>data.filter(post => post._id !== id)
              setMyPosts(filters);
          });
      }
    });
  };
  return (
    <div className="p-4">
      <h2 className="text-2xl   font-semibold mb-4">My Posts</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border  text-black shadow-sm rounded-lg">
          <thead className=" ">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-center">Votes</th>
              <th className="px-4 py-2 text-center">Comment</th>
              <th className="px-4 py-2 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {myPosts.map(post => (
              <tr key={post._id} className="border-t ">
                <td className="px-4 py-2 ">{post.title}</td>
                <td className="px-4 py-2 text-center">{post.upVote - post.downVote}</td>
                <td className="px-4 py-2 text-center">
                  <Link to={`/comments/${post._id}`} className="text-blue-500 hover:underline flex justify-center">
                    <FaComments />
                  </Link>
                </td>
                <td className="px-4 py-2 text-center">
                  <button onClick={() => handleDelete(post._id)} className="text-red-500 hover:text-red-700">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
            {myPosts.length === 0 && (
              <tr>
                <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPosts;
