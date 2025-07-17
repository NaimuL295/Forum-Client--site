import React, { use, useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { AuthContext } from "../../Context/AuthContext";
import {toast}   from "react-hot-toast";


const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

// Fetch overview data
const fetchOverview = async () => {
  const { data } = await axios.get("https://forum-server-site.vercel.app/admin/overview");
  return data;
};

// Fetch tags
const fetchTags = async () => {
  const { data } = await axios.get("https://forum-server-site.vercel.app/tags_list");
  return data;
};

// Add tag mutation
const addTag = async (tagName) => {
  const { data } = await axios.post("https://forum-server-site.vercel.app/tags", { name: tagName });
  return data;
};

const AdminProfile = () => {
  const { user } = use(AuthContext);
  const [tagName, setTagName] = useState("");
  const queryClient = useQueryClient();

  
  const { data: overview = {}, isLoading: overviewLoading, error: overviewError } = useQuery({
    queryKey: ["adminOverview"],
    queryFn: fetchOverview,
  });

  
  const { data: tags = [], isLoading: tagsLoading, error: tagsError } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });


  const mutation = useMutation({
    mutationFn: addTag,
    onSuccess: () => {
      queryClient.invalidateQueries(["tags"]); 
      setTagName("");
      alert("Tag added!");
    },
    onError: (error) => {
      alert(error.response?.data?.error || "Failed to add tag");
    },
  });

  const handleAddTag = (e) => {
    e.preventDefault();
    if (!tagName.trim()) return toast.success("Tag name required");
    mutation.mutate(tagName.trim());
  };

  if (overviewLoading || tagsLoading) return <p>Loading...</p>;
  if (overviewError) return <p>Error loading overview data</p>;
  if (tagsError) return <p>Error loading tags</p>;

  const data = [
    { name: "Posts", value: overview.postCount || 0 },
    { name: "Comments", value: overview.commentCount || 0 },
    { name: "Users", value: overview.userCount || 0 },
  ];

return (
  <div className="max-w-5xl mx-auto p-6 space-y-10">
    {/* Title */}
    <h1 className="text-4xl font-bold text-center text-gray-800">Admin Dashboard</h1>

    {/* Profile + Stats */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
      {/* Admin Info */}
      <div className="bg-white p-6 rounded-xl shadow text-center md:col-span-1">
        <img
          src={user?.photoURL || "/default-avatar.png"}
          alt={user?.displayName}
          className="w-24 h-24 rounded-full mx-auto mb-4 border"
        />
        <h2 className="text-lg font-semibold">{user?.displayName}</h2>
        <p className="text-sm text-gray-600">{user?.email}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:col-span-3">
        <div className="bg-blue-50 p-4 rounded-lg text-center shadow-sm">
          <p className="text-2xl font-bold text-blue-600">{overview.postCount}</p>
          <p className="text-sm text-gray-700">Posts</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center shadow-sm">
          <p className="text-2xl font-bold text-green-600">{overview.commentCount}</p>
          <p className="text-sm text-gray-700">Comments</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center shadow-sm">
          <p className="text-2xl font-bold text-yellow-600">{overview.userCount}</p>
          <p className="text-sm text-gray-700">Users</p>
        </div>
      </div>
    </div>

    {/* Site Overview Pie Chart */}
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Site Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>

    {/* Add Tag Section */}
    <div className="bg-white p-6 rounded-xl shadow max-w-lg mx-auto">
     
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Manage Tags</h2>
      <form onSubmit={handleAddTag} className="flex gap-4">
        <input
          type="text"
          placeholder="Enter new tag"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          className="input input-bordered w-full"
          disabled={mutation.isLoading}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Adding..." : "Add"}
        </button>
      </form>

      {tags.length > 0 && (
        <div className="mt-6">
          <h3 className="font-medium mb-2 text-gray-700">Existing Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span key={idx} className="bg-gray-200 text-sm px-3 py-1 rounded-full">
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

};

export default AdminProfile;
