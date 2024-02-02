// LoginStatus.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextLogin } from '../../ContextApi/ContextLogin/ContextLogin';

export default function LoginStatus({ children }) {
  const navi = useNavigate();
  const contextl = useContext(ContextLogin);

  if (contextl.islogin === false) {
    
    navi('../');
    contextl.setmassege('لطفا ابتدا وارد شوید.')
  }

  return children;
}