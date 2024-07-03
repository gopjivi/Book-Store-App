import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../images/logo.png";

function Header() {
  return (
    <header className="header_section">
      <Container>
        <Navbar expand="lg" className="custom_nav-container bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">
              <img width="100" src={logo} alt="Logo" />
              <span className="store_name">NOVAL NOOK</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="navbar-nav-center ml-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#book">Books</Nav.Link>
                <Nav.Link href="#author">Authors</Nav.Link>
                <Nav.Link href="#genres">Genres</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </header>
  );
}

export default Header;
