import { Container, Row, Button } from "react-bootstrap";
import "./LandingPage.css";

const LandingPage = () => {
    return(
        <div className="main">
            <Container>
                <Row>
                    <div className="intro-text">
                        <div className="square bg-white rounded-pill">
                            <h1 className="title"><>Welcome to InStock</></h1>
                            <p className="subtitle">Place for all in need of retail!</p>
                        </div>
                        <div className="buttonContainer">
                            <a href="/login">
                                <Button size="lg" className="landingbutton">
                                    Login
                                </Button>
                            </a>
                            <a href="/register">
                                <Button 
                                    size="lg" 
                                    className="landingbutton"
                                    variant="outline-primary"
                                >
                                    Register Here!
                                </Button>
                            </a>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default LandingPage;