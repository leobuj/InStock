import {
    //Button,
    Form,
    FormControl,
    Container,
    Nav,
    Navbar,
} from 'react-bootstrap'
import {Link} from 'react-router-dom';

const Header = () => {
    return(<Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <Link to='/'>InStock</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/teststock">
              <Link to="/teststock">
                My Stock
              </Link>
              </Nav.Link>
            <Form inline>
                <FormControl 
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                />
            </Form>
            <Link to="/login">Login</Link>
            <Nav.Link href="/register">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
};

export default Header;
