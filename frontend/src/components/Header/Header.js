import {
    //Button,
    Form,
    FormControl,
    Container,
    Nav,
    Navbar,
    NavDropdown
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
            <Nav.Link href="#link">Sign Up</Nav.Link>
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
            </NavDropdown>
            <Form inline>
                <FormControl 
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                />
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
};

export default Header;