

import Home from "./Pages/Home/Home";
import LoginStatus from "./Pages/LoginStatus/LoginStatus";
import UserDashboard from "./Pages/UserDashboard/UserDashboard";

export let BankRoutes=[

    {path:'/' , element:<UserDashboard/>},
    {path:'/userdashboard' , element:<LoginStatus><UserDashboard/></LoginStatus>},
]