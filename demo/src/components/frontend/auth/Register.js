import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../layouts/frontend/Navbar'
import swal from 'sweetalert';
const Register = () => {
    let navigate = useNavigate()

    const [registerInput,setRegister] = useState({
        name:'',
        email:'', 
        password:'', 
        password2:'',
        error_list: []
    })
    const handleInput = (e) => {
        e.persist();
        setRegister({
            ...registerInput,
            [e.target.name] : e.target.value 
        })
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        const data = {
            name : registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
        }
        axios.get('/sanctum/csrf-cookie').then(res => {
            axios.post('/api/register',data).then(res => {
                if(res.data.status === 200){
                    localStorage.setItem('auth_token',res.data.token)
                    localStorage.setItem('auth_name',res.data.username)
                    swal("Success",res.data.message,'success')
                    navigate('/home')
                }else{
                    setRegister({...registerInput, error_list: res.data.validation_errors});
                }
            })
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

                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                        <form className="mx-1 mx-md-4" onSubmit={registerSubmit}>

                        <div className="d-flex flex-row align-items-center mb-3">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                            <input type="text" id="form3Example1c" name="name" placeholder="Username" className="form-control" onChange={handleInput}  />
                            <span className="badge bg-danger">{registerInput.error_list.name}</span>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-3">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                            <input type="email" name="email" id="form3Example3c" placeholder="Email" className="form-control" onChange={handleInput} value={registerInput.email} />
                           
                            <span className="badge bg-danger">{registerInput.error_list.email}</span>

                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-3">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                            <input type="password" name="password" id="form3Example4c" placeholder="Password" className="form-control" onChange={handleInput} value={registerInput.password}/>
                            <span className="badge bg-danger">{registerInput.error_list.password}</span>

                            </div>
                        </div>

                        

                        <div className="form-check d-flex justify-content-center mb-3">
                            <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                            <label className="form-check-label" htmlFor="form2Example3">
                            I agree all statements in <a href="#!">Terms of service</a>
                            </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="submit" className="btn btn-primary btn-lg">Register</button>
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

export default Register