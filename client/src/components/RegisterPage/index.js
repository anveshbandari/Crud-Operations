import axios from 'axios'
import React , {useState} from 'react'
import swal from 'sweetalert'
import { useNavigate } from "react-router-dom";
import './index.css'


const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
       
        name: '',
        contact: '',
        email: '',
        address: '',
    })


    const onChangeHandler = (event) => {
        setData({...data, [event.target.id]: event.target.value})
        if (event.target.id === "name") {
            const nameInput = event.target.value;
            const onlyLettersAndSpaces = nameInput.replace(/[^a-zA-Z\s]/g, '');
            setData({ ...data, name: onlyLettersAndSpaces });
        }
        if (event.target.id === "contact") {
            const contactInput = event.target.value;
            const onlyNums = contactInput.replace(/[^0-9]/g, '');
            setData({ ...data, contact: onlyNums });
        }
    }

    
    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(contact.length!==10){
            swal({
                text:"contact must be 10 digits",
                icon:'warning',
            })
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            swal({
                text:"please enter a valid email",
                icon:'warning'
            })
        } else{
            axios.post('http://localhost:4000/student/register',{
            name,
            contact,
            email,
            address
        }).then(res=>{
            swal({
                title: "Student Added!",
                text:"Student registered successfully",
                icon:'success',
                button:'Goto Home'
            }).then(()=>{
                navigate('/Home')
            })
        }).catch(err=>{
            const erorMessage =err.response.data?.message
            swal({
                text:erorMessage?erorMessage:"Something went wrong!",
                icon:'error'
            })
        })
        }
    }

    const {name,contact,email,address} = {...data}
    return (
        <>
        <div className='bgHome-container'>
            <h1 className='home-heading'>Enter Details</h1>
            <form className='form-container' onSubmit={onSubmitHandler}>
                <div className='label-container'>
                    <label className='label-elements' htmlFor='lastName'>Full  Name</label>
                    <input
                    className='register-inputs'
                    id='name'
                    value={name}
                    onChange={onChangeHandler}
                    type="text"
                    required
                    />
                </div>
                <div className='label-container'>
                    <label className='label-elements' htmlFor='phoneNo'>Contact</label>
                    <input
                    className='register-inputs'
                    id='contact'
                    value={contact}
                    onChange={onChangeHandler}
                    type="text"
                    maxLength={10}
                    required
                    />
                </div>
                <div className='label-container'>
                    <label className='label-elements' htmlFor='email'>Email</label>
                    <input
                    className='register-inputs'
                    id='email'
                    value={email}
                    onChange={onChangeHandler}
                    type="email"
                    required
                    />
                </div>
                <div className='label-container'>
                    <label className='label-elements' htmlFor='address'>Address</label>
                    <input
                    className='register-inputs'
                    id='address'
                    value={address}
                    onChange={onChangeHandler}
                    type="text"
                    required
                    />
                </div>
                <div className='btn-container'>
                    <button className='home-button'>Submit</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Register 