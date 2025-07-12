
// import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';


// import SortControl from '../../Share/SortControl';
// import Pagination from '../../Share/Pagination';
// import PostCard from '../../Share/PostCard';


// const fetchPosts = async ({ page, sortBy }) => {
//   const res = await axios.get(`http://localhost:5000/posts?page=${page}&limit=5&sort=${sortBy}`);
//   return res.data;
// };
// const fetchCommod = async ({ dafa}) => {
//   const command = await axios.get(`http://localhost:5000/comment/count`);
//   return command.command;
// };
// const PostList = () => {
//   const [page, setPage] = useState(1);
//   const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'popular'

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['posts', page, sortBy],
//     queryFn: () => fetchPosts({ page, sortBy }),
//     keepPreviousData: true,
//   });

//   if (isLoading) return <p className="text-center mt-8">Loading posts...</p>;
//   if (isError) return <p className="text-center mt-8 text-red-500">Failed to load posts.</p>;
// console.log(data);


// return (
//   <div className="max-w-7xl mx-auto px-4 mt-6">
//     {/* Sorting Buttons */}
//     <SortControl sortBy={sortBy} setSortBy={setSortBy} />

//     {/* Post List */}
//     {data?.posts.length === 0 ? (
//       <p className="text-center text-gray-600 mt-6">No posts found.</p>
//     ) : (
//       <>
//         {/* Mobile View: Horizontal scroll */}
//         <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4 md:hidden">
//           {data?.posts.map((post) => (
//             <div
//               key={post?._id}
//               className="min-w-[90%] max-w-[95%] flex-shrink-0 bg-white border rounded shadow-sm"
//             >
//               <PostCard post={post} />
//             </div>
//           ))}
//         </div>

//         {/* Tablet and Desktop View: Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {data?.posts.map((post) => (
//             <PostCard key={post?._id} post={post} command={comand} />
//           ))}
//         </div>
//       </>
//     )}

//     {/* Pagination */}
//    <Pagination
//   currentPage={page}
//   totalPages={data?.totalPages}
//   onPageChange={(newPage) => setPage(newPage)}
// />
//   </div>
// );


// };

// export default PostList;


import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import SortControl from '../../Share/SortControl';
import Pagination from '../../Share/Pagination';
import PostCard from '../../Share/PostCard';

// Fetch posts with pagination, sorting, and comment count
const fetchPosts = async ({ page, sortBy }) => {
  const res = await axios.get(`http://localhost:5000/posts?page=${page}&limit=5&sort=${sortBy}`);
  return res.data;  // Returns posts with commentCount included
};

// // Fetch total comment count (global count across all posts)
// const fetchTotalCommentCount = async () => {
//   const res = await axios.get('http://localhost:5000/comment/count');
//   return res.data;  // Assuming the response is like: { totalComments: 150 }
// };

const PostList = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'popular'

  // Fetch posts with pagination and sorting
  const { data: postData, isLoading, isError } = useQuery({
    queryKey: ['posts', page, sortBy],
    queryFn: () => fetchPosts({ page, sortBy }),
    keepPreviousData: true,
  });

  // Fetch total comment count across all posts
//   const { data: totalCommentCount } = useQuery({
//     queryKey: ['totalCommentCount'],
//     queryFn: fetchTotalCommentCount,
//   });
// console.log(totalCommentCount);

  // Loading and Error handling
  if (isLoading) return <p className="text-center mt-8">Loading posts...</p>;
  if (isError) return <p className="text-center mt-8 text-red-500">Failed to load posts.</p>;

  console.log(postData);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-6">
      {/* Sorting Buttons */}
      <SortControl sortBy={sortBy} setSortBy={setSortBy} />

      {/* Total Comment Count (optional) */}
      {/* <div className="text-center mt-4">
        <p>Total Comments: {totalCommentCount ?? 'Loading...'}</p>
      </div> */}

      {/* Post List */}
      {postData?.posts.length === 0 ? (
        <p className="text-center text-gray-600 mt-6">No posts found.</p>
      ) : (
        <>
          {/* Mobile View: Horizontal scroll */}
          {/* <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4 md:hidden">
            {postData?.posts.map((post) => (
              <div
                key={post?._id}
                className="min-w-[90%] max-w-[95%] flex-shrink-0 bg-white border rounded shadow-sm"
              >
                <PostCard post={post} commentCount={totalCommentCount} />
              </div>
            ))}
          </div> */}

          {/* Tablet and Desktop View: Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {postData?.posts.map((post) => (
              <PostCard key={post?._id} post={post}  />
            ))}
          </div>
        </>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={postData?.totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default PostList;
