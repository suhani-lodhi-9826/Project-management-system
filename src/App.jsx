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
import AddProject from './components/Admin/AddProject'
import Dashboardhome from './components/Member/Dashboardhome'
import Task from './components/Member/Task'

function App() {


  return (
    <>
  
       <Routes>
          <Route path='/login'  element={<Login />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRole="ADMIN">
              <Dashboard />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardHome/>} />
            <Route path="projects" element={<Projects/>}/>
            <Route path="users" element={<Users />} />
            <Route path="teams" element={<Teams />} />
            <Route path="add-project" element={<AddProject/>} />
            <Route path="edit-project/:id" element={<AddProject/>} />
          </Route>

          <Route path="/user/dashboard" element={
            <ProtectedRoute allowedRole="MEMBER">
              <Dashboard />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboardhome />}/>
            <Route path="tasks" element={<Task/>}/>
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
