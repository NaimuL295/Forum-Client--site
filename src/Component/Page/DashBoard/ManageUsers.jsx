import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FaUserShield } from 'react-icons/fa';

const fetchUsers = async (searchText) => {
  const res = await axios.get(`http://localhost:5000/usersAll?search=${searchText}`);
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
console.log(users);
  const makeAdminMutation = useMutation({
    mutationFn: (id) => axios.patch(`http://localhost:5000/users/admin/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });

  const handleMakeAdmin = (userId) => {
    makeAdminMutation.mutate(userId);
  };
  return (
    <div className="p-4 ">
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>

      <input
        type="text"
        placeholder="Search by name..."
        className="mb-4 px-3 py-2 border rounded w-full max-w-md"
        onChange={(e) => setSearchText(e.target.value)}
      />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong!</p>}

      <div className="overflow-x-auto">
        <table className="w-full table-auto border ">
          <thead className="">
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
                <td className="px-4 py-2 border">
                  {user.isMember ? "Gold Member" : "Free"}
                </td>
                <td className="px-4 py-2 border">
                  {user.role !== "admin" ? (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600  rounded text-sm"
                    >
                      <FaUserShield className="inline mr-1" /> Make Admin
                    </button>
                  ) : (
                    <span className="text-green-600">Admin</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
