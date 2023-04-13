//import {Button} from "react-bootstrap";
//import {Link} from "react-router-dom";
//import MainScreen from "../../components/MainScreen";

function Register(){
    return(
        <><h1>Register</h1>
        <form>
            <label for="fname">First Name:</label> <br/>
            <input type="text" id="fname" name="fname"/><br/>
            <label for="lname">Last Name:</label> <br/>
            <input type="text" id="lname" name="lname"/><br/>
            <label for="eml">Email:</label> <br/>
            <input type="text" id="eml" name="eml"/><br/>
            <label for="uname">Username:</label> <br/>
            <input type="text" id="uname" name="uname"/><br/>
            <label for="pwd">Password:</label> <br/>
            <input type="password" id="pwd" name="pwd"/><br/>
        </form>
        </>
    );
};

export default Register;