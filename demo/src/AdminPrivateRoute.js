import axios from 'axios';
import React, { useState, useEffect } from 'react'
import {Route,Navigate,Outlet, useNavigate} from 'react-router-dom'
import swal from 'sweetalert';
import MasterLayout from './layouts/admin/MasterLayout';

function AdminPrivateRoute({...rest}) {
    let navigate = useNavigate();
    const [Authenticated,setAuthenticated] = useState(false);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        axios.get('/api/checkingAuthenticated').then(res => {
            if (res.status === 200){
                console.log('1')
                setAuthenticated(true);
            }
            setLoading(false);

        })
        
        return () => {
            console.log('4')
            setAuthenticated(false)
        }
    },[])
   
    axios.interceptors.response.use(undefined,function axiosRetryInterceptor(err){
        if(err.response.status === 401){
            swal('Unauthorized',err.response.data.message,'warning');
            navigate('/');
        }
        return Promise.reject(err);
    });
    if (loading){
        console.log("3")
        return <h1>Loading...</h1>;
    }
    console.log('2')
   
    return <Outlet/>; 
 
}

export default AdminPrivateRoute