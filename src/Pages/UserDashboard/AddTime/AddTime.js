import React, { useContext, useEffect, useState } from 'react';
import jalaliMoment from 'jalali-moment';
import './AddTime.css';
import { UserInfoContext } from '../../../ContextApi/UserinfoContext/UserInfoContext';
import { Alert } from 'antd';

export default function AddTime() {
  const [timerez, settimerez] = useState('');
  const [errorMessage, setErrorMessage] = useState([]);
  const uinfocontext = useContext(UserInfoContext);
  const [seealltimes,setseealltimes]=useState(false)
 const [userinfo,setuserinfo]=useState('')
const [dayend,setdayend]=useState(false)
 useEffect(() => {
  setuserinfo(uinfocontext.datauser)
 }, [uinfocontext.datauser]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const reservedDateElement = document.getElementById('reserved_date');
    const reservedHourElement = document.getElementById('reserved_hour');
    const reservedMinuteElement = document.getElementById('reserved_minute');

    const selectedDate = reservedDateElement.value === 'امروز' ? jalaliMoment() : jalaliMoment().add(1, 'day');
    const selectedHour = parseInt(reservedHourElement.value, 10);
    const selectedMinute = parseInt(reservedMinuteElement.value, 10);

    const formattedDate = selectedDate
      .set('hour', selectedHour)
      .set('minute', selectedMinute)
      .format('jYYYY-jMM-jDD HH:mm:ss');
    const selectedDateValue = reservedDateElement.value;
  
    const userHasReservation = uinfocontext.datarezerv.some((item) => item.user_id === userinfo.id);
 
    const currentJalaliHour = jalaliMoment().hour();
    currentJalaliHour >= 12 &&  setdayend(true)
    if (selectedDateValue === 'امروز' && currentJalaliHour >= 12) {
      setErrorMessage('تایم کاری امروز به پایان رسیده است. لطفاً زمان دیگری برای مراجعه انتخاب کنید.');
   
      return; // Stop further execution
    } else {
      if (userHasReservation) {
        setErrorMessage('شما قبلا یک بار رزرو کرده اید برای رزرو جدید ابتدا از قسمت رزرو ها نوبت قبلی خود را حدف کنید سپس دوباره اقدام نمایید.');
      } else {
        const data = {
          user_id:userinfo.id,
          reserved_time: formattedDate,
        };

        const timelist = uinfocontext.datarezerv.map((item) => item.reserved_time);

        const isTimeValid = timelist.every((time) => {
          const diff = jalaliMoment(formattedDate).diff(jalaliMoment(time), 'minutes');
          return Math.abs(diff) >= 10;
        });
     
        if (!isTimeValid) {
          setErrorMessage('محدوده زمانی 10 دقیقه رعایت نشده است،لطفا در هنگام انتخاب زمان 10 دقیقه با رزرو های دیگر کاربران فاصله داشته باشید');
          setseealltimes(true)
        } else {
          try {
            const response = await fetch('http://localhost/Rez/api.php/reservations', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: new URLSearchParams(data).toString(),
            });

            if (response.ok) {
              setErrorMessage(`نوبت با موفقیت ثبت شد. نوبت رزرو شده: ${formattedDate}`);
              // Add the new reservation to the context or handle it as needed
              const newReservation = { user_id: userinfo.id, reserved_time: formattedDate };
              uinfocontext.setdatarezerv([...uinfocontext.datarezerv, newReservation]);
            } else {
              console.error('خطا در ثبت‌نام:', response.status);
            }
          } catch (error) {
            console.error('خطا در ارتباط با سرور:', error);
          }
        }
      }
    }
  };

  const [todayReservations, setTodayReservations] = useState([]);
  const [tomorrowReservations, setTomorrowReservations] = useState([]);

  useEffect(() => {
    // Filter reservations for today
    const todayReservations = uinfocontext.datarezerv.filter((item) => {
      const today = jalaliMoment().format('jYYYY-jMM-jDD');
      const reservationDate = jalaliMoment(item.reserved_time, 'jYYYY-jMM-jDD HH:mm:ss').format('jYYYY-jMM-jDD');
      return today === reservationDate;
    });

    setTodayReservations(todayReservations);

    // Filter reservations for tomorrow
    const tomorrowReservations = uinfocontext.datarezerv.filter((item) => {
      const tomorrow = jalaliMoment().add(1, 'day').format('jYYYY-jMM-jDD');
      const reservationDate = jalaliMoment(item.reserved_time, 'jYYYY-jMM-jDD HH:mm:ss').format('jYYYY-jMM-jDD');
      return tomorrow === reservationDate;
    });

    setTomorrowReservations(tomorrowReservations);
  }, [uinfocontext.datarezerv]);

  return (
    <form onSubmit={handleSubmit} className="AddTime">

      <label htmlFor="reserved_date">تاریخ رزرو:</label>
      <select className="form-control" name="reserved_date" id="reserved_date" required defaultValue="انتخاب نمایید">
        <option>انتخاب نمایید</option>
        <option>امروز</option>
        <option>فردا</option>
      </select>


      <label htmlFor="reserved_hour">ساعت رزرو (بین 7 تا 12) </label>
<select className="form-control" name="reserved_hour" id="reserved_hour" required>
  <option value="7">7</option>
  <option value="8">8</option>
  <option value="9">9</option>
  <option value="10">10</option>
  <option value="11">11</option>
  <option value="12">12</option>
</select>

      <label htmlFor="reserved_minute">دقیقه رزرو (بین 0 تا 59) </label>
  
<select className="form-control" name="reserved_minute" id="reserved_minute" required>
  <option value="0">0</option>
  <option value="10">10</option>
  <option value="20">20</option>
  <option value="30">30</option>
  <option value="40">40</option>
  <option value="50">50</option>
</select>

      <div className="text-center">
        <button type="submit" className="btn btn-primary">رزرو</button>
      </div>

      {/* نمایش تاریخ */}
      {timerez && (

        <div>
             
          <p>تاریخ ذخیره شده: {timerez}</p>

        </div>
      )}
      {errorMessage !='' && (
 <Alert className='messagealert' type="info" message={
  <>
   <div className="text-danger">{errorMessage}</div>
   
   {seealltimes && <>
       
       {
         dayend==false && <div>
         <h3>تمام تایم‌های رزرو شده امروز</h3>
         <ul>
           {todayReservations.map((reservation, index) => (
             <li key={index}>{reservation.reserved_time}</li>
           ))}
         </ul>
       </div>}
       <div>
         <h3>تمام تایم‌های رزرو شده فردا</h3>
         <ul>
           {tomorrowReservations.map((reservation, index) => (
             <li key={index}>{reservation.reserved_time}</li>
           ))}
         </ul>
       </div></>}
      
  </>
 } >
<>
       


       

        </>
        </Alert>
      )}
    </form>
  );
}
