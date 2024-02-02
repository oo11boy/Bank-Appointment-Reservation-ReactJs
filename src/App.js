import React from 'react'
import { useRoutes } from 'react-router-dom'
import { BankRoutes } from './BankRoutes'
import './App.css'
import { ContextLoginProvider } from './ContextApi/ContextLogin/ContextLogin'
import { UserInfoContextProvider } from './ContextApi/UserinfoContext/UserInfoContext'

export default function App() {
  const RouteBank=useRoutes(BankRoutes)
  
  return (
    <ContextLoginProvider>
      <UserInfoContextProvider>
  <>
      {RouteBank}
      </> 
      </UserInfoContextProvider>
    </ContextLoginProvider>
  )
}
