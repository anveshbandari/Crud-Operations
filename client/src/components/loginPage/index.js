import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert'
import axios from 'axios'

import './index.css'

const Login = () => {
    const navigate = useNavigate(); 
    const [data, setData] = useState({
        email: "",
        password: "",
    })

    const [error, setError] = useState('');


    const changeHandler = (event) => {
        setData({...data, [event.target.id]: event.target.value})
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (email.slice(-10) !== ("@gmail.com")) {
            swal({
                text:"Please enter a valid email",
                icon:'warning'
            })
        } else {
            axios.post('http://localhost:4000/login',{email,password}).then(result=>{
            navigate('Home');
        }).catch(err=>{
            console.log(err)
            setError('Incorrect Email or Password*');
        })
        }
    }

    const {email, password} = {...data}
    return(
        <div className='bg-container'>
        <div className='login-container'>
            <h1 className='title'>Login</h1>
            <form  onSubmit={submitHandler}>
                <div className='label-container'>
                    <label className='login-labels' htmlFor='email'>Email</label> 
                    <input
                    className='login-inputs'
                    id="email"
                    value={email}
                    type="email"
                    onChange={changeHandler}
                    required
                    />
                </div>
                <div className='label-container'>
                    <label className='login-labels' htmlFor='password'>Password</label>
                    <input
                    className='login-inputs'
                    id="password"
                    value={password}
                    type="password"
                    onChange={changeHandler}
                    required
                    />
                </div>
                {error && <p className='errMsg'>{error}</p>}
                <div className='button-container'>
                    <button className='button'>LogIn</button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Login