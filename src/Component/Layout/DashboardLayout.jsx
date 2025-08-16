

import { Link, NavLink, Outlet, useNavigate } from "react-router";

import logo from "../../assets/communication.png"
import { FaUser, FaPlus, FaList, FaBullhorn, FaUsers, FaCommentDots } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import { use } from "react";
import useUserRole from "../Hook/useUserRole";

const DashboardLayout = () => {
  const navigate=useNavigate()
   const { role, roleLoading } = useUserRole();
  const {logout } = use(AuthContext);

 
  const LogOUt=()=>{
    logout().then(() => {
      navigate("/auth/login")
    })
  }
  
  
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main Content Area */}
      <div className="drawer-content flex flex-col p-4  min-h-screen">
       <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
                    
                </div>
        <Outlet />
      </div>

      {/* Sidebar Area */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <aside className="w-64 min-h-full  text-base-content p-4 flex flex-col justify-between">
          <div>
            <div className="text-xl font-bold  mb-6">
             <Link to="/"  className="inline-flex"><img src={logo} alt="Logo" className="h-8 w-8 max-sm:hidden" />
                       <h1 className="max-sm:hidden">TalkNexus</h1></Link>
                     
            </div>

            <div className="space-y-2">
          
           { }
               {!roleLoading && role === 'admin' &&  (
               <>
                  <NavLink to="/dashboardLayout/adminProfile" className="flex items-center gap-2  px-3 py-2 rounded">
                    <FaUser /> Admin Profile
                  </NavLink>
                  <NavLink to="/dashboardLayout/manageUsers" className="flex items-center gap-2  px-3 py-2 rounded">
                    <FaUsers /> Manage Users
                  </NavLink>
                  <NavLink to="/dashboardLayout/reportedComments" className="flex items-center gap-2  px-3 py-2 rounded">
                    <FaCommentDots /> Reported Comments
                  </NavLink>
                  <NavLink to="/dashboardLayout/makeAnnouncement" className="flex items-center gap-2  px-3 py-2 rounded">
                    <FaBullhorn /> Make Announcement
                  </NavLink>
                </>
          )}
                <>

                { role !=="admin"?
                  <NavLink to="/dashboardLayout/myProfile" className="flex items-center gap-2  px-3 py-2 rounded">
                    <FaUser /> My Profile
                  </NavLink>
             :""}
                  
                  <NavLink to="/dashboardLayout/addPost" className="flex items-center gap-2  px-3 py-2 rounded">
                    <FaPlus /> Add Post
                  </NavLink>
                  <NavLink to="/dashboardLayout/myPosts" className="flex items-center gap-2  px-3 py-2 rounded">
                    <FaList /> My Posts
                  </NavLink>
                </>
            
            </div>
          </div>

          {/* User Info & Logout */}
          <div className="border-t pt-4">
            <div className="flex items-center gap-3 mb-3">
              {/* <img src={user?.photoURL} alt="profile" className="h-10 w-10 rounded-full border" /> */}
              {/* <div>
                <p className="font-semibold">{user?.displayName}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div> */}
            </div>
            <button
              onClick={LogOUt}
              className="w-full text-left bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
