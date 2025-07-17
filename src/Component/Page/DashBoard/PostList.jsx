
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import SortControl from '../../Share/SortControl';
import Pagination from '../../Share/Pagination';
import PostCard from '../../Share/PostCard';

const itemsPerPage = 5;

const fetchPosts = async ({ page, sortBy }) => {
  const res = await axios.get(`https://forum-server-site.vercel.app/posts?page=${page}&limit=${itemsPerPage}&sort=${sortBy}`);
  return res.data; // totalItems: number
};



const PostList = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');

  const { data: postData, isLoading, isError } = useQuery({
    queryKey: ['posts', page, sortBy],
    queryFn: () => fetchPosts({ page, sortBy }),
    keepPreviousData: true,
  });



  if (isLoading) return <p className="text-center mt-8">Loading posts...</p>;
  if (isError) return <p className="text-center mt-8 text-red-500">Failed to load posts.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 mt-6">
      <SortControl sortBy={sortBy} setSortBy={setSortBy} />

      {postData?.posts.length === 0 ? (
        <p className="text-center text-gray-600 mt-6">No posts found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {postData.posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}

      {postData?.totalItems && (
       <Pagination
  currentPage={postData.currentPage}
  totalItems={postData.totalItems}
  itemsPerPage={5}
  onPageChange={(page) => setPage(page)}
/>

      )}
    </div>
  );
};

export default PostList;

