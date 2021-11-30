import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faLeaf, faListAlt, faBookOpen } from '@fortawesome/fontawesome-free-solid'

class NavbarComponent extends React.Component {

    render() {
        return <Navbar bg="dark" variant="dark">
            <Nav className="mb-sm-auto flex-column mb-0 align-items-sm-start">
                <Nav.Item>
                    <p className="nav-link px-0 text-white" style={{"cursor": "pointer"}} onClick={this.props.openArtifactCrud}> <FontAwesomeIcon icon={faBookOpen} /><span className="d-none d-sm-inline"> Artifacts </span></p>
                </Nav.Item>
                <Nav.Item>
                    <p className="nav-link px-0 text-white" style={{"cursor": "pointer"}} onClick={this.props.openItemTypeCrud}> <FontAwesomeIcon icon={faListAlt} /> <span className="d-none d-sm-inline"> Item types </span></p>
                </Nav.Item>
                <Nav.Item>
                    <p className="nav-link px-0 text-white" style={{"cursor": "pointer"}} onClick={this.props.openJournalCrud}> <FontAwesomeIcon icon={faBook} /> <span className="d-none d-sm-inline"> Journals </span></p>
                </Nav.Item>
                <Nav.Item>
                    <p className="nav-link px-0 text-white" style={{"cursor": "pointer"}} onClick={this.props.openResourcesCrud}> <FontAwesomeIcon icon={faLeaf} /> <span className="d-none d-sm-inline"> Resources </span></p>
                </Nav.Item>
            </Nav >
        </Navbar>
    }
}

export default NavbarComponent;