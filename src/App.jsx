import { useState } from 'react'
import './App.css'
import { Routes , Route} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './routes/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'


function App() {


  return (
    <>
  
       <Routes>
          <Route path='/login'  element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
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
