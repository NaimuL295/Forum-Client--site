import React, { useEffect, useState } from 'react';

const TagSection = () => {
  // Expanded demo tags data
  const demoTags = [
    { _id: 1, name: 'React' },
    { _id: 2, name: 'JavaScript' },
    { _id: 3, name: 'NodeJS' },
    { _id: 4, name: 'CSS' },
    { _id: 5, name: 'HTML' },
    { _id: 6, name: 'Web Development' },
    { _id: 7, name: 'TypeScript' },
    { _id: 8, name: 'VueJS' },
    { _id: 9, name: 'Next.js' },
    { _id: 10, name: 'Tailwind CSS' },
    { _id: 11, name: 'GraphQL' },
    { _id: 12, name: 'Firebase' },
    { _id: 13, name: 'Gatsby' },
    { _id: 14, name: 'Redux' },
    { _id: 15, name: 'Sass' },
    { _id: 16, name: 'Webpack' },
  ];

  const [tags, setTags] = useState(demoTags); // Set demo tags initially
  const [loading, setLoading] = useState(false); // Simulate loading state

  // Simulate loading state for demo data (mock API request)
  useEffect(() => {
    setLoading(true); // Simulate loading
    setTimeout(() => {
      setTags(demoTags); // After 2 seconds, set the tags
      setLoading(false); // Set loading to false
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="my-6 text-center">
        <h2 className="text-3xl font-bold mb-3">🔖 Tags</h2>
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="my-6 text-center">
     
     
      {/* Available Tags Section */}
      <h2 className="text-3xl font-bold mb-3">🔖 Available Tags</h2>
      <div className="flex flex-wrap gap-3">
        {tags.length === 0 ? (
          <div className="text-gray-500">No tags available.</div>
        ) : (
          tags.map(tag => (
            <button
              key={tag._id} // Ensure each tag has a unique key
              className=" px-6 py-2 rounded-full text-lg"
            >
              #{tag.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default TagSection;
