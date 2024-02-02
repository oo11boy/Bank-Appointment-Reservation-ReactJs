import React, { useContext, useEffect, useState } from 'react';
import { Space, Table, Popconfirm, message, Alert } from 'antd';
import { UserInfoContext } from '../../../ContextApi/UserinfoContext/UserInfoContext';
import { Link } from 'react-router-dom';

const ListTimes = (props) => {
  const {setCurrent}=props
  const userinfoC = useContext(UserInfoContext);
  const [userinfo, setuserinfo] = useState([]);
  const [rezerinfo, setrezervinfo] = useState([]);

  useEffect(() => {
    if (userinfoC.datauser) {
      setuserinfo(userinfoC.datauser);
    }
  }, [userinfoC.datauser]);

  useEffect(() => {
    if (userinfoC.datarezerv) {
      const userReservations = userinfoC.datarezerv.find((item) => item.user_id === userinfo.id);
      setrezervinfo(userReservations);
    }
  }, [userinfoC.datarezerv, userinfo]); // Add userinfo as a dependency

  const handleDelete = async (reservationId) => {
    try {
       await fetch(`http://localhost/Rez/api.php/reservations/${reservationId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      message.success('نوبت با موفقیت حذف شد');
      userinfoC.setdeleteitem(!userinfoC.deleteitem)
      // Consider fetching updated data after deletion
    } catch (error) {
      console.error('Error deleting reservation:', error);
      message.error('خطا در حذف نوبت');
    }
  };

  const columns = [
    {
      title: 'نام',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'نام خانوادگی',
      dataIndex: 'family',
      key: 'family',
    },
    {
      title: 'کد نوبت دهی',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'زمان رزرو',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'عملیات',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="آیا مطمئن هستید که می‌خواهید این نوبت را حذف کنید؟"
            onConfirm={() => handleDelete(rezerinfo && rezerinfo.user_id)}
            okText="بله"
            cancelText="خیر"
          >
            {rezerinfo && rezerinfo.user_id && <a>حذف نوبت</a>}
          </Popconfirm>
        </Space>
      ),
    },
  ];
console.log(userinfo)
  const data = [
    {
      key: 1,
      name: userinfo.name,
      family: userinfo.family,
      code: rezerinfo && rezerinfo.user_id,
      time: rezerinfo && rezerinfo.reserved_time,
    },
  ];

  return <><Table columns={columns} dataSource={data} /> <Alert className='newres' onClick={()=>{setCurrent('1')}} message="رزرو جدید"/></> 

  
};

export default ListTimes;
