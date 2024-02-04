import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContextLogin } from "../ContextLogin/ContextLogin";
import { Space, Table, Popconfirm, message, Alert } from 'antd';
import { Api } from "../../Api";
export const UserInfoContext = createContext({
    datauser:()=>{},
    datarezerv:()=>{},
    setdatarezerv:()=>{},
    setdeleteitem:()=>{},
    deleteitem:()=>{},
    handleDelete:()=>{}
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
                const res = await fetch(`${Api}reservations`);
                const data = await res.json();
                setdatarezerv(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        contentusers(); // Call the async function immediately

    },[deleteitem]);


    const handleDelete = async (reservationId) => {
        try {
           await fetch(`${Api+reservationId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          message.success('نوبت با موفقیت حذف شد');
          setdeleteitem(!deleteitem)
          // Consider fetching updated data after deletion
        } catch (error) {
          console.error('Error deleting reservation:', error);
          message.error('خطا در حذف نوبت');
        }
      };
    
    
    const vals = {
        datauser,
        datarezerv,
        setdatarezerv,
        setdeleteitem,
        deleteitem,
        handleDelete
    }
    return <UserInfoContext.Provider value={vals}>{children}</UserInfoContext.Provider>
}