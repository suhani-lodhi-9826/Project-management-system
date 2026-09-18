import { useState } from 'react'
import './App.css'
import { Routes , Route} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './routes/ProtectedRoute'
import DashboardHome from './components/Admin/DashboardHome'
import Projects from './components/Admin/Projects'
import Users from './components/Admin/Users'
import Teams from './components/Admin/Teams'

function App() {


  return (
    <>
  
       <Routes>
          <Route path='/login'  element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardHome/>} />
            <Route path="projects" element={<Projects/>}/>
            <Route path="users" element={<Users />} />
            <Route path="teams" element={<Teams />} />
          </Route>
       </Routes>

       
        {/* <Routes>
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
   
        </Routes> */}
    
    </>
  )
}

export default App
