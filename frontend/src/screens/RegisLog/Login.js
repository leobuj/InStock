//import {Link} from "react-router-dom";
//import axios from "axios";

function Login() {
    /*const [stock, setStock] = useState([]);
    const fetchStock = async() => {
        const { data } = await axios.get('/api/notes')
    
        setStock(data);
    };
    
    console.log(stock);
    
    useEffect(() => {fetchStock();}, []);*/
    
    return(
        <><h1>Login</h1>
        <form>
            <label for="uname">Username:</label> <br/>
            <input type="text" id="uname" name="uname"/><br/>
            <label for="pwd">Password:</label> <br/>
            <input type="password" id="pwd" name="pwd"/><br/>
        </form>
        </>
    );
};

export default Login;