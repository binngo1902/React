import React from 'react'
import {BrowserRouter as Router, Route, Routes,Navigate  } from 'react-router-dom'
import MasterLayout from './layouts/admin/MasterLayout';
import Home from './components/frontend/Home'
import Login from './components/frontend/auth/Login'
import Register from './components/frontend/auth/Register';
import axios from 'axios';
import AdminPrivateRoute from './AdminPrivateRoute'

axios.defaults.baseURL = "http://localhost/laravelreact/laravelreactapi/"
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('auth_token')
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  return config
})
axios.defaults.withCredentials = true

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="login" element={ localStorage.getItem('auth_token') ? <Navigate to='/'/> :<Login/>}/>
          <Route path="register" element={ localStorage.getItem('auth_token') ? <Navigate to='/'/> : <Register/>} />
          <Route path="/" element={<Home/>}/>
          <Route element={    <AdminPrivateRoute/>}>
            <Route  path="admin/*" name="Admin" element= {<MasterLayout/>}/>
          </Route>

         

        </Routes>
      </Router>
    </div>
  );
}

export default App;
