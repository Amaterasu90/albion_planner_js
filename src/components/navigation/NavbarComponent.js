import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faLeaf, faListAlt, faBookOpen, faGem, faVial } from '@fortawesome/fontawesome-free-solid'
import { Accordion } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap";

function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () => { },);

    return (
        <p className="nav-link text-white fs-3 p-0 b-0" style={{ "cursor": "pointer" }} onClick={decoratedOnClick}>{children}</p>
    );
}

class NavbarComponent extends React.Component {

    render() {
        return <>
            <Navbar>
                <Nav className="mb-sm-auto flex-column align-items-baseline">
                    <Nav.Item>
                        <p className="nav-link text-white fs-3" style={{ "cursor": "pointer" }} onClick={this.props.openArtifactsCrud}> <FontAwesomeIcon icon={faBookOpen} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Artifacts</span></p>
                    </Nav.Item>
                    <Nav.Item>
                        <p className="nav-link text-white fs-3" style={{ "cursor": "pointer" }} onClick={this.props.openJournalsCrud}> <FontAwesomeIcon icon={faBook} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Journals</span></p>
                    </Nav.Item>
                    <Nav.Item>
                        <Accordion className="bg-dark" flush>
                            <Card className="bg-dark text-white p-0 m-0 border-0">
                                <Card.Header className="bg-dark text-white px-0 m-0 border-0 d-flex flex-column align-items-baseline">
                                    <CustomToggle eventKey="0" className="bg-dark text-white p-0">
                                        <FontAwesomeIcon icon={faLeaf} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Resources</span>
                                    </CustomToggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0" className="bg-dark text-white">
                                    <Card.Body className="bg-dark d-flex flex-column align-items-baseline">
                                        <p className="nav-link text-warning fs-3 text-left" style={{ "cursor": "pointer" }} onClick={this.props.openResourcesCrud}> <FontAwesomeIcon icon={faLeaf} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Resources</span></p>
                                        <p className="nav-link text-warning fs-3 text-left" style={{ "cursor": "pointer" }} onClick={this.props.openGatherResourceTypesCrud}> <FontAwesomeIcon icon={faListAlt} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Resource Types</span></p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Nav.Item>
                    <Nav.Item>
                        <Accordion className="bg-dark" flush>
                            <Card className="bg-dark text-white p-0 m-0 border-0">
                                <Card.Header className="bg-dark text-white px-0 m-0 border-0 d-flex flex-column align-items-baseline">
                                    <CustomToggle eventKey="0" className="bg-dark text-white p-0">
                                        <FontAwesomeIcon icon={faVial} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Materials</span>
                                    </CustomToggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0" className="bg-dark text-white">
                                    <Card.Body className="bg-dark d-flex flex-column align-items-baseline">
                                        <p className="nav-link text-warning fs-3 text-left" style={{ "cursor": "pointer" }} onClick={this.props.openMaterialsCrud}> <FontAwesomeIcon icon={faVial} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Materials</span></p>
                                        <p className="nav-link text-warning fs-3 text-left" style={{ "cursor": "pointer" }} onClick={this.props.openMaterialTypesCrud}> <FontAwesomeIcon icon={faListAlt} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Material Types</span></p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Nav.Item>
                    <Nav.Item>
                        <Accordion className="bg-dark" flush>
                            <Card className="bg-dark text-white p-0 m-0 border-0">
                                <Card.Header className="bg-dark text-white px-0 m-0 border-0 d-flex flex-column align-items-baseline">
                                    <CustomToggle eventKey="0" className="bg-dark text-white p-0">
                                        <FontAwesomeIcon icon={faGem} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Products</span>
                                    </CustomToggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0" className="bg-dark text-white">
                                    <Card.Body className="bg-dark d-flex flex-column align-items-baseline">
                                        <p className="nav-link text-warning fs-3 text-left" style={{ "cursor": "pointer" }} onClick={this.props.openProductsCrud}> <FontAwesomeIcon icon={faVial} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Products</span></p>
                                        <p className="nav-link text-warning fs-3 text-left" style={{ "cursor": "pointer" }} onClick={this.props.openProductTypesCrud}> <FontAwesomeIcon icon={faListAlt} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Product Types</span></p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Nav.Item>
                </Nav >
            </Navbar>
        </>
    }
}

export default NavbarComponent;