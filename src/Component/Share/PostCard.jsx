import React from "react";
import { Link } from "react-router";
import { FaThumbsUp, FaThumbsDown, FaTag } from "react-icons/fa";

const PostCard = ({ post }) => {
  const {
    _id,
    name,
    email,
    photo,
    title,
    description,
    tag,
    upVote,
    downVote,
    createdAt
  } = post;

  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition">
      {/* Header */}
      <div className="flex items-center mb-4">
        <img
          src={photo}
          alt={name}
          className="w-12 h-12 rounded-full object-cover mr-3"
        />
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold mb-2">{title}</h2>

      {/* Description */}
      <p className="text-gray-700 mb-3">
        {description.length > 150
          ? `${description.slice(0, 150)}...`
          : description}
      </p>

      {/* Tag + Votes */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <FaTag className="text-blue-500" />
          <span>{tag}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-green-600">
            <FaThumbsUp /> {upVote}
          </span>
          <span className="flex items-center gap-1 text-red-600">
            <FaThumbsDown /> {downVote}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm">
        <p className="text-gray-400">Posted on: {formattedDate}</p>
        <Link
          to={`/post/${_id}`}
          className="text-blue-600 hover:underline font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
