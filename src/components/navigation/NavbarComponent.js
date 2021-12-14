import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faLeaf, faListAlt, faBookOpen, faGem, faVial } from '@fortawesome/fontawesome-free-solid'
import { Accordion } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap";
import { useContext } from "react";
import { AccordionContext } from "react-bootstrap";

function CustomToggle({ nodes, onCollapseClicked, children, eventKey, callback }) {
    const context = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(eventKey, () => {
        onCollapseClicked(eventKey);
        return callback && callback(eventKey)
    });

    var node = nodes.find(node => node.key === context.activeEventKey);

    return (
        <p className={`nav-link ${node != null && node.selected ? "text-white" : "text-info"} fs-3 p-0 b-0`} style={{ "cursor": "pointer" }} onClick={decoratedOnClick}>{children}</p>
    );
}

class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [
                { key: "0", selected: true },
                { key: "1", selected: false },
                { key: "2", selected: false },
                { key: "3", selected: false },
                { key: "4", selected: false },
                { key: "2_0", selected: false },
                { key: "2_1", selected: false },
                { key: "3_0", selected: false },
                { key: "3_1", selected: false },
                { key: "4_0", selected: false },
                { key: "4_1", selected: false }]
        }
    }

    updateClickState = (key) => {
        if (key != null) {
            var nodes = this.state.nodes.map(node => {
                node.selected = false;
                return node;
            });

            var node = nodes.find(node => node.key === key);
            node.selected = true;
            if (key.includes("_")) {
                var [headerKey,] = key.split("_");
                var node = nodes.find(node => node.key === headerKey);
                node.selected = true;
            }

            this.setState({ nodes: nodes });
        }
    }

    onNavigationClicked = (key, callback) => {
        callback();
        this.updateClickState(key);
    }

    render() {
        const { nodes } = this.state;
        return <>
            <Navbar>
                <Nav className="mb-sm-auto flex-column align-items-baseline">
                    <Nav.Item>
                        <p className={`nav-link ${nodes.find(node => node.key === "0").selected ? "text-danger" : "text-light"} fs-3`} eventKey="0" style={{ "cursor": "pointer" }} onClick={() => this.onNavigationClicked("0", this.props.openArtifactsCrud)}> <FontAwesomeIcon icon={faBookOpen} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Artifacts</span></p>
                    </Nav.Item>
                    <Nav.Item>
                        <p className={`nav-link ${nodes.find(node => node.key === "1").selected ? "text-danger" : "text-light"} fs-3`} eventKey="1" style={{ "cursor": "pointer" }} onClick={() => this.onNavigationClicked("1", this.props.openJournalsCrud)}> <FontAwesomeIcon icon={faBook} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Journals</span></p>
                    </Nav.Item>
                    <Nav.Item>
                        <Accordion className="bg-dark" flush>
                            <Card className="bg-dark text-white p-0 m-0 border-0">
                                <Card.Header className="bg-dark text-white px-0 m-0 border-0 d-flex flex-column align-items-baseline">
                                    <CustomToggle eventKey="2" onCollapseClicked={this.updateClickState} nodes={this.state.nodes} className="bg-dark text-white p-0">
                                        <FontAwesomeIcon icon={faLeaf} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Resources</span>
                                    </CustomToggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2" className="bg-dark text-white">
                                    <Card.Body className="bg-dark d-flex flex-column align-items-baseline p-0">
                                        <p className={`nav-link ${nodes.find(node => node.key === "2_0").selected ? "text-danger" : "text-warning"} fs-3 px-0`} style={{ "cursor": "pointer" }} onClick={() => this.onNavigationClicked("2_0", this.props.openResourcesCrud)}> <FontAwesomeIcon icon={faLeaf} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Resources</span></p>
                                        <p className={`nav-link ${nodes.find(node => node.key === "2_1").selected ? "text-danger" : "text-warning"} fs-3 px-0`} style={{ "cursor": "pointer" }} onClick={() => this.onNavigationClicked("2_1", this.props.openGatherResourceTypesCrud)}> <FontAwesomeIcon icon={faListAlt} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Resource Types</span></p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Nav.Item>
                    <Nav.Item>
                        <Accordion className="bg-dark" flush>
                            <Card className="bg-dark text-white p-0 m-0 border-0">
                                <Card.Header className="bg-dark text-white px-0 m-0 border-0 d-flex flex-column align-items-baseline">
                                    <CustomToggle eventKey="3" onCollapseClicked={this.updateClickState} nodes={this.state.nodes} className="bg-dark text-white p-0">
                                        <FontAwesomeIcon icon={faVial} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Materials</span>
                                    </CustomToggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="3" className="bg-dark text-white">
                                    <Card.Body className="bg-dark d-flex flex-column align-items-baseline p-0">
                                        <p className={`nav-link ${nodes.find(node => node.key === "3_0").selected ? "text-danger" : "text-warning"} fs-3 px-0`} style={{ "cursor": "pointer" }} onClick={() => this.onNavigationClicked("3_0", this.props.openMaterialsCrud)}> <FontAwesomeIcon icon={faVial} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Materials</span></p>
                                        <p className={`nav-link ${nodes.find(node => node.key === "3_1").selected ? "text-danger" : "text-warning"} fs-3 px-0`} style={{ "cursor": "pointer" }} onClick={() => this.onNavigationClicked("3_1", this.props.openMaterialTypesCrud)}> <FontAwesomeIcon icon={faListAlt} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Material Types</span></p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Nav.Item>
                    <Nav.Item>
                        <Accordion className="bg-dark" flush>
                            <Card className="bg-dark text-white p-0 m-0 border-0">
                                <Card.Header className="bg-dark text-white px-0 m-0 border-0 d-flex flex-column align-items-baseline">
                                    <CustomToggle eventKey="4" onCollapseClicked={this.updateClickState} nodes={this.state.nodes} className="bg-dark text-white p-0">
                                        <FontAwesomeIcon icon={faGem} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Products</span>
                                    </CustomToggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="4" className="bg-dark text-white">
                                    <Card.Body className="bg-dark d-flex flex-column align-items-baseline p-0">
                                        <p className={`nav-link ${nodes.find(node => node.key === "4_0").selected ? "text-danger" : "text-warning"} fs-3 px-0`} style={{ "cursor": "pointer" }} onClick={() => this.onNavigationClicked("4_0", this.props.openProductsCrud)}> <FontAwesomeIcon icon={faVial} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Products</span></p>
                                        <p className={`nav-link ${nodes.find(node => node.key === "4_1").selected ? "text-danger" : "text-warning"} fs-3 px-0`} style={{ "cursor": "pointer" }} onClick={() => this.onNavigationClicked("4_1", this.props.openProductTypesCrud)}> <FontAwesomeIcon icon={faListAlt} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Product Types</span></p>
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