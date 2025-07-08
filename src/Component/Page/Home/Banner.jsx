import { useState } from "react";
// import axios from "axios";
import { motion } from "framer-motion";
import bannerImg from "../../../assets/photo-1454165804606-c3d57bc86b40.avif"
import bannerImg2 from "../../../assets/photo-1522071820081-009f0129c71c.avif"
const Banner = () => {
  const [searchTerm, setSearchTerm] = useState("");
//   const [results, setResults] = useState([]);

//   const handleSearch = async () => {
//     if (!searchTerm) return;
//     try {
//       const res = await axios.get(`/api/posts/search?tag=${searchTerm}`);
//       setResults(res.data);
//     } catch (error) {
//       console.error("Search error:", error);
//     }
//   };
console.log(bannerImg);

  return (
    <div>
  {/* Banner Section */}
  {/* Overlay */}


 
{/* </motion.section> */} 




<motion.section
  className="relative py-16 px-6 bg-gradient-to-r  text-white"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: "easeOut" }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black opacity-40"></div>

  <motion.div
    className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
  >
    {/* Left Side: All Images */}
    <div className="lg:flex lg:flex-col flex-1 gap-6">
      {/* First Image (Smaller Size) */}
      <motion.img
        src={bannerImg} // First image
        alt="Image 1"
        className="rounded-lg shadow-xl w-64 h-40 object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
      
      {/* Second Image (Smaller Size) */}
      <motion.img
        src={bannerImg2} // Second image
        alt="Image 2"
        className="rounded-lg shadow-xl mt-4 w-64 h-40 object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      />
    </div>

    {/* Right Side: Text Content */}
    <div className="flex-1 w-full md:w-1/2 text-center md:text-left space-y-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white drop-shadow-md">
        Explore TalkNexus Forums
      </h1>
      <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
        Dive into vibrant discussions, share your expertise, and connect with others across a wide range of topics. TalkNexus is your go-to space for knowledge, support, and community-driven conversations.
      </p>

      {/* Search Box */}
      <motion.div
        className="flex items-center max-w-md mx-auto md:mx-0 space-x-4"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
      >
        <input
          type="text"
          placeholder="Search topics or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-l-lg text-gray-800 focus:outline-none focus:ring-2 "
        />
        <button
          // onClick={handleSearch}
          className=" text-white px-6 py-3 rounded-r-lg transition-all duration-200 ease-in-out"
        >
          Search
        </button>
      </motion.div>
    </div>
  </motion.div>
</motion.section>




  {/* Search Results */}
  {/* {results.length > 0 && (
    <motion.div
      className="max-w-4xl mx-auto mt-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
      <ul className="space-y-4">
        {results.map((post) => (
          <motion.li
            key={post._id}
            className="p-4 border rounded shadow-sm hover:shadow-md transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-xl font-bold text-indigo-700">{post.title}</h3>
            <p className="text-sm text-gray-600">Tags: {post.tags.join(", ")}</p>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )} */}
</div>
  );
};

export default Banner;

