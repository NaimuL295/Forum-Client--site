import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";

const Contact = () => {
  const form = useRef();

  // react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // handle form submit
  const onSubmit = (data) => {
    data. e.preventDefault();
    emailjs
      .sendForm(
    import.meta.env.VITE.PUBLIC_EMAILJS_SERVICE_ID,
   import.meta.env.VITE.PUBLIC_EMAILJS_TEMPLATE_ID,
        form.current  ,
    import.meta.env.VITE.PUBLIC_EMAILJS_PUBLIC_KEY
      )
.then(
        () => {
          alert("Message sent successfully ✅");
          reset();
        },
        (error) => {
          alert("Message failed ❌: " + error.text);
        }
      );
  };

  return (
    <div className="min-h-screen  py-12 px-6 lg:px-20">
      {/* Page Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold ">Contact Us</h1>
        <p className=" mt-2">
          We’d love to hear from you! Reach out with any questions or feedback.
        </p>
      </div>

      {/* Contact Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side - Form */}
        <div className=" shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 ">
            Send Us a Message
          </h2>

          <form ref={form} onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block  mb-1">Full Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Enter your name"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block  mb-1">Email Address</label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block  mb-1">Message</label>
              <textarea
                {...register("message", { required: "Message is required" })}
                rows="5"
                placeholder="Write your message here..."
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>


        {/* Right Side - Info  */}
        <div className="space-y-8">
          {/* Contact Info */}
          <div className="e shadow-lg rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 ">
              Get in Touch
            </h2>
            <p className=" mb-4">
              You can also contact us directly via phone, email, or visit us at
              our office.
            </p>
            <ul className="space-y-3">
              <li>
                <span className="font-bold ">📍 Address:</span>{" "}
                123 Main Street, Dhaka, Bangladesh
              </li>
              <li>
                <span className="font-bold ">📞 Phone:</span>{" "}
                +880 123 456 789
              </li>
              <li>
                <span className="font-bold ">✉️ Email:</span>{" "}
                info@example.com
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
