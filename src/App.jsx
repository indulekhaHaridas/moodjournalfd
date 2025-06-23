import { Route, Routes } from 'react-router-dom'
import './App.css'
import Preloader from './components/Preloader'
import { useEffect, useState } from 'react'
import Auth from './pages/Auth'
import PagenotFound from './pages/PagenotFound'
import Home from './users/pages/Home'
import Journal from './users/pages/Journal'
import Analysis from './users/pages/Analysis'
import Contact from './users/pages/Contact'
import Profile from './users/pages/Profile'
import AdminDashBoard from './Admin/pages/AdminDashBoard'
import AdminUsers from './Admin/pages/AdminUsers'
import AdminJournalEntries from './Admin/pages/AdminJournalEntries'
import AdminMoodAnalytics from './Admin/pages/AdminMoodAnalytics'
function App() {
  const [isloading, setIsLoading] = useState(false)
  useEffect(
    () => {
      setTimeout(() => {
        setIsLoading(true)
      }, 7000)
    }, [])
  return (
    <>
   <Routes>
    <Route path='/' element={isloading ? <Home /> : <Preloader />} />
    <Route path='/login' element={<Auth />}/>
    <Route path='/register' element={<Auth />}/>
    <Route path='/journal' element={<Journal />}/>
    <Route path='/analysis' element={<Analysis />}/>
    <Route path='/contact' element={<Contact />}/>
    <Route path='/profile' element={<Profile />}/>
    <Route path='/admin-dashboard' element={<AdminDashBoard/>}/>
    <Route path='/admin-users' element={<AdminUsers/>}/>
    <Route path='/admin-journal' element={<AdminJournalEntries/>}/>
     <Route path='/admin-moodanalysis' element={<AdminMoodAnalytics/>}/>
    <Route path='*' element={<PagenotFound />}/>
   </Routes>
    </>
  )
}

export default App
