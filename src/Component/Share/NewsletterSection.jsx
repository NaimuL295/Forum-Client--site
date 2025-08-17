import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import Swal from "sweetalert2";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter a valid email");
      return;
    }

  //  console.log("Subscribed Email:", email);
   
     Swal.fire({
      icon: "success",
      title: "🎉 Subscribed Successfully!",
      text: "You will now receive the latest updates in your inbox.",
      confirmButtonColor: "#4F46E5", // Indigo
    });
    setEmail(""); // clear input
  };

  return (
    <section className="relative py-20 ">
      <div className=" xl:max-w-[1350px]  md:w-11/12 mx-auto text-center px-6">
        <FaEnvelope className="w-12 h-12 mx-auto mb-6 text-indigo-600" />
        <h2 className="text-xl md:text-base lg:text-3xl font-extrabold  mb-4">
          📩 Stay Connected with the Forum
        </h2>
        <p className="text-base md:text-lg  mb-8">
          Subscribe to get the latest posts, trending discussions, and exclusive
          community updates directly to your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-5 py-4 w-full sm:w-96 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 hover:scale-105 transition"
          >
            Subscribe
          </button>
        </form>

        <p className="mt-6 text-sm ">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
