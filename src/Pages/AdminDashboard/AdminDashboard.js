import { Table, TableBody, TableHead, Paper, TableCell, TableContainer, TableRow } from '@mui/material';
import React, { useContext, useState } from 'react';
import { UserInfoContext } from '../../ContextApi/UserinfoContext/UserInfoContext';
import { ContextLogin } from '../../ContextApi/ContextLogin/ContextLogin';
import './AdminDashboard.css';
import { yellow } from '@mui/material/colors';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IoExit } from 'react-icons/io5';

export default function AdminDashboard() {
  const datarez = useContext(UserInfoContext);
  const datausers = useContext(ContextLogin);
  const [searchedUserId, setSearchedUserId] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
const navi=useNavigate(false)
  const filteredData = datarez.datarezerv.filter((item) => {
    return searchedUserId === '' || item.user_id == searchedUserId;
  });

  const handleSearch = (event) => {
    setSearchedUserId(event.target.value);
  };

  const handleDelete = (id) => {
    setOpenDialog(true);
    setDeleteItemId(id);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    datarez.handleDelete(deleteItemId);
    setOpenDialog(false);
  };

  return (
    datausers.adminlogin ?<>
      <div className='tcontainer'>
  
      <div className='searching'>
        <input type="text" placeholder="جستجو بر اساس کد" onChange={handleSearch} />
   <div onClick={()=>datausers.setadminlogin(false)}><IoExit/></div>
      </div>
      <TableContainer className='TableContainer' component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>کد</TableCell>
              <TableCell align="right">نام و نام خانوادگی</TableCell>
              <TableCell align="right">شماره همراه</TableCell>
              <TableCell align="right">ایمیل</TableCell>
              <TableCell align="right">نوبت</TableCell>
              <TableCell align="right">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{item.user_id}</TableCell>
                <TableCell align="right">
                  {datausers.datausers.find((itemuser) => itemuser.id === item.user_id)?.name} {datausers.datausers.find((itemuser) => itemuser.id === item.user_id)?.family}
                </TableCell>
                <TableCell align="right">
                  {datausers.datausers.find((itemuser) => itemuser.id === item.user_id)?.phone}
                </TableCell>
                <TableCell align="right">
                  {datausers.datausers.find((itemuser) => itemuser.id === item.user_id)?.email}
                </TableCell>
                <TableCell align="right">{item.reserved_time}</TableCell>
                <TableCell align="right" className='deletecell' style={{ cursor: 'pointer' }} onClick={() => handleDelete(item.user_id)}>
                  حذف
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>هشدار!</DialogTitle>
        <DialogContent>آیا می خواهید این آیتم را حذف کنید؟</DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleDialogClose}>خیر</Button>
          <Button variant="contained" color="error" onClick={handleConfirmDelete}>بله</Button>
        </DialogActions>
      </Dialog>
    </div>
      </>:navi('../adminlogin')
 
  );
}
