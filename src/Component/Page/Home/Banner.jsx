// import { useState } from "react";
// import { motion } from "framer-motion";
// import bannerImg2 from "../../../assets/photo-1522071820081-009f0129c71c.avif";
// import axios from "axios";
// import { Link } from "react-router";

// const Banner = () => {
//   const [searchTerm, setSearchTerm] = useState(""); 
//   const [results, setResults] = useState([]);
//   const handleSearch = async () => {
//     if (!searchTerm.trim()) return;

//     try {
//       const res = await axios.get(`https://forum-server-site.vercel.app/posts/search?tag=${searchTerm}`);
//       setResults(res.data || []);
//     } catch (error) {
//       console.error("Search error:", error);
//     }
//   };
// console.log(results);
//   return (
//     <div>

//       <motion.section
//         className="relative py-24 px-8 text-white"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1, ease: "easeOut" }}
//       >
//         <div
//           className="absolute inset-0 bg-cover bg-center h-full"
//           style={{ backgroundImage: `url(${bannerImg2})` }}
//         ></div>

//         <motion.div
//           className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
//         >
//           <div className="flex-1 w-full md:w-1/2 text-center md:text-left space-y-8">
//             <h1 className="text-4xl font-extrabold leading-tight drop-shadow-md">
//               Explore TalkNexus Forums
//             </h1>
//             <p className="text-xl sm:text-2xl leading-relaxed">
//               Dive into vibrant discussions, share your expertise, and connect with others across
//               a wide range of topics. TalkNexus is your go-to space for knowledge,
//               support, and community-driven conversations.
//             </p>
     
//             <motion.div
//               className="flex items-center max-w-xl mx-auto md:mx-0 space-x-4"
//               initial={{ scale: 0.95 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
//             >
//               <input
//                 type="text"
//                 placeholder="Search topics or tags..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//                 className="w-full px-6 py-3 rounded-l-lg  focus:outline-none focus:ring-2 ring-blue-400"
//               />
//               <button
//                 onClick={handleSearch}
//                 className="text-white bg-blue-600 px-6 py-3 rounded-r-lg hover:bg-blue-500"
//               >
//                 Search
//               </button>
//             </motion.div>
//           </div>
//         </motion.div>
//       </motion.section>

//       {results.length > 0 && (
//         <motion.div
//           className="max-w-4xl mx-auto mt-10 px-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
//           <ul className="space-y-4">
//             {results.map((post) => (
//               <motion.li
//                 key={post._id}
//                 className="p-4 border rounded shadow-sm hover:shadow-md transition"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4 }}
//               >
//                 <Link
//                   to={`/post/${post._id}`}
//                   className="text-xl font-bold text-indigo-700 hover:underline">     {post.title}
//                 </Link>
//                 <p className="text-sm text-gray-600">
//                   Tag:{" "}
//                   <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
//                     {post.tag}
//                   </span>
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   {new Date(post.createdAt).toLocaleString()}
//                 </p>
//               </motion.li>
//             ))}
//           </ul>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default Banner;



import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import axios from "axios";
import { Link } from "react-router";
import bannerImg2 from "../../../assets/photo-1522071820081-009f0129c71c.avif"; // Update path as needed

const Banner = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      const res = await axios.get(`https://forum-server-site.vercel.app/posts/search?tag=${searchTerm}`);
      setResults(res.data || []);
      setSearchTerm("")
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <motion.section
        ref={sectionRef}
        className="relative py-24 px-8 text-white"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center h-full"
          style={{ backgroundImage: `url(${bannerImg2})` }}
        ></div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex-1 w-full md:w-1/2 text-center md:text-left space-y-8">
            <h1 className="text-4xl font-extrabold leading-tight drop-shadow-md">
              Explore TalkNexus Forums
            </h1>
            <p className="text-xl sm:text-2xl leading-relaxed">
              Dive into vibrant discussions, share your expertise, and connect with others across
              a wide range of topics. TalkNexus is your go-to space for knowledge,
              support, and community-driven conversations.
            </p>

            <motion.div
              className="flex items-center max-w-xl mx-auto md:mx-0 space-x-4"
              initial={{ scale: 0.95 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
            >
              <input
                type="text"
                placeholder="Search topics or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full px-6 py-3 rounded-l-lg focus:outline-none focus:ring-2 ring-blue-400 "
              />
              <button
                onClick={handleSearch}
                className="text-white bg-blue-600 px-6 py-3 rounded-r-lg hover:bg-blue-500"
              >
                Search
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Search Results */}
      {results.length > 0 && (
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
                className="p-4 border rounded shadow-sm hover:shadow-md transition bg-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Link
                  to={`/post/${post._id}`}
                  className="text-xl font-bold text-indigo-700 hover:underline"
                >
                  {post.title}
                </Link>
                <p className="text-sm text-gray-600">
                  Tag:{" "}
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    {post.tag}
                  </span>
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* No results message */}
      {results.length === 0 && searchTerm && (
        <div className="text-center mt-6 text-gray-500">No results found.</div>
      )}
    </div>
  );
};

export default Banner;
