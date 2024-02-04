import React, { useContext } from 'react'
import { UserInfoContext } from '../../../ContextApi/UserinfoContext/UserInfoContext'

export default function ProfileEdit() {
  const info=useContext(UserInfoContext)
  return (
    <div style={{backgroundColor:"#001529",color:"white",padding:"20px",borderRadius:"15px"}}>
      <div className='itemprofile'>
نام: {info.datauser.name}
</div>
<br />
<div className='itemprofile'>
نام خانوادگی: {info.datauser.family}
</div>
<br />
<div className='itemprofile'>
شماره همراه: {info.datauser.phone}
</div>

<br/>
<div className='itemprofile'>
ایمیل: {info.datauser.email}
</div>
<br />
<div className='itemprofile'>
رمز عبور: ****
</div>
<br />
    </div>
  )
}
