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
  {
    name: "Nusrat Jahan",
    role: "UI/UX Designer",
    review:
      "I enjoy sharing design resources here. The feedback from other members has improved my skills and creativity a lot.",
  },
  {
    name: "Rakibul Hasan",
    role: "Software Engineer",
    review:
      "Whenever I get stuck at work, I search this forum first. The detailed answers save me hours of debugging.",
  },
  {
    name: "Mehedi Hasan",
    role: "Full-Stack Developer",
    review:
      "The tutorials and discussions on MERN stack are super helpful. I’ve learned real-world problem solving here.",
  },


];


const ReviewSection = () => {
  return (
    <section className=" py-16 px-4 lg:px-5">
      <div className=" xl:max-w-[1350px]  md:w-11/12  mx-auto text-center">
        <h2 className="text-xl md:text-base lg:text-3xl font-bold  mb-4">
          What Our Users Say
        </h2>
        <p className=" mb-10">
          Real experiences from members of our community
        </p>

        {/* Grid Layout */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((item, index) => (
            <div
              key={index}
              className=" rounded-2xl shadow-md p-3 hover:shadow-lg transition"
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
              <p className=" italic mb-6">"{item.review}"</p>

              {/* User Info */}
              <div className="mt-auto">
                <h3 className="text-lg font-semibold ">
                  {item.name}
                </h3>
                <p className="text-sm ">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
