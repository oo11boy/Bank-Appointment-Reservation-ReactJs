import React, { useContext, useEffect, useState } from 'react'

import {  useNavigate } from 'react-router-dom';
import { ContextLogin } from '../../../ContextApi/ContextLogin/ContextLogin';

export default function Login() {
    const loginC=useContext(ContextLogin)
const navi=useNavigate()
  return (
   <>
   <form action="" onSubmit={(e)=>loginC.submithandler(e)}>
    ایمیل:
    <br /> <input onChange={(e)=>loginC.setemail(e.target.value)} type="text" placeholder='ایمیل خود را وارد نمایید...' />
    <br />
    رمز عبور:
    <br />
    <input type="password" onChange={(e)=>loginC.setpass(e.target.value)} placeholder='رمز عبور خود را وارد نمایید...' />
    <p>{loginC.massange}</p>
    <div className='loghome'>
 
       
        <input type="submit" onClick={(e)=>loginC.submithandler(e)} value="ورود" />
        <input type="submit" onClick={(event) => { event.preventDefault(); loginC.setsignstatus(true) }} value="ثبت نام" />
    </div>
</form>

<div type="submit" style={{padding:"15px",color:"white",cursor:"pointer",boxSizing:"unset!important"}} onClick={()=>navi('../adminlogin')} value="ورود ادمین" >ورود ادمین</div>

</>
  )
}
