import {
    //Button,
    Form,
    FormControl,
    Container,
    Nav,
    Navbar,
    NavDropdown
} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom';
const Header = () => {

  const history = useNavigate();

    return(<Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <Link to='/'><button type="button" class="btn btn-primary">InStock</button></Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/teststock">
              <Link to="/teststock">
                My Stock
              </Link>
              </Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Check Stock</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Check Shipping
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
              <NavDropdown.Item onClick={()=> {
                localStorage.removeItem("userInfo");
                history("/");
              }}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            <Form inline>
                <FormControl 
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                />
            </Form>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
};

export default Header;
