import { Link } from 'react-router';

const PostCard = ({ post}) => {
  const voteCount = post.upVote - post.downVote;

  return (
    <div className="bg-base-200 rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <img src={post.photo} className="h-10 w-10 rounded-full border" alt="author" />
        <div>
          <p className="font-semibold">{post.name}</p>
          <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <Link to={`/post/${post._id}`} className="text-xl font-bold text-blue-600 hover:underline">
        {post.title}
      </Link>

     
      <div className="flex gap-2 mt-2 text-sm text-gray-700">
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{post.tag}</span>
      </div>

      <div className="mt-2 text-sm text-gray-500">
        Votes: {voteCount} | 
        {/* Comments: {  || 0} */}
      </div>
    </div>
  );
};

export default PostCard;
