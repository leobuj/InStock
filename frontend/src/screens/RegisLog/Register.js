//import {Button} from "react-bootstrap";
//import {Link} from "react-router-dom";
//import MainScreen from "../../components/MainScreen";
import {useNavigate} from 'react-router-dom';

function Register(){

const navigate = useNavigate();

const navigateToLogin = () =>{
        navigate('/login');

}

    return(
        <><h1 className="d-flex align-items-center justify-content-center mt-5">Register</h1>
        <div className="p-3 my-5 flex-column justify-content-center align-items-center">
            <form>
                <div className="d-flex align-items-center justify-content-center mb-4">
                    <label for="fname" className="me-3">First Name:</label> <br/>
                    <input type="text" id="fname" name="fname"/><br/>
                </div>
                <div className="d-flex align-items-center justify-content-center mb-4">
                    <label for="lname" className="me-3">Last Name:</label> <br/>
                    <input type="text" id="lname" name="lname"/><br/>
                </div>
                <div className="d-flex align-items-center justify-content-center mb-4">
                    <label for="eml" className="me-5">Email:</label> <br/>
                    <input type="text" id="eml" name="eml"/><br/>
                </div>
                <div className="d-flex align-items-center justify-content-center mb-4">
                    <label for="uname" className="me-3">Username:</label> <br/>
                    <input type="text" id="uname" name="uname"/><br/>
                </div>
                <div className="d-flex align-items-center justify-content-center mb-4">
                    <label for="pwd" className="me-4">Password:</label> <br/>
                    <input type="password" id="pwd" name="pwd"/><br/>
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