import {
  createBrowserRouter,
} from "react-router";
import Root from "./Layout/Root";
import Register from "./Authenticate/Register";
import Login from "./Authenticate/Login";
import DashboardLayout from "./Layout/DashboardLayout";
import Auth from "./Layout/Auth";
import Home from "./Page/Home/Home";
import About from "./Page/About/About";
import MemberShip from "./Page/MemberShip/MemberShip";
import MakeAnnouncement from "./Page/DashBoard/MakeAnnouncement";
import AddPost from "./Page/DashBoard/AddPost";

import MyPosts from "./Page/DashBoard/MyPosts";
import MyProfile from "./Page/DashBoard/MyProfile";
import AdminProfile from "./Page/DashBoard/AdminProfile";
import ManageUsers from "./Page/DashBoard/ManageUsers";
import PostDetails from "./Share/PostDetails";
import ReportedComments from "./Page/DashBoard/ReportedComments";

 export const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    children:[
     {index:true,
  Component:Home},
   {path:"about",Component:About},
   {path:"/post/:id",Component:PostDetails},
   {path:"memberShip",element:<MemberShip></MemberShip>}
    ]
  },
   {path:"auth",Component:Auth,
    children:[
  {path:"login",Component:Login},
  {path:"register",Component:Register},
    ]
   },
{ path:"dashboardLayout",Component:DashboardLayout,
  children:[
    {path:"adminProfile",Component:AdminProfile},
    {path:"makeAnnouncement",Component:MakeAnnouncement},
    {path:"manageUsers",  Component:ManageUsers},
    {path:"reportedComments",Component:ReportedComments},
    // user
    {path:"addPost",
      Component:AddPost},
    {path:"myPosts",
      Component:MyPosts},
    {path:"myProfile",
      Component:MyProfile}
   ]
}
]);