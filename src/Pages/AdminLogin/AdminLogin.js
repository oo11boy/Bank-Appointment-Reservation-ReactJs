import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ContextLogin } from '../../ContextApi/ContextLogin/ContextLogin';
import { Api } from '../../Api';



export default function AdminLogin() {
    const navi = useNavigate()
    const [dataadmin, setdataadmin] = useState([])
    const [username, setusername] = useState('')
    const [pass, setpass] = useState('')
    const [mas, setmass] = useState('')
   const loginstatus=useContext(ContextLogin)
    useEffect(() => {

        const dataadmins = async () => {
            try {
                const res = await fetch(`${Api}admins`)
                const data = await res.json()

                setdataadmin(data)

            }

            catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        dataadmins();
    }, [])
    const sumbithandler = (event) => {
        event.preventDefault()
        const finduser = dataadmin.find((item) => item.username == username && item.password == pass)
        if (finduser) {
            navi('../admindashboard')
            loginstatus.setadminlogin(true)
        } else {
            setmass('نام کاربری یا رمز عبور اشتباه است.')
        }
    }
    return (
        <div className='Home'>

            <div className='formhome'>
                {mas != '' && <p>{mas}</p>}
                <form action="" onSubmit={sumbithandler}>
                    نام کاربری:
                    <br /> <input type="text" onChange={(e) => setusername(e.target.value)} placeholder='نام کاربری خود را وارد نمایید...' />
                    <br />
                    رمز عبور:
                    <br />
                    <input type="password" onChange={(e) => setpass(e.target.value)} placeholder='رمز عبور خود را وارد نمایید...' />

                    <div className='loghome'>


                        <input type="submit" value="ورود" />
                        <input type="submit" onClick={() => { navi('../') }} value="ورود اعضا" />
                    </div>
                </form>
            </div>
        </div>
    )
}
