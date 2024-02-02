import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContextLogin } from "../ContextLogin/ContextLogin";

export const UserInfoContext = createContext({
    datauser:()=>{},
    datarezerv:()=>{},
    setdatarezerv:()=>{},
    setdeleteitem:()=>{},
    deleteitem:()=>{}
})

export const UserInfoContextProvider = (props) => {
    const { children } = props
  
    const[deleteitem,setdeleteitem]=useState(false)

    const [datauser,setdatauser]=useState([])
     const [datarezerv,setdatarezerv]=useState([])
    const contextl=useContext(ContextLogin)
    useEffect(() => {
        const user = contextl.datausers.find((item) => item.email === contextl.emailuserlogin);
      
        if (user) {
          setdatauser(user);
        } else {
          setdatauser(null); // or setdatauser({}) depending on your requirements
        }
      }, [contextl.datausers, contextl.emailuserlogin]);
 


      useEffect(() => {
        const contentusers = async () => {
            try {
                const res = await fetch(`http://localhost/Rez/api.php/reservations`);
                const data = await res.json();
                setdatarezerv(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        contentusers(); // Call the async function immediately

    },[deleteitem]);

    const vals = {
        datauser,
        datarezerv,
        setdatarezerv,
        setdeleteitem,
        deleteitem
    }
    return <UserInfoContext.Provider value={vals}>{children}</UserInfoContext.Provider>
}