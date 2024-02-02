import React, { useContext, useState } from 'react';
import { ContextLogin } from '../../../ContextApi/ContextLogin/ContextLogin';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [formData, setFormData] = useState({
    name: '',
    family: '',
    phone: '',
    email: '',
    password: ''
  });

const [mass,setnass]=useState('')
const Clogin=useContext(ContextLogin)

  const handleSubmit = async (e) => {
   
    e.preventDefault();
    const findmail=Clogin.datausers.find((item)=>item.phone===formData.phone || item.email===formData.email )

if(formData.email =="" || formData.family=="" || formData.name=="" || formData.password=="" || formData.phone==""){
  
}
 
if (formData.email === "" || formData.family === "" || formData.name === "" || formData.password === "" || formData.phone === "") {
  setnass('پر کردن تمام موارد خواسته شده الزامی است..')
}else{
  if(findmail){
    setnass('این شماره همراه یا ایمیل قبلا ثبت نام کرده است.')
  }
else{
  try {
    const response = await fetch('http://localhost/Rez/api.php/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(formData).toString(),
    });

    if (response.ok) {
      setnass('ثبت‌نام با موفقیت انجام شد. در حال انتقال به صفحه ورود...');
      
      setTimeout(() => {
        Clogin.setsignstatus(false)
        setnass('')
      }, 2000);
    } else {
      console.error('خطا در ثبت‌نام:', response.status);
    }
  } catch (error) {
    console.error('خطا در ارتباط با سرور:', error);
  }}
};
Clogin.setsigningo(!Clogin.signingo)
}


  return (
    <form onSubmit={handleSubmit}>
      {mass !="" &&   <p style={{backgroundColor:'black',color:"white", padding:"10px" ,borderRadius:"15px"}}>{mass}</p> 
  }
      <br />
      نام:
      <br />
      <input type="text"  placeholder='نام خود را وارد نمایید...' onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      <br />
      نام خانوادگی:
      <br />
      <input type="text"  placeholder='نام خانوادگی خود را وارد نمایید...' onChange={(e) => setFormData({ ...formData, family: e.target.value })} />
      <br />
       شماره همراه :
      <br />
      <input type="phone"  placeholder='شماره همراه خود را وارد نمایید...' onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
      <br />
      آدرس ایمیل :
      <br />
      <input type="email"  placeholder='ایمیل خود را وارد نمایید...' onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      <br />
       رمز عبور :
      <br />
      <input type="password"  placeholder='رمز عبور خود را وارد نمایید...' onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

      <div className='loghome'>
        <input type="submit" value="ثبت نام" />
      </div>
    </form>
  );
}
