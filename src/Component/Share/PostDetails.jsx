
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { AuthContext } from "../Context/AuthContext";
import { use,  useState } from "react";
import Swal from "sweetalert2";

const PostDetails = () => {
  const { id } = useParams();

  
  const { user } =use(AuthContext)
  const [commentText, setCommentText] = useState("");
  const [reportCommentId, setReportCommentId] = useState(null);
  const queryClient = useQueryClient();
  const shareUrl = `${window.location.origin}/post/${id}`;

  const { data: post, isLoading: loadingPost, error: postError } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await axios.get(`https://forum-server-site.vercel.app/postsDetails/${id}`);
      return res.data;
    },
  });

  // Fetch comments
  const { data: comments = [], isLoading: loadingComments, error: commentsError } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      const res = await axios.get(`https://forum-server-site.vercel.app/comments/post/${id}`);
      return res.data;
    },
  });

  // Mutation for voting post
  const voteMutation = useMutation({
    mutationFn: (type) => axios.patch(`https://forum-server-site.vercel.app/posts/${id}/vote`, { type }),
    onSuccess: () => queryClient.invalidateQueries(["post", id]),
  });

  // Mutation for adding comment
  const commentMutation = useMutation({
    mutationFn: (newComment) => axios.post("https://forum-server-site.vercel.app/comments", newComment),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", id]);
      setCommentText("");
      Swal.fire("Comment added", "", "success");
    },
  });

  // Mutation for reporting comment
  const reportMutation = useMutation({
    mutationFn: ({ commentId, feedback }) =>
      axios.post(`https://forum-server-site.vercel.app/comments/report/${commentId}`,{ feedback }),
    onSuccess: () => {
      Swal.fire("Reported", "Thank you for your feedback", "success");
      setReportCommentId(null);
    },
  });

  // Voting handler
  const handleVote = (type) => {
    if (!user) return Swal.fire("Login to vote", "", "info");
    voteMutation.mutate(type);
  };

  // Comment submit handler
  const handleCommentSubmit = () => {
    if (!commentText.trim()) return Swal.fire("Please enter comment", "", "warning");
    if (!user) return Swal.fire("Login to comment", "", "info");

    const newComment = {
      postId: id,
      text: commentText,
      email: user.email,
      name: user.displayName,
      photo: user.photoURL,
    };

    commentMutation.mutate(newComment);
  };

  // Report comment handler
  const handleReport = (commentId, feedback) => {
    if (!user) return Swal.fire("Login to report comments", "", "info");
    if (!feedback) return Swal.fire("Select feedback before reporting", "", "warning");

    reportMutation.mutate({ commentId, feedback });
  };

  if (loadingPost) return <p className="text-center py-6">Loading post...</p>;
  if (postError) return <p className="text-center py-6 text-red-500">Failed to load post.</p>;
  if (!post) return <p className="text-center py-6">Post not found.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Author */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={post.photo || "/default-avatar.png"}
          className="h-10 w-10 rounded-full border"
          alt="Author"
        />
        <div>
          <p className="font-semibold">{post.name}</p>
          <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
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
        <button onClick={() => handleVote("up")} className="hover:text-blue-600" title="Upvote">
          👍 {post.upVote}
        </button>
        <button onClick={() => handleVote("down")} className="hover:text-red-600" title="Downvote">
          👎 {post.downVote}
        </button>
        <p>💬 {comments.length}</p>
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon size={24} round />
        </FacebookShareButton>
      </div>

      {/* Comments Section */}
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
        ) : commentsError ? (
          <p className="text-red-500">Failed to load comments.</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-gray-500">No comments yet.</p>
        ) : (
          comments.map((c) => (
            <div key={c._id} className="border-t pt-3 mt-3 text-sm text-gray-700">
              <div className="flex items-center gap-2 mb-1">
                <img
                  src={c.photo || "/default-avatar.png"}
                  alt={c.name || "User"}
                  className="h-6 w-6 rounded-full border"
                />
                <p className="font-semibold">{c.name || c.email}</p>
              </div>
              <p>{c.text.length > 100 ? c.text.slice(0, 100) + "..." : c.text}</p>

              {/* Report feedback and button */}
              <div className="mt-1 flex items-center gap-2">
                <select
                  onChange={(e) => setReportCommentId({ id: c._id, feedback: e.target.value })}
                  defaultValue=""
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="" disabled>
                    Select feedback
                  </option>
                  <option value="Spam">Spam</option>
                  <option value="Offensive">Offensive</option>
                  <option value="Other">Other</option>
                </select>
                <button
                  disabled={
                    !reportCommentId ||
                    reportCommentId.id !== c._id ||
                    !reportCommentId.feedback
                  }
                  onClick={() => handleReport(reportCommentId.id, reportCommentId.feedback)}
                  className="text-red-600 hover:underline disabled:text-gray-400"
                >
                  Report
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostDetails;
