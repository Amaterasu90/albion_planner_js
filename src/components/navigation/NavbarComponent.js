import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faLeaf, faListAlt, faBookOpen, faGem } from '@fortawesome/fontawesome-free-solid'

class NavbarComponent extends React.Component {

    render() {
        return <Navbar>
            <Nav className="mb-sm-auto flex-column align-items-baseline">
                <Nav.Item>
                    <p className="nav-link text-white" style={{"cursor": "pointer"}} onClick={this.props.openArtifactsCrud}> <FontAwesomeIcon icon={faBookOpen} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Artifacts</span></p>
                </Nav.Item>
                <Nav.Item>
                    <p className="nav-link text-white" style={{"cursor": "pointer"}} onClick={this.props.openJournalsCrud}> <FontAwesomeIcon icon={faBook} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Journals</span></p>
                </Nav.Item>
                <Nav.Item>
                    <p className="nav-link text-white" style={{"cursor": "pointer"}} onClick={this.props.openResourcesCrud}> <FontAwesomeIcon icon={faLeaf} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Resources</span></p>
                </Nav.Item>                
                <Nav.Item>
                    <p className="nav-link text-white" style={{"cursor": "pointer"}} onClick={this.props.openGatherResourceTypesCrud}> <FontAwesomeIcon icon={faListAlt} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Resource Types</span></p>
                </Nav.Item>
                <Nav.Item>
                    <p className="nav-link text-white" style={{"cursor": "pointer"}} onClick={this.props.openMaterialsCrud}> <FontAwesomeIcon icon={faLeaf} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Materials</span></p>
                </Nav.Item>                
                <Nav.Item>
                    <p className="nav-link text-white" style={{"cursor": "pointer"}} onClick={this.props.openMaterialTypesCrud}> <FontAwesomeIcon icon={faListAlt} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Material Types</span></p>
                </Nav.Item>
                <Nav.Item>
                    <p className="nav-link text-white" style={{"cursor": "pointer"}} onClick={this.props.openProductsCrud}> <FontAwesomeIcon icon={faGem} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Products</span></p>
                </Nav.Item>            
                <Nav.Item>
                    <p className="nav-link text-white" style={{"cursor": "pointer"}} onClick={this.props.openProductTypesCrud}> <FontAwesomeIcon icon={faListAlt} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Product Types</span></p>
                </Nav.Item>
            </Nav >
        </Navbar>
    }
}

export default NavbarComponent;