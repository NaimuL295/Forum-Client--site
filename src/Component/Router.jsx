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

 export const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    children:[
     {index:true,
  Component:Home},
   {path:"about",Component:About}
    ]
  },
   {path:"auth",Component:Auth,
    children:[
      {path:"login",Component:Login},
  {path:"register",Component:Register},
    ]
   },
  

{ path:"dashboardLayout",Component:DashboardLayout
}

]);

