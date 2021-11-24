import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faLeaf, faListAlt, faBookOpen, faHome } from '@fortawesome/fontawesome-free-solid'

class NavbarComponent extends React.Component {
    render() {
        return <Navbar bg="dark" variant="dark">
            <Nav className="mb-sm-auto flex-column mb-0 align-items-sm-start">
                <Nav.Item>
                    <a href="/" className="nav-link px-0 text-white"> <FontAwesomeIcon icon={faBookOpen} /><span class="d-none d-sm-inline"> Artifacts </span></a>
                </Nav.Item>
                <Nav.Item>
                    <a href="/" className="nav-link px-0 text-white"> <FontAwesomeIcon icon={faListAlt} /> <span class="d-none d-sm-inline"> Item types </span></a>
                </Nav.Item>
                <Nav.Item>
                    <a href="/" className="nav-link px-0 text-white"> <FontAwesomeIcon icon={faBook} /> <span class="d-none d-sm-inline"> Journals </span></a>
                </Nav.Item>
                <Nav.Item>
                    <a href="/" className="nav-link px-0 text-white"> <FontAwesomeIcon icon={faLeaf} /> <span class="d-none d-sm-inline"> Resources </span></a>
                </Nav.Item>
            </Nav >
        </Navbar>
    }
}

export default NavbarComponent;