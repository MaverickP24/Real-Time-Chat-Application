import { useEffect, useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import LoginPage from './pages/LoginPage'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'

function App() {

  const {authUser,checkAuth, isCheckingAuth} =  useAuthStore();

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  console.log(authUser)



  if (isCheckingAuth && !authUser) return(
    <div className="flex items-center h-screen justify-center ">
      <Loader className='animate-spin size-10'/>
    </div>
  )


  return (
    <>

        <Navbar/>

        <Routes>
          <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/login"/>}></Route>
          <Route path='/signup' element={ !authUser ?  <SignUpPage/> : <Navigate to="/" /> }></Route>
          <Route path='/profile' element={authUser ? <ProfilePage/>  : <Navigate to="/login" />}></Route>
          <Route path='/settings' element={ <SettingsPage/> }></Route>
          <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to="/" />}></Route>
         
        </Routes>

        <Toaster/>

      
    </>
  )
}

export default App
