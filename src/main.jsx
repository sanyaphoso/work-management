// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import './index.css'
import 'antd/dist/reset.css'

// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import { AuthProvider } from './context/AuthContext'
import HomePage from './pages/HomePage.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import UpdatePassword from './pages/UpdatePassword';
import Layout from './components/Layout'
import WorkspacePage from './pages/WorkspacePage.jsx'
import BoardPage from './pages/BoardPage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<Layout />}>
          <Route path="/home" element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          } />
          <Route path="/workspace/:id" element={
            <PrivateRoute>
              <WorkspacePage />
            </PrivateRoute>
          }/>
          <Route path="/board/:id" element={
            <PrivateRoute>
              <BoardPage />
            </PrivateRoute>
          }/>
        </Route>
        
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)
