import Navbar from '../../../layouts/frontend/Navbar'
import React, { useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    let navigate = useNavigate()

    const [loginInput,setLogin] = useState({
        email : "",
        password: "",
        error_list: [],
    })

    const handleInput = (e) => {
        e.persist()
        setLogin({...loginInput,[e.target.name] : e.target.value})
    }

    const loginSubmit = (e) => {
        e.preventDefault()
        const data = {
            email : loginInput.email,
            password : loginInput.password,
        }

        axios.post('api/login',data).then(res => {
            if(res.data.status === 200){
                localStorage.setItem('auth_token',res.data.token)
                localStorage.setItem('auth_name',res.data.username)
                swal("Success",res.data.message,'success')
                navigate('/')
            }else if(res.data.status === 401){
                swal("Warning",res.data.message,'warning')
            }else{
                setLogin({...loginInput,error_list : res.data.validation_errors})
            }
        })

    }


    return (
    <div>
        <Navbar/>
        <section className="vh-100" style={{backgroundColor: '#eee'}}>
        <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                 <div className="col-lg-12 col-xl-11">
                <div className="card text-black" style={{borderRadius: '25px'}}>
                <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

                        <form className="mx-1 mx-md-4" onSubmit={loginSubmit}>


                        <div className="d-flex flex-row align-items-center mb-3">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                            <input type="email" name="email" placeholder="Email" onChange={handleInput} id="form3Example3c" className="form-control" />
                            <span className="badge bg-danger">{loginInput.error_list.email}</span>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-3">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                            <input type="password" name="password" placeholder="Password" onChange={handleInput} id="form3Example4c" className="form-control" />
                            <span className="badge bg-danger" >{loginInput.error_list.password}</span>

                            </div>
                        </div>

                       

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="submit"  className="btn btn-primary btn-lg">Login</button>
                        </div>

                        </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid" alt="Sample image"/>

                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
         </section>
        </div>

    )
}

export default Login