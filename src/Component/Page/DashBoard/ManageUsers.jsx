// import React, { useState } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
// import { FaUserShield } from 'react-icons/fa';

// const fetchUsers = async (searchText) => {
//   const res = await axios.get(`https://forum-server-site.vercel.app/usersAll?search=${searchText}`);
//   return res.data;
// };

// const ManageUsers = () => {
//   const [searchText, setSearchText] = useState('');
//   const queryClient = useQueryClient();


//   const { data: users = [], isLoading, isError } = useQuery({
//     queryKey: ['users', searchText],
//     queryFn: () => fetchUsers(searchText),
//     keepPreviousData: true
//   });

//   const makeAdminMutation = useMutation({
//     mutationFn: (id) => axios.patch(`https://forum-server-site.vercel.app/users/admin/${id}`),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['users']);
//     },
//   });

//   const handleMakeAdmin = (userId) => {
//     makeAdminMutation.mutate(userId);
//   };
//   return (
//     <div className="p-4 ">
//       <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>

//       <input
//         type="text"
//         placeholder="Search by name..."
//         className="mb-4 px-3 py-2 border rounded w-full max-w-md"
//         onChange={(e) => setSearchText(e.target.value)}
//       />

//       {isLoading && <p>Loading...</p>}
//       {isError && <p>Something went wrong!</p>}

//       <div className="overflow-x-auto">
//         <table className="w-full table-auto border ">
//           <thead className="">
//             <tr>
//               <th className="px-4 py-2 border">Name</th>
//               <th className="px-4 py-2 border">Email</th>
//               <th className="px-4 py-2 border">Role</th>
//               <th className="px-4 py-2 border">Membership</th>
//               <th className="px-4 py-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map(user => (
//               <tr key={user._id}>
//                 <td className="px-4 py-2 border">{user.displayName}</td>
//                 <td className="px-4 py-2 border">{user.email}</td>
//                 <td className="px-4 py-2 border capitalize">{user.role}</td>
//                 <td className="px-4 py-2 border">
//                   {user.isMember ? "Gold Member" : "Free"}
//                 </td>
//                 <td className="px-4 py-2 border">
//                   {user.role !== "admin" ? (
//                     <button
//                       onClick={() => handleMakeAdmin(user._id)}
//                       className="px-3 py-1 bg-blue-500 hover:bg-blue-600  rounded text-sm"
//                     >
//                       <FaUserShield className="inline mr-1" /> Make Admin
//                     </button>
//                   ) : (
//                     <span className="text-green-600">Admin</span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

//  export default ManageUsers;
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FaUserShield, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const fetchUsers = async (searchText) => {
  const res = await axios.get(`https://forum-server-site.vercel.app/usersAll?search=${searchText}`);
  return res.data;
};

const ManageUsers = () => {
  const [searchText, setSearchText] = useState('');
  const queryClient = useQueryClient();

  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ['users', searchText],
    queryFn: () => fetchUsers(searchText),
    keepPreviousData: true
  });

  const makeAdminMutation = useMutation({
    mutationFn: (id) => axios.patch(`https://forum-server-site.vercel.app/users/admin/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      Swal.fire('Success!', 'User is now an admin.', 'success');
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to promote user.', 'error');
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id) => axios.delete(`https://forum-server-site.vercel.app/users_to/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      Swal.fire('Deleted!', 'User has been removed.', 'success');
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to delete user.', 'error');
    }
  });

  const handleMakeAdmin = (userId) => {
    Swal.fire({
      title: 'Make Admin?',
      text: "Are you sure you want to promote this user?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, promote',
    }).then((result) => {
      if (result.isConfirmed) {
        makeAdminMutation.mutate(userId);
      }
    });
  };

  const handleDeleteUser = (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will delete the user permanently!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserMutation.mutate(userId);
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>

      <input
        type="text"
        placeholder="Search by name..."
        className="mb-4 px-3 py-2 border rounded w-full max-w-md"
        onChange={(e) => setSearchText(e.target.value)}
      />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong while fetching users.</p>}

      <div className="overflow-x-auto">
        <table className="w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Membership</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td className="px-4 py-2 border">{user.displayName}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border capitalize">{user.role}</td>
                <td className="px-4 py-2 border">{user.badge}</td>
                <td className="px-4 py-2 border space-x-2">
                  {user.role !== 'admin' ? (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      <FaUserShield className="inline mr-1" /> Make Admin
                    </button>
                  ) : (
                    <span className="text-green-600 font-medium">Admin</span>
                  )}

                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    <FaTrash className="inline mr-1" /> Remove
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
