import React, { useContext, useEffect, useState } from 'react';
import { AntDesignOutlined, AppstoreOutlined, LoginOutlined, MailOutlined, SettingOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Switch } from 'antd';
import './userDashboard.css'
import AddTime from './AddTime/AddTime';
import ListTimes from './ListTimes/ListTimes';
import ProfileEdit from './ProfileEdit/ProfileEdit';
import { RiReservedFill } from "react-icons/ri";
import { ContextLogin } from '../../ContextApi/ContextLogin/ContextLogin';
import { UserInfoContext } from '../../ContextApi/UserinfoContext/UserInfoContext';
import { IoIosAddCircle } from "react-icons/io";
import { IoInformation, IoInformationCircle, IoInformationOutline, IoSettingsSharp } from "react-icons/io5";
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('سیستم رزرو نوبت', 'sub1', <MailOutlined />, [

        getItem('رزرو نوبت جدید', '1'),

    ]),
    getItem('رزرو ها', 'sub2', <AppstoreOutlined />, [
        getItem(' مشاهده و ویرایش', '2'),
    ]),
    getItem('اطلاعات من', 'sub4', <UserOutlined />, [
        getItem('مشاهده اطلاعات', '3'),

    ]),
];

const UserDashboard = () => {
    const [theme, setTheme] = useState('dark');
    const [current, setCurrent] = useState('1');
    const changeTheme = (value) => {
        setTheme(value ? 'dark' : 'light');
    };
    const onClick = (e) => {
       
        setCurrent(e.key);
    };

    const userinfoC = useContext(UserInfoContext)

    const contextl = useContext(ContextLogin)
    return (
        <div className='Dashuser'>
            <div className='menu'>
                <div className='profile'>
                    <Avatar

                        icon={<AntDesignOutlined />}
                    />
                    <p>{userinfoC.datauser && userinfoC.datauser.name + ' ' + userinfoC.datauser.family}</p>
                    <p className='exit' onClick={() => contextl.setislogin(false)}><LoginOutlined /></p>

                </div>
                <Menu
                    theme={theme}
                    onClick={onClick}
                    style={{
                        width: 256,
                        minHeight: '85vh'
                    }}
                    defaultOpenKeys={['sub1']}
                    selectedKeys={[current]}
                    mode="inline"
                    items={items}
                />
            </div>

            <div className='headermobile'>

                <Avatar

                    icon={<AntDesignOutlined />}
                />
                <p>{userinfoC.datauser && userinfoC.datauser.name + ' ' + userinfoC.datauser.family}</p>
                <p className='exit' onClick={() => contextl.setislogin(false)}><LoginOutlined /></p>


            </div>
            <div className='mobilemenu'>
                <div onClick={() => { setCurrent('2') }}><RiReservedFill /></div>
                <div onClick={() => { setCurrent('1') }}> <IoIosAddCircle /></div>
                <div onClick={() => { setCurrent('3') }}><UserOutlined /></div>
            </div>
            <div className='contentuserdash'>
                {current === '1' && <AddTime />}
                {current === '2' && <ListTimes setCurrent={setCurrent} />}
                {current === '3' && <ProfileEdit />}
            </div>

        </div>
    );
};
export default UserDashboard;