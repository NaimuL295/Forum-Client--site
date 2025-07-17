import { useForm } from "react-hook-form";
import { use, useState } from "react";
import Swal from "sweetalert2";
import { imageUpload } from "../Hook/imageUpload";
import { AuthContext } from "../Context/AuthContext";
import { Link, useLocation } from "react-router";
import axios from "axios";

import { useNavigate } from 'react-router';

const Register = () => {

  const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';
    const {createUser,updateProfiles,setUser,googleSign}=use(AuthContext)
     const [previewImage, setPreviewImage] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
   reset,
    setValue,
    formState: { errors },
  } = useForm();

 


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return Swal.fire("Invalid File", "Only image files are allowed (JPG, PNG)", "error");
    }

    // Validate file size
    if (file.size > 5 * 1024 * 1024) {
      return Swal.fire("Too Large", "Image must be under 5MB", "error");
    }

    setPreviewImage(URL.createObjectURL(file));

    try {
      Swal.fire({
        title: "Uploading...",
        text: "Please wait...",
        didOpen: () => Swal.showLoading(),
        allowOutsideClick: false,
      });

      const imageUrl = await imageUpload(file);
      setValue("photoUrl", imageUrl); // save uploaded URL into react-hook-form
      Swal.close();
      Swal.fire("Success", "Image uploaded!", "success");
      
      
    } catch (err) {
      setPreviewImage(null);
      console.log(err);
      
      Swal.fire("Upload Failed", "Try again later.", "error");
    }
  };

  const onSubmit = (data) => {
createUser(data?.email, data?.password).then((result) => {
    
const res=result.user;
updateProfiles({displayName:data?.name,photoURL: data.photoUrl})
 setUser({...res,displayName:data?.name,photoURL: data.photoUrl})

const userInfo = {
  name: data?.name,
  email: data?.email,
  photo: data?.photoUrl,
  badge: "Bronze", // default on registration
};



axios.post("http://localhost:5000/user",userInfo)
  .then((res) => {
    console.log("User saved:", res.data);
 navigate(from)
  })
  .catch((err) => {
    console.error("Failed to save user:", err);
  });
;


}).catch((err) => {
    console.log(err);
    
});

    console.log("Registration Data:", data);
    Swal.fire("Success", "Registration complete!", "success");
    reset();
    setPreviewImage(null);
  };

const handlerGoogle = () => {
  googleSign()
    .then((result) => {
      const users = result.user;
      console.log("Google user:", users);

      const userInfo = {
        name: users?.displayName,
        email: users?.email,
        photo: users?.photoURL ,
        badge: "Bronze", // default badge for new Google users
      };

      // Save to backend
      axios.post("http://localhost:5000/user",userInfo)
        .then((res) => {
          console.log("User saved:", res.data);
          Swal.fire("Success", "Logged in with Google!", "success");
          navigate(from)
        })
        .catch((err) => {
          console.error("Failed to save user:", err);
          Swal.fire("Error", "Could not save user", "error");
        });
    })
    .catch((err) => {
      console.log("Google Sign-In Error:", err);
      Swal.fire("Error", "Google Sign-In failed", "error");
    });
};


  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-base-100 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register Now</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="form-control">
            <label className="label block">Name</label>
            <input
              type="text"
              className="input input-bordered"
              {...register("name", { required: "Name is required" })}
              placeholder="Your full name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label block">Email</label>
            <input
              type="email"
              className="input input-bordered"
              {...register("email", { required: "Email is required" })}
              placeholder="example@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">Password</label>
            <input
              type="password"
              className="input input-bordered"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              placeholder="********"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div className="form-control">
            <label className="label">Confirm Password</label>
            <input
              type="password"
              className="input input-bordered"
              {...register("confirm", {
                required: "Please confirm password",
                validate: (val) => val === watch("password") || "Passwords do not match",
              })}
              placeholder="********"
            />
            {errors.confirm && <p className="text-red-500 text-sm">{errors.confirm.message}</p>}
          </div>

          {/* Image Upload */}
          <div className="form-control">
            <label className="label">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered"
              onChange={handleImageUpload}
            />
            {errors.photoUrl && <p className="text-red-500 text-sm">{errors.photoUrl.message}</p>}
            <input type="hidden" {...register("photoUrl", { required: "Image upload is required" })} />
          </div>

          {/* Preview */}
          {previewImage && (
            <div className="flex justify-center mt-2">
              <img
                src={previewImage}
                alt="Preview"
                className="w-20 h-20 rounded-full ring ring-primary object-cover"
              />
            </div>
          )}

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-full mt-4">
            Register
          </button>
  <p className="text-center mt-2 text-sm">
  Already have an account?{" "}
  <Link to="/auth/login" className="text-primary hover:underline">
    Log in here
  </Link>
</p>

         
        </form>
         <div className="divider">OR</div>
        <div><button onClick={handlerGoogle}
         className="btn w-full my-1.5 bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button></div>
      </div>
    </div>
  );
};

export default Register;
