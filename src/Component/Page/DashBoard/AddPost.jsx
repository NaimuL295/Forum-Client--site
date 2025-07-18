
import React, { useEffect, useState, use } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "axios";
import Select from "react-select";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

import useBadge from "../../Hook/useMember";
import { AuthContext } from "../../Context/AuthContext";
import useSecure from "../../Hook/useSecureInstance";
  
const AddPost = () => {
  const { user } = use(AuthContext);
const axiosInstance = useSecure();
  
  const navigate = useNavigate();
  const { badge, badgeLoading } = useBadge();
  const isMember = badge === "Gold";

  const [selectedTag, setSelectedTag] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  

  const { data: postCount = 0, isLoading: postLoading } = useQuery({
    queryKey: ["userPostCount", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/user_email?emailParams=${user?.email}`);
      return res.data.userPostsCount;
    }
  });


  const { data: tags = [], isLoading: tagsLoading } = useQuery({
    queryKey: ["tagsData"],
    queryFn: async () => {
      const res = await axios.get("https://forum-server-site.vercel.app/tags_data");
      return res.data.map(tag => ({ value: tag.name, label: tag.name }));
    }
  });


  useEffect(() => {
    if (postCount >= 5 && !isMember) {
      Swal.fire({
        icon: "warning",
        title: "Post Limit Reached",
        text: "You’ve reached your free post limit (5 posts). Become a member to continue.",
        confirmButtonText: "Go to Membership",
      }).then(result => {
        if (result.isConfirmed) {
          navigate("/membership");
        }
      });
    }
  }, [postCount, isMember, navigate]);


  const onSubmit = async (data) => {
    const postData = {
      name: user?.displayName,
      email: user?.email,
      photo: user?.photoURL,
      title: data.title,
      description: data.description,
      tag: selectedTag?.value || "general",
      upVote: 0,
      downVote: 0,
      createdAt: new Date(),
    };


    try {
      const res = await axios.post("https://forum-server-site.vercel.app/create/posts",postData);
      if (res.data.insertedId) {
        reset();
        Swal.fire({
          icon: "success",
          title: "Post Created!",
          showConfirmButton: false,
          timer: 1500
        });
        navigate("/dashboardLayout/myPosts");
      }
    } catch (error) {
      console.error("Post creation error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create post"
      });
    }
  };

  
  if (badgeLoading || postLoading || tagsLoading) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }


  if (postCount >= 5 && !isMember) {
    return null; 
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 shadow-2xl bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Create a New Post</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
       
        <input
          type="text"
          defaultValue={user?.displayName}
          disabled
          className="w-full p-2 border rounded bg-gray-100"
        />
        <input
          type="email"
          defaultValue={user?.email}
          disabled
          className="w-full p-2 border rounded bg-gray-100"
        />
        <input
          type="text"
          defaultValue={user?.photoURL}
          disabled
          className="w-full p-2 border rounded bg-gray-100"
        />

      
        <input
          {...register("title", { required: true })}
          type="text"
          placeholder="Post Title"
          className="w-full p-2 border rounded"
        />

     
        <textarea
          {...register("description", { required: true })}
          placeholder="Post Description"
          rows={5}
          className="w-full p-2 border rounded"
        ></textarea>

      
        <Select
          options={tags}
          onChange={setSelectedTag}
          value={selectedTag}
          placeholder="Select a tag"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
