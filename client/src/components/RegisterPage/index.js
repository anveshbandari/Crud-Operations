import axios from 'axios'
import React , {useState} from 'react'
import swal from 'sweetalert'
import { useNavigate  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
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
        // navigate("/Home?status=register")

        if(contact.length!==10){
            swal({
                text:"contact must be 10 digits",
                icon:'warning',
            })
            // eslint-disable-next-line
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
                navigate('/Home?status=Registered')
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
        <div className='bg-dark py-3'>
            <div className='container d-flex justify-content-center'>
                <div className='text-white h3'>REGISTER PAGE</div>
            </div>
        </div>
        <div className='bgHome-container'>
            <form className='form-container' onSubmit={onSubmitHandler}>
                {/* <div className='heading d-flex justify-content-center'>
                    <h1 className='home-heading'>Register Details</h1>
                </div> */}
                <div className='label-container'>
                    <label className='label-elements' htmlFor='lastName'>Full  Name</label>
                    <input
                    className='login-inputs'
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
                    className='login-inputs'
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
                    className='login-inputs'
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
                    className='login-inputs'
                    id='address'
                    value={address}
                    onChange={onChangeHandler}
                    type="text"
                    required
                    />
                </div>
                <div className='d-flex justify-content-center my-5'>
                    <button className='btn btn-primary'>Submit</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Register 