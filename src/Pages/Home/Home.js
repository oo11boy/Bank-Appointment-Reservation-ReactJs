import React, { useContext, useState } from 'react'
import './Home.css'

import { ContextLogin } from '../../ContextApi/ContextLogin/ContextLogin'
import Login from './Login/Login'
import SignIn from './SignIn/SignIn'
export default function Home() {
const logincontext=useContext(ContextLogin)
    return (
        <div className='Home'>

            <div className='formhome'>
                {logincontext.signstatus==false &&   <Login/>}
             
                {logincontext.signstatus==true && <SignIn/> }

            </div>
        </div>
    )
}
