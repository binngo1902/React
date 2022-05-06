import axios from 'axios'
import React from 'react'
import {Link} from 'react-router-dom'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    let navigate = useNavigate()


    const logoutSubmit = (e) =>{
        e.preventDefault()
        axios.post('/api/logout').then(res => {
            if(res.data.status === 200){
                localStorage.removeItem('auth_token')
                localStorage.removeItem('auth_name')
                swal("Success",res.data.message,'success')
                navigate('/')
            }
        })
    }

    var AuthButtons = '';
    if (!localStorage.getItem('auth_token')){
        AuthButtons = (
            <ul className="nav navbar-nav navbar-right">
            <li><Link className="dropdown-item" to="/register">Sign up</Link></li>
            <li><Link className="dropdown-item" to="/login">Login</Link></li>
            </ul>
        )
    }else{
        AuthButtons = (
            <ul className="nav navbar-nav navbar-right">
            <li><Link className="dropdown-item" onClick={logoutSubmit} to="/login">Logout</Link></li>
            </ul>
        )
    }


    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
    <Link className="navbar-brand" to="#">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="#">Link</Link>
        </li>
        <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
            </Link>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item" to="#">Action</Link></li>
            <li><Link className="dropdown-item" to="#">Another action</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li><Link className="dropdown-item" to="#">Something else here</Link></li>
            </ul>
        </li>
        <li className="nav-item">
            <Link className="nav-link disabled" to="#">Disabled</Link>
        </li>
        </ul>
        {AuthButtons}
     
    </div>
    </div>
</nav>
  )
}

export default Navbar