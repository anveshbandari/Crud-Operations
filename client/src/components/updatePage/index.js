import React , {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from 'axios';

import swal from 'sweetalert'
import './index.css'

const Update = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [data, setData] = useState({
        name: '',
        contact: '',
        email: '',
        address: '',
    })
    const {name,contact,email,address} = {...data}

    const [isLoading,setIsLoading] = useState(false)

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
    useEffect(()=>{
        if(id){
            setIsLoading(true)
            axios.get('http://localhost:4000/students/'+id).then((res)=>{
                console.log(res.data);
                data.name=res.data[0].name;
                data.contact=res.data[0].contact;
                data.email=res.data[0].email;
                data.address=res.data[0].address;
                setIsLoading(false)
        }).catch(err=>{
            console.log(err)
        })
        }
    // eslint-disable-next-line
    },[id])
    const onSubmitHandler = (event) => {    
        event.preventDefault();
        if (contact.length !== 10) {
            swal({
                text:"contact must be 10 digits",
                icon:'warning'
            })
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            swal({
                text:"Please enter a Valid Email",
                icon:'warning'
            })
        }else{
            axios.patch(`http://localhost:4000/students/${id}`,{
                name,
                contact,
                email,
                address
            }).then(res=>{
                swal({
                    title: "Student details updated!",
                    text:"Student details updated successfully",
                    icon:'success',
                    button:'Ok'
                }).then(()=>{
                    navigate('/Home')
                })
            }).catch(err=>{
                const erorMessage =err.response.data?.message
                swal({
                    title: "Already Exist",
                    text:erorMessage?erorMessage:"Existing Email Or Contact !",
                    icon:'error'
                })
            })
        }

        
    }

    return (
        <>
        {
            !isLoading && <div className='bgUpdate-container'>
            <h1 className='home-heading'>Enter Details</h1>
            <form className='form-container' onSubmit={onSubmitHandler}>
                <div className='label-container'>
                    <label className='label-elements' htmlFor='lastName'>Full Name</label>
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
                    <label className='label-elements' htmlFor='contact'>Contact</label>
                    <input
                    className='register-inputs'
                    id='contact'
                    value={contact}
                    onChange={onChangeHandler}
                    type="text"
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
                    <button className='home-button'>Save</button>
                </div>
            </form>
        </div>
        }
        
        </>
    )

}

export default Update 