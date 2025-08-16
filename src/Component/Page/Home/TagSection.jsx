import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../Share/Spinner';

const fetchTags = async () => {
  const { data } = await axios.get('https://forum-server-site.vercel.app/tags_data');
  return data;
};

const TagSection = () => {
  const { data: tags = [], isLoading, isError } = useQuery({
    queryKey: ['tags'],
    queryFn: fetchTags,
  });

  if (isLoading) {
    return (
      <div className="my-6 text-center  ">
        <Spinner/>
        <h2 className="text-3xl font-bold mb-3">🔖 Tags</h2>
       
      </div>
    );
  }

  if (isError) {
    return (
      <div className="my-6 text-center text-red-500">
        Failed to load tags.
      </div>
    );
  }

  return (
    <div className="my-6 text-center">
      <h2 className="text-3xl font-bold mb-3">🔖 Available Tags</h2>
      <div className="flex flex-wrap gap-3 justify-center">
        {tags.length === 0 ? (
          <p className="text-gray-500">No tags available.</p>
        ) : (
          tags.map((tag) => (
            <button
              key={tag._id}
              className="px-6 py-2 rounded-full bg-gray-100  transition"  >
              #{tag.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default TagSection;
