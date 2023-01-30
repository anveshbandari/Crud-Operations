import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import './index.css'

const Home = () => {
    const [students,setStudents]=useState(null);
    const getStudenstData = ()=>{
        axios.get('http://localhost:4000/students').then((res)=>{
            setStudents(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        getStudenstData()
    },[])

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        event.preventDefault();
        navigate('/Register');
    }

    const logoutHandler = (event) => {
        event.preventDefault();
        navigate('/')
    }

    const DeleteUser=(id)=>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:4000/students/${id}`).then(res=>{
                    swal("Successfully deleted record", {
                        icon: "success",
                      }).then(()=>{
                        getStudenstData();
                      })
                }).catch(err=>{
                    swal("Something went wrong while deleting record", {
                        icon: "Error",
                      });
                })
            }else {
                swal("Your Student Record file is safe!");
            }
        });
    }
    
    return (
        <div className='table-container'>
            <div className='top-container'>
                <button onClick={onChangeHandler} className='table-button' > Add Student </button>
            </div>
            <div className='top-container'>
            <button onClick={logoutHandler} className='table-button' > LogOut </button>
            </div>
            <div className='table-container'>
                <table>
                    <thead>
                    <tr>
                        
                        <th>Full Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Adress</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        students?.map((student)=>{
                            return (
                            <tr key={student.id}>
                                <td>{student.name}</td>
                                <td>{student.contact}</td>
                                <td>{student.email}</td>
                                <td>{student.address}</td>
                                <td onClick={() => navigate(`/Update/${student.id}`)} ><button className='update-button' >Update</button></td> 
                                <td><button className='delete-button' onClick={()=>{DeleteUser(student.id)}}>Delete</button></td>
                            </tr>)
                        })
                    }
                    </tbody>                                                                                                                                                                           
                </table>           
             </div>
        </div>
    )
}

export default Home 