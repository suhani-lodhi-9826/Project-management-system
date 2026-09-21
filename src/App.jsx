import { useState } from 'react'
import './App.css'
import { Routes , Route} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './routes/ProtectedRoute'
import DashboardHome from './components/Admin/DashboardHome'
import Projects from './components/Admin/Projects'
import Users from './components/Admin/Users'
import AddProject from './components/Admin/AddProject'
import Dashboardhome from './components/Member/Dashboardhome'
import Task from './components/Member/Task'
import NotFound from './pages/NotFound'
import ViewProject from './components/Member/ViewProject'
import ViewTask from './components/Member/ViewTask'
import UserDetails from './components/Admin/UserDetails'
import Profile from './components/Member/Profile'

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
            <Route path="add-project" element={<AddProject/>} />
            <Route path="edit-project/:id" element={<AddProject/>} />
            <Route path="user-details/:id" element={<UserDetails />} />
          </Route>

          <Route path="/user/dashboard" element={
            <ProtectedRoute allowedRole="MEMBER">
              <Dashboard />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboardhome />}/>
            <Route path="tasks" element={<Task/>}/>
            <Route path="profile" element={<Profile />} />
            <Route path="project/:id" element={<ViewProject/>} />
            <Route path="task/:id" element={<ViewTask/>} />
          </Route>

          <Route path='/*' element={<NotFound />} /> 
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
