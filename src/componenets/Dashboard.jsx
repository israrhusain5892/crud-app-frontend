import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../App.css';
import axios from 'axios';
import Swal from 'sweetalert2';

// or via CommonJS

function Dashboard() {

    // const Swal = require('sweetalert2')
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [mobileNumber, setMobileNumber] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [editIndex, setEditIndex] = useState(null);
    const [data, setData] = useState([]);
    const [position, setPosition] = useState(-350);
    const[id,setId]=useState()

    const formData={
        name:'',
        email:'',
        mobileNumber:'',
        dateOfBirth:'',

     }
    const [form,setForm]=useState(formData);




    const handleInput=(e)=>{
        const input=e.target;
        const value=input.value;
        const key=input.name;
        setForm({
            ...form,
            [key]:value
        })

    }
    
    //  console.log(name,email,mobileNumber,dateOfBirth)
    useEffect(() => {
        axios.get("https://crud-app-ukj8.onrender.com/").then(res => {
            setData(res.data)
            //   console.log(res);
        }).catch(error => {
            console.log(error);
        })


    }, [])
    // console.log(data)
    const handleForm = (e) => {
        setData([...data,form])
        e.preventDefault();
        axios.post('https://crud-app-ukj8.onrender.com/', form).then(res => {
            if (res) {

                
                toast.success("Data saved successfully !!");
            }
    

        }).catch(error => {
            console.log(error)
        })

        setForm(formData);



    }

   

    function handlePosition() {
        setPosition(-350)
        setEditIndex(null);
        setForm(formData);
    }

    const editRow = (index,id) => {
        setPosition(0)
        setId(id);
       setForm(data[index])
       setEditIndex(index)
        
    }

    const saveEditData=(e)=>{
        e.preventDefault();
        try{
            const backup=[...data];
            backup[editIndex]=form;
            setData(backup);
             axios.put(`https://crud-app-ukj8.onrender.com/${id}`,form);
             toast.success("Data update successfully !!");
             
        }
        catch(error){
            toast.error("could not update some thing went Wrong!")
        }

       setEditIndex(null);
       setForm(formData)

        
    }

    const deleteRow =  (index, id) => {


        try{

             axios.delete(`https://crud-app-ukj8.onrender.com/${id}`, {
                method: 'post'
            })
    
            const copy = [...data]
            copy.splice(index, 1);
            setData(copy);
            
           
            alert("are you sure to delete item ?")

        }

        catch(error){
             Swal.fire(
                {
                    title:'errorMessage',
                    text:'some thing went wrong',
                    status:'error'
                }
             )
        }

       
        // alert("are you sure to delete? click ok")
    }

    function addButtonFunction() {
        setPosition(0);
        setEditIndex(null);
        
    }
   
    return (

        <div className="dashboard"
              

        >
            <ToastContainer position="top-center" />

            {
                 <aside className="sideBar"
                    style={{
                        right: 0,
                        padding: '30px',
                        zIndex: 2,
                        height:'100%',
                        position:'fixed',
                        right:position,
                        width:'350px',
                        backgroundColor:'white',
                        top: '0px',
                        border: '4px',
                        boxSizing: 'border-box',
                        boxShadow: '0px 0px 8px rgba(0,0,0,0.3)',
                        transition: '0.3s',

                    }}


                >

                    {
                        !editIndex ? <h4>Enter Detail Here</h4>:<h4>Edit Detail Here</h4>
                    }

                   
                  
                    <form 
                       onSubmit={editIndex===null ? handleForm:saveEditData}
                    
                        style={{

                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            // padding: 25,
                            marginTop: '30px'

                        }}
                    >

                        <div className="mb-3" >
                            <label For="exampleInputEmail1" className="form-label">Enter Name</label>
                            <input
                                value={form.name}
                                onChange={handleInput}
                                type="text" className="form-control" name="name" id="exampleInputEmail1" required aria-describedby="emailHelp" />
                            {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
                        </div>
                        <div className="mb-3">
                            <label For="exampleInputEmail1"  class="form-label">Email address</label>
                            <input
                                value={form.email}
                                onChange={handleInput}

                                type="email" className="form-control" name="email" id="exampleInputEmail1" required aria-describedby="emailHelp" />
                            {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
                        </div>
                        <div className="mb-3">
                            <label For="exampleInputPassword1" className="form-label">Enter mobile</label>
                            <input
                                value={form.mobileNumber}
                                onChange={handleInput}
                                type="number" name="mobileNumber" className="form-control" id="exampleInputPassword1" required />
                        </div>

                        <div className="mb-3">
                            <label For="exampleInputPassword1" className="form-label">Enter DOB</label>
                            <input
                                value={form.dateOfBirth}
                                onChange={handleInput}
                                type="date" name="dateOfBirth" className="form-control" id="exampleInputPassword1"  required />
                        </div>
                        {
                            !editIndex ? <button
                                style={{
                                    width: '100px',
                                    margin: 'auto'
                                }}
                                type="submit" className="btn btn-primary">Submit</button> :
                                <button
                                    style={{
                                        width: '100px',
                                        margin: 'auto'
                                    }} type="submit" className="btn btn-primary">
                                        
                                Save</button>

                        }
                    </form>
                    <button
                        onClick={handlePosition}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '10px',
                            backgroundColor: 'white',
                            borderRadius: 5,
                            color: 'red',
                            border: 'none',
                            fontSize:25
                        }}>
                        <i class="ri-close-circle-line"></i>
                    </button>
                </aside>
            }




            <div
                style={{
                    position: 'absolute',
                    left: 234,
                    top: 100,
                    padding: '20px'
                }}

            >
            <button 
               style={{
                  marginLeft:30,
               }}
            type="button" onClick={addButtonFunction} className="btn btn-primary" >Add</button></div>


            <div className="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Enter Detail</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleForm}
                                style={{

                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexDirection: 'column'
                                    // padding: 25,

                                }}
                            >

                                <div className="mb-3" >
                                    <label For="exampleInputEmail1" className="form-label">Enter Name</label>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        type="text" className="form-control" name="name" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
                                </div>
                                <div className="mb-3">
                                    <label For="exampleInputEmail1" class="form-label">Email address</label>
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
                                </div>
                                <div className="mb-3">
                                    <label For="exampleInputPassword1" className="form-label">Enter mobile</label>
                                    <input
                                        value={mobileNumber}
                                        onChange={(e) => setMobileNumber(e.target.value)}
                                        type="number" className="form-control" id="exampleInputPassword1" />
                                </div>

                                <div className="mb-3">
                                    <label For="exampleInputPassword1" className="form-label">Enter DOB</label>
                                    <input
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                        type="date" className="form-control" id="exampleInputPassword1" />
                                </div>

                                <button
                                    style={{
                                        width: '100px',
                                        margin: 'auto'
                                    }}
                                    type="submit" className="btn btn-primary">Submit</button>


                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <h3
                style={{
                    textAlign: 'center',
                    marginTop: 60,
                    marginLeft: -100,
                    marginBottom: -40
                }}
            >Person detail</h3>

                   
            

            <table className="table"
                style={{

                    width: 800,

                    margin: '50px auto'

                }}
            >

                <tr>
                    <th>sr no.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>D.O.B</th>
                    <th>Action</th>
                </tr>
                {/* </thead> */}

                {

                    data.map((element, index) => {

                        return <tr>
                            <td>{index+1}</td>
                            <td>{element.name}</td>
                            <td>{element.email}</td>
                            <td>{element.mobileNumber}</td>
                            <td>{element.dateOfBirth.slice(0,10)}</td>
                            <td>
                                < button className="btn"

                                    data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"
                                    style={{
                                        backgroundColor: '#ff00dc',
                                        color: 'white',
                                        width: 25,
                                        padding: '2px 0px'
                                    }}

                                    onClick={(e) => editRow(index,element.id)}

                                >
                                    <i className="ri-edit-line"></i>
                                </button>
                                <button className="btn"
                                    style={{
                                        backgroundColor: '#1126f6',
                                        color: 'white',
                                        width: 25,
                                        padding: '2px 0px',
                                        marginLeft: '10px'
                                    }}
                                    onClick={(e) => deleteRow(index, element.id)}
                                >
                                    <i class="ri-delete-bin-6-line"></i>
                                </button>

                            </td>

                        </tr>

                    })


                }

            </table>


            {/* <br></br>
            <br></br>
            <br></br>
            <br></br> */}

        </div>


    )

}
export default Dashboard;