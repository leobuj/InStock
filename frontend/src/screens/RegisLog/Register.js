//import {Button} from "react-bootstrap";
//import {Link} from "react-router-dom";
//import MainScreen from "../../components/MainScreen";
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MainScreen from '../../components/MainScreen';
import axios from 'axios';

function Register(){

    const navigate = useNavigate();

    const navigateToLogin = () =>{
        navigate('/login');

    }

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        if(password !== confirmpassword){
            setMessage("Passwords Do not Match");
        } else{
            setMessage(null)
            try{
                const config = {
                    headers: {
                        "Content-type" : "application/json",
                    },
                };

                setLoading(true);

                const {data} = await axios.post(
                    "/api/users",
                    {name,email,password},
                    config
                );

                setLoading(false);
                localStorage.setItem("userInfo", JSON.stringify(data));
            } catch (error){
                setError(error.response.data.message);
            }
        }
        console.log(email);
    }

    return(
        <><h1 className="d-flex align-items-center justify-content-center mt-5">Register</h1>
        <div className="p-3 my-5 flex-column justify-content-center align-items-center">
            <form onSubmit={submitHandler}>
                <div className="d-flex align-items-center justify-content-center mb-4">
                    <label for="name" className="me-3">Username:</label> <br/>
                    <input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)}/><br/>
                </div>
                <div className="d-flex align-items-center justify-content-center mb-4">
                    <label for="eml" className="me-5">Email:</label> <br/>
                    <input type="text" id="eml" name="eml" onChange={(e) => setEmail(e.target.value)}/><br/>
                </div>
                <div className="d-flex align-items-center justify-content-center mb-4">
                    <label for="pwd" className="me-4">Password:</label> <br/>
                    <input type="password" id="pwd" name="pwd" onChange={(e) => setPassword(e.target.value)}/><br/>
                </div>
                <div className="d-flex align-items-center justify-content-center justify-content-space-evenly mt-5">
                    <button type="submit" class="btn btn-primary">Sign Up</button>
                    <button style={{ marginLeft: '25px' }} className="btn btn-success" onClick={navigateToLogin}>Login</button>
                </div>
            </form>
        </div>
        </>
    );
};

export default Register;