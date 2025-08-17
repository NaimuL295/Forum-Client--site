import { AuthContext } from "../Context/AuthContext";
 import { use, useState } from "react";
import { Link, NavLink } from "react-router";

import logo from "../../assets/communication.png"
import NotificationBell from "./NotificationBell";
import Theme from "./theme";

const Navbar = () => {
  const { user, logout } = use(AuthContext);
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    setOpenDropdown(false);
  };
  
  return (
    <nav className="  bg-base-100    shadow-sm px-2 py-4  ">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
      
      
     
      <div className=" lg:hidden  md:hidden dropdown">
          {/* <div tabIndex={0} role="button" className="btn btn-ghost btn-circle"> */}
         <Link to="/" className="hover:text-blue-500">Home</Link>
          {/* </div> */}
        
        
          {/* <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-x-3 ">
          
          
      <NavLink to="/about" className="hover:text-blue-500">About</NavLink>
          <NavLink to="/membership" className="hover:text-blue-500">Membership</NavLink>
          
          </ul> */}
        </div>
      
      
      
      
      
        <Link to="/" className="max-sm:text-base    text-2xl font-bold flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8 w-8 max-sm:hidden" />
           <h1 className="max-sm:hidden text-2xl">Talk<span className="text-yellow-500">Nexus</span></h1>
        </Link>

        {/* Main Navigation Links */}
        <div className="flex items-center gap-2">
          <NavLink to="/" className="hover:text-blue-500  max-sm:hidden ">Home</NavLink>
      <NavLink to="/about" className="hover:text-blue-500   ">About</NavLink>
          <NavLink to="/membership" className="hover:text-blue-500    ">Membership</NavLink>
<Theme/>
          {/* Notification Icon */} 
          <NotificationBell />   

          {/* Authentication Actions */}
          {!user ? (
            <NavLink
              to="/auth/register"
              className="bg-blue-600  px-4 py-1 rounded-md hover:bg-blue-700"
            >
              Join Us
            </NavLink>
          ) : (
            <div className="relative">
              <img
                onClick={() => setOpenDropdown(!openDropdown)}
                src={user?.photoURL}
                alt="profile"
                className="h-10 w-10 rounded-full border cursor-pointer"
              />
              {openDropdown && (
                <div className="absolute right-0 top-12    shadow-lg border rounded w-40 z-50">
                  <div className="px-4 py-2 font-medium">{user?.displayName}</div>
                  <Link to="/dashboardLayout" className="block px-4 py-2 ">Dashboard</Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 "
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
