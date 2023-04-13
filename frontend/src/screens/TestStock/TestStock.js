//import { useEffect, useState } from "react";
import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import MainScreen from "../../components/MainScreen";
//import axios from "axios";

function TestStock() {
    /*const [stock, setStock] = useState([]);
    const fetchStock = async() => {
        const { data } = await axios.get('/api/notes')
    
        setStock(data);
    };
    
    console.log(stock);
    
    useEffect(() => {fetchStock();}, []);*/
    
    return(
        <MainScreen title="Welcome back dear user!"> Testing My Stock
            <Link to='addstock'>
                <Button style={{marginLeft: 10, marginBottom: 6}} size='lg'>
                    Add new/existing stock
                </Button>
                    <Card style={{margin: 10}}>
                        <Card.Header style={{display: "flex"}}>
                            <span
                            style={{
                                color: "maroon",
                                textDecoration: "none",
                                flex: 1,
                                cursor: "pointer",
                                alignSelf: "center",
                                fontSize: 18
                            }}
                            >title</span>
                        </Card.Header>
                        <div>
                            <Button>Edit</Button>
                            <Button variant="danger" className="mx-2">
                                Delete
                            </Button>
                        </div>
                    </Card>
            </Link> 
        </MainScreen>

    );
};

export default TestStock;
