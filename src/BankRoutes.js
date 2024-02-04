

import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import AdminLogin from "./Pages/AdminLogin/AdminLogin";
import Home from "./Pages/Home/Home";
import LoginStatus from "./Pages/LoginStatus/LoginStatus";
import UserDashboard from "./Pages/UserDashboard/UserDashboard";

export let BankRoutes=[

    {path:'/' , element:<Home/>},
    {path:'/adminlogin' , element:<AdminLogin/>},
    {path:'/userdashboard' , element:<LoginStatus><UserDashboard/></LoginStatus>},
    {path:'/AdminDashboard' , element:<LoginStatus><AdminDashboard/></LoginStatus>},
]