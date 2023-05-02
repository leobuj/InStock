import { useEffect, useState } from "react";
import {Button, Card, Badge, Accordion} from "react-bootstrap";
import {Link} from "react-router-dom";
import MainStock from "../../components/MainStock";
import axios from "axios";

function Shipments() {
    const deleteHandler = (id) => {
        if (window.confirm("Certain?")){

        }
    };
    
    const [stock, setStock] = useState([]);
    const fetchStock = async() => {
        const { data } = await axios.get('/api/orders')
    
        setStock(data);
    };
    
    console.log(stock);
    
    useEffect(() => {fetchStock();}, []);
    return(
        <MainStock title="Orders">
            <Link to='addstock'>
            </Link> 
                {
                    stock.map(note => (
                        <Accordion key={note._id}>
                            <Accordion.Item eventKey="0">
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
                                ><Accordion.Button as={Card.Text} bg="link" eventKey="0">{stock.title}</Accordion.Button>
                                </span>
                            </Card.Header>
                            <div>
                                <Button href={`/note/${note._id}`}>Edit</Button>
                                <Button variant="danger" className="mx-2" onClick={() => deleteHandler(note._id)}>
                                    Delete
                                </Button>
                            </div>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <h4>
                                    <Badge variant='success'>
                                        Category - {note.category}
                                    </Badge>
                                </h4>
                                <blockquote className="blockquote mb-0">
                                    <p>
                                        {note.content}
                                    </p>
                                    <footer className="blockquote-footer">
                                        Added on - date
                                    </footer>
                                </blockquote>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                            </Accordion.Item>
                        </Accordion>
                        
                    ))}
        </MainStock>
        
        
    );
};

export default Shipments;