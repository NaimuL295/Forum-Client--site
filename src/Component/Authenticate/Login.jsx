import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router';

import { FaEye, FaEyeSlash} from "react-icons/fa";
import { AuthContext } from '../Context/AuthContext';
//import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
const Login = () => {

  const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';
    const {googleSign,signUser}=use(AuthContext)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log('Login data:', data);

    // TODO: Replace with actual login logic (e.g. Firebase, custom API)
 const { email, password } = data;

  if (!email) {
    toast.error("Email is required");
    return;
  }

  if (!password || password.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return;
  }

  if (!/[A-Z]/.test(password)) {
    toast.error("Password must contain at least one uppercase letter");
    return;
  }

  if (!/[a-z]/.test(password)) {
    toast.error("Password must contain at least one lowercase letter");
    return;
  }
   signUser(email, password).then((result) => {
    console.log(result);
    navigate(from)
   }).catch((err) => {
    console.log(err);
    
   });
// axios.post("https://forum-server-site.vercel.app/user", )
//   .then((res) => {
//     console.log("User saved:", res.data);
//   })
//   .catch((err) => {
//     console.error("Failed to save user:", err);
//   });
;
    reset();
  };


  const handlerGoogle=()=>{
  googleSign().then(() => {
   
     navigate(from)
  }).catch((err) => {
    console.log(err);
    
  });
  }


  return (
     
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="bg-base-100 p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center">Login Now</h2>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div className="form-control">
            <label className="label block">Email</label>
            <input
              type="email"
              className="input input-bordered"
              placeholder="example@email.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label block">Password</label>
            <div className="relative">
                {/* <Toaster></Toaster> */}
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pr-12"
                placeholder="********"
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-lg text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full mt-2">
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="divider">OR</div>

        {/* Google Login Button */}
        <button
          onClick={handlerGoogle}
          className="btn w-full bg-white text-black border border-gray-300 hover:border-primary"
        >
          <svg
            aria-label="Google logo"
            width="18"
            height="18"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="mr-2"
          >
            <g>
              <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
              <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
              <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
              <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
            </g>
          </svg>
          Login with Google
        </button>

        {/* Register Redirect */}
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/auth/register" className="text-primary hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
    
  );
};

export default Login;
