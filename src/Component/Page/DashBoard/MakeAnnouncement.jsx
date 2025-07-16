import React, { use, useState,} from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import { AuthContext } from "../../Context/AuthContext";

const MakeAnnouncement = () => {
  const { user } = use(AuthContext); 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields.",
      });
      return;
    }

    const announcement = {
      authorName: user?.displayName,
      authorImage: user?.photoURL,
      title,
      description,
    };

    try {
      await axios.post("http://localhost:5000/make/announcement", announcement);
      Swal.fire({
        icon: "success",
        title: "Announcement posted!",
        text: "Your announcement has been successfully posted.",
      });
      setTitle("");
      setDescription("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to post announcement",
        text: "Something went wrong. Please try again later.",
      });
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 shadow rounded mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-center text-black">📢 Make Announcement</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full input input-bordered "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full textarea textarea-bordered"
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit" className="btn btn-primary w-full">
          Publish
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
