// import { useEffect, useState, useContext } from "react";
// import { useParams } from "react-router";
// import axios from "axios";
// import { FacebookShareButton, FacebookIcon } from "react-share";
// import { AuthContext } from "../Context/AuthContext";


// const PostDetails = () => {
//   const { id } = useParams();
//   console.log(id);
  
//   const [post, setPost] = useState(null);
//   const [comments, setComments] = useState([]);
//   const { user } = useContext(AuthContext);
//   const [commentText, setCommentText] = useState("");

//   const shareUrl = `${window.location.origin}/post/${id}`;

//   useEffect(() => {
//     // Fetch post details
//     axios
//       .get(`http://localhost:5000/postsDetails/${id}`)
//       .then((res) => setPost(res.data))
//       .catch((err) => console.error(err));

//     // Fetch comments
//     axios
//       .get(`http://localhost:5000/comments/post/${id}`)
//       .then((res) => setComments(res.data))
//       .catch((err) => console.error(err));
//   }, [id]);

//   const handleCommentSubmit = () => {
//     if (!commentText.trim()) return;

//     const newComment = {
//       postId: id,
//       text: commentText,
//       email: user?.email,
//     };

//     axios
//       .post("http://localhost:5000/comments", newComment)
//       .then((res) => {
//         setComments([...comments, res.data]);
//         setCommentText("");
//       })
//       .catch((err) => console.error(err));
//   };

//   if (!post) return <p className="text-center py-8">Loading...</p>;
// console.log(post,"fdf");

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-6">
//       {/* Author Info */}
//       <div className="flex items-center gap-3 mb-4">
//         <img src={post.photo} className="w-10 h-10 rounded-full border" alt="" />
//         <div>
//           <p className="font-semibold">{post.name}</p>
//           <p className="text-sm text-gray-500">
//             {new Date(post.createdAt).toLocaleString()}
//           </p>
//         </div>
//       </div>

//       {/* Post Content */}
//       <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
//       <p className="text-gray-700 mb-2">{post.description}</p>

//       {/* Tags */}
//       <div className="mb-2">
//         <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
//           #{post.tag}
//         </span>
//       </div>

//       {/* Votes */}
//       <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
//         <p>👍 {post.upVote}</p>
//         <p>👎 {post.downVote}</p>
//         <p>💬 {comments.length} Comments</p>
//         <FacebookShareButton url={shareUrl}>
//           <FacebookIcon size={24} round />
//         </FacebookShareButton>
//       </div>

//       {/* Comment Section */}
//       <div className="mt-6">
//         <h2 className="text-lg font-semibold mb-2">Comments</h2>
//         {user ? (
//           <div className="mb-4">
//             <textarea
//               className="w-full border rounded p-2 text-sm"
//               rows="2"
//               placeholder="Write a comment..."
//               value={commentText}
//               onChange={(e) => setCommentText(e.target.value)}
//             />
//             <button
//               onClick={handleCommentSubmit}
//               className="mt-2 bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700"
//             >
//               Submit Comment
//             </button>
//           </div>
//         ) : (
//           <p className="text-gray-500">Login to post a comment.</p>
//         )}

//         {comments.map((comment, i) => (
//           <div key={i} className="border-t py-2 text-sm">
//             <p className="text-gray-800">{comment.text}</p>
//             <p className="text-gray-400 text-xs">By: {comment.email}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PostDetails;
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { AuthContext } from "../Context/AuthContext";
import { useContext, useState } from "react";
import Swal from "sweetalert2";

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [commentText, setCommentText] = useState("");
  const queryClient = useQueryClient();
  const shareUrl = `${window.location.origin}/post/${id}`;

  // ✅ Fetch post details
  const { data: post, isLoading: loadingPost } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/postsDetails/${id}`)
      return res.data;
    },
  });

  // ✅ Fetch comments
  const { data: comments = [], isLoading: loadingComments } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/comments/post/${id}`);
      return res.data;
    },
  });

  // ✅ Mutation for voting
  const voteMutation = useMutation({
    mutationFn: (type) =>
      axios.patch(`http://localhost:5000/posts/${id}/vote`, { type }),
    onSuccess: () => {
      queryClient.invalidateQueries(["post", id]);
    },
  });

  // ✅ Mutation for comment
  const commentMutation = useMutation({
    mutationFn: (newComment) =>
      axios.post("http://localhost:5000/comments", newComment),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", id]);
      setCommentText("");
      Swal.fire("Comment added", "", "success");
    },
  });

  const handleVote = (type) => {
    if (!user) return Swal.fire("Login to vote", "", "info");
    voteMutation.mutate(type);
  };

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    if (!user) return Swal.fire("Login to comment", "", "info");

    const newComment = {
      postId: id,
      text: commentText,
      email: user.email,
    };

    commentMutation.mutate(newComment);
  };

  if (loadingPost) return <p className="text-center py-6">Loading post...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Author */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={post.photo}
          className="h-10 w-10 rounded-full border"
          alt="Author"
        />
        <div>
          <p className="font-semibold">{post.name}</p>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Post Info */}
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-700 mb-3">{post.description}</p>
      <div className="mb-2">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
          #{post.tag}
        </span>
      </div>

      {/* Interaction */}
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
        <button onClick={() => handleVote("up")} className="hover:text-blue-600">
          👍 {post.upVote}
        </button>
        <button onClick={() => handleVote("down")} className="hover:text-red-600">
          👎 {post.downVote}
        </button>
        <p>💬 {comments.length}</p>
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon size={24} round />
        </FacebookShareButton>
      </div>

      {/* Comments */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Comments</h2>

        {user ? (
          <div className="mb-4">
            <textarea
              className="w-full border rounded p-2 text-sm"
              rows="2"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              onClick={handleCommentSubmit}
              className="mt-2 bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700"
            >
              Submit Comment
            </button>
          </div>
        ) : (
          <p className="text-gray-500">Login to post a comment.</p>
        )}

        {loadingComments ? (
          <p>Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-gray-500">No comments yet.</p>
        ) : (
          comments.map((c, i) => (
            <div key={i} className="border-t pt-3 mt-3 text-sm text-gray-700">
              <p>{c.text}</p>
              <p className="text-xs text-gray-400">By: {c.email}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostDetails;
