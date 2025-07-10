// import axios from "axios";
// import { useEffect, useState, use } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router";
// import { AuthContext } from "../../Context/AuthContext";
// import Select from "react-select";

// const tagOptions = [
//   { value: "react", label: "React" },
//   { value: "node", label: "Node.js" },
//   { value: "mongodb", label: "MongoDB" },
//   { value: "auth", label: "Auth" },
// ];

// const AddPost = () => {
//   const { user } = use(AuthContext);
//   const [postCount, setPostCount] = useState(0);
//   const [selectedTag, setSelectedTag] = useState(null);
//   const navigate = useNavigate();
//   const { register, handleSubmit, reset } = useForm();

//   useEffect(() => {
//     if (user?.email) {
//       axios
//         .get(`http://localhost:5000/posts/user/${user?.email}`)
//         .then(res => setPostCount(res.data.length))
//         .catch(err => console.error(err));
//     }
//   }, [user]);

//   const onSubmit = async (data) => {
//     const post = {
//       name: user?.displayName,
//       email: user?.email,
//       photo: user?.photoURL,
//       title: data?.title,
//       description: data?.description,
//       tag: selectedTag?.value || "general",
//       upVote: 0,
//       downVote: 0,
//       createdAt: new Date(),
      
//     };
// console.log(post);

//     try {
//       const res = await axios.post("http://localhost:5000/create/posts", post);
//       if (res.data.insertedId) {
//         reset();
//         navigate("/dashboard/myposts");
//       }
//     } catch (error) {
//       console.error("Post creation failed", error);
//     }
//   };

//   if (postCount >= 5 && !user?.isMember) {
//     return (
//       <div className="text-center py-12">
//         <h2 className="text-xl font-semibold text-red-600 mb-4">
//           You’ve reached your free post limit of 5 posts.
//         </h2>
//         <button
//           onClick={() => navigate("/membership")}
//           className="bg-yellow-500  px-6 py-2 rounded hover:bg-yellow-600"
//         >
//           Become a Member
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto px-4 bg-black py-10b rounded-2xl">
//       <h2 className="text-2xl font-bold mb-6 text-center">Add New Post</h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <input
//           type="text"
//           value={user?.displayName}
//           disabled
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="email"
//           value={user?.email}
//           disabled
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           value={user?.photoURL}
//           disabled
//           className="w-full p-2 border rounded"
//         />

//         <input
//           {...register("title", { required: true })}
//           type="text"
//           placeholder="Post Title"
//           className="w-full p-2 border rounded"
//         />
//         <textarea
//           {...register("description", { required: true })}
//           placeholder="Post Description"
//           className="w-full p-2 border rounded"
//           rows={4}
//         />

//         <Select className="text-black"
//          options={tagOptions}
//           value={selectedTag}
//           onChange={setSelectedTag}
//           placeholder="Select a tag"
//         />

//         <button
//           type="submit"
//           className="bg-blue-600  px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Submit Post
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddPost;
// 
import React, { use,useEffect,  useState } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router";
import axios from "axios";
import Select from "react-select";
import { AuthContext } from "../../Context/AuthContext";

const tagOptions = [
  { value: "react", label: "React" },
  { value: "node", label: "Node.js" },
  { value: "mongodb", label: "MongoDB" },
  { value: "auth", label: "Auth" },
];

const AddPost = () => {
  const { user } = use(AuthContext);
 const [postCount, setPostCount] = useState(0);
  const [selectedTag, setSelectedTag] = useState(null);
 const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  // ✅ Fetch user’s post count from backend
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/posts/count/${user.email}`)
        .then(res => setPostCount(res.data.count))
        .catch(err => console.error(err));
    }
  }, []);

  // ✅ Form submit handler
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
      const res = await axios.post("http://localhost:5000/create/posts",{...postData});
      if (res.data.insertedId) {
        reset();
      //  navigate("/dashboard/myposts");
      }
    } catch (error) {
      console.error("Failed to create post", error);
    }
  };

  // ✅ If user hit post limit and not a member, show upgrade message
  if (postCount >= 5 && !user?.isMember) {
    return (
      <div className="text-center py-10 bg-black">
        <h2 className="text-xl font-semibold text-red-600 mb-4">
          You’ve reached your free post limit (5 posts).
        </h2>
        <button
          onClick={() => navigate("/membership")}
          className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
        >
          Become a Member
        </button>
      </div>
    );
  }

  // ✅ Show Post Form
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 bg-black">
      <h2 className="text-2xl font-bold mb-6 text-center">Create a New Post</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* User Info (pre-filled) */}
        <input
          type="text"
          defaultValue={user?.displayName}
          disabled
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          defaultValue={user?.email}
          disabled
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          defaultValue={user?.photoURL}
          disabled
          className="w-full p-2 border rounded"
        />

        {/* Post Title */}
        <input
          {...register("title", { required: true })}
          type="text"
          placeholder="Post Title"
          className="w-full p-2 border rounded"
        />

        {/* Post Description */}
        <textarea
          {...register("description", { required: true })}
          placeholder="Post Description"
          rows={5}
          className="w-full p-2 border rounded"
        ></textarea>

        {/* Tag Dropdown */}
        <Select
          options={tagOptions}
          onChange={setSelectedTag}
          defaultValue={selectedTag}
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
