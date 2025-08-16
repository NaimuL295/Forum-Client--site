import React from "react";

import { FaStar } from "react-icons/fa";
const reviews = [
  {
    name: "Aminul Islam",
    role: "Web Developer",
    review:
      "This forum helped me find quick answers to coding problems. The community is very supportive and friendly.",
  },
  {
    name: "Farhana Akter",
    role: "Student",
    review:
      "I was new to programming, and the discussion threads gave me the confidence to ask questions without hesitation.",
  },
  {
    name: "Sabbir Hossain",
    role: "Freelancer",
    review:
      "One of the best online communities! The Q&A system is easy to use, and I love the reputation points feature.",
  },
];

const ReviewSection = () => {
  return (
    <section className=" py-16 px-6 lg:px-15">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          What Our Users Say
        </h2>
        <p className="text-gray-600 mb-10">
          Real experiences from members of our community
        </p>

        {/* Grid Layout */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
            >
              {/* Stars */}
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-700 italic mb-6">"{item.review}"</p>

              {/* User Info */}
              <div className="mt-auto">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
