//import {Link} from "react-router-dom";
//import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MainScreen from '../../components/MainScreen';
import "./Login.css";
import axios from 'axios';

function Login() {
    /*const [stock, setStock] = useState([]);
    const fetchStock = async() => {
        const { data } = await axios.get('/api/notes')
    
        setStock(data);
    };
    
    console.log(stock);
    
    useEffect(() => {fetchStock();}, []);*/
    const navigate = useNavigate();

    const navigateToRegister = () =>{
        navigate('/register');
    }

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()

        try{
            const config = {
                headers: {
                    "Content-type":"application/json"
                }
            }

            setLoading(true)

            const {data} = await axios.post(
                "/api/users/login", 
                {
                    email,
                    password,
                },
                config
            );
            
            console.log(data);
            localStorage.setItem('userInfo',JSON.stringify(data));
            setLoading(false)
        } catch (error){
            setError(error.response.data.message);
        }
        console.log(email,password)
    };

    return(
        <><h1 className="d-flex align-items-center justify-content-center mt-5">Login</h1>
        <div className="p-3 my-5 flex-column justify-content-center align-items-center">
            <form onSubmit={submitHandler}>
                <div className="d-flex align-items-center justify-content-center mb-4 me-2">
                    <label for="uname" className="me-2" placeholder="Username">Username:</label> <br/>
                    <input type="text" id="uname" name="uname" onChange={(e) => setEmail(e.target.value)}/><br/>
                </div>
                <div className="d-flex align-items-center justify-content-center mb-4 me-1">
                    <label for="pwd" className="me-2" placeholder="Password">Password:</label> <br/>
                    <input type="password" id="pwd" name="pwd" onChange={(e) => setPassword(e.target.value)}/><br/>
                </div>
                <div className="d-flex align-items-center justify-content-center justify-content-space-evenly mt-5">
                    <button type="submit" class="btn btn-primary">Login</button>
                    <button style={{ marginLeft: '25px' }} className="btn btn-success" onClick={navigateToRegister}>Signup</button>
                </div>
            </form>
        </div>
        </>
    );
};

export default Login;