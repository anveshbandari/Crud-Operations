import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
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
    const successMessage = new URLSearchParams(navigate.search).get('success');


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
        <div className='container'>
            {successMessage &&
            <div className="mt-3 text-center alert alert-success alert-dismissible fade show" role="alert">Successful registered</div>
            }
            <div class="d-flex justify-content-between  mt-5 mb-5">
                <div>
                    <button class="h4 btn btn-success text-light" onClick={onChangeHandler}>Add Student</button>
                </div>
                <div>
                    <button onClick={logoutHandler} class="btn btn-primary">LogOut</button>
                </div>
            </div>
            {/* <div > */}
            <table className="table border table-bordered border-dark table-striped  table-center mt-1" >
                <thead className="thead-dark">
                <tr>
                    <th scope="col" >Full Name</th>
                    <th scope="col" >Mobile</th>
                    <th scope="col" >Email</th>
                    <th scope="col" >Adress</th>
                    <th scope="col" >Edit</th>
                    <th scope="col" >Delete</th>
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
        // </div>
    )
}

export default Home 