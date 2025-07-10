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

 export const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    children:[
     {index:true,
  Component:Home},
   {path:"about",Component:About},
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
   {path:"makeAnnouncement",Component:MakeAnnouncement},
    // user

    {path:"addPost",
      Component:AddPost},
    {path:"myPosts",Component:MyPosts},
    {path:"myProfile",Component:MyProfile}
   ]
}
]);

