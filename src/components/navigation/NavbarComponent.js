import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faLeaf, faListAlt, faBookOpen, faGem, faVial, faPuzzlePiece } from '@fortawesome/fontawesome-free-solid'
import { } from '@fortawesome/fontawesome-svg-core'
import { Accordion } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap";

function CustomToggle({ children, eventKey, callback }) {
    const decoratedOnClick = useAccordionButton(eventKey, () => callback && callback(eventKey));

    return (
        <span className={`nav-link text-light fs-3 p-0 b-0`} style={{ "cursor": "pointer" }} onClick={decoratedOnClick}>{children}</span>
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
                { key: "4_0", selected: false },
                { key: "4_1", selected: false },
                { key: "4_2", selected: false }]
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
                node = nodes.find(node => node.key === headerKey);
                node.selected = true;
            }

            this.setState({ nodes: nodes });
        }
    }

    getColor = (key, nodes, activeColor, defaultColor) => {
        return nodes.find(node => node.key === key).selected ? activeColor : defaultColor
    }

    onNavigationClicked = (key, callback) => {
        callback();
        this.updateClickState(key);
    }

    render() {
        const { nodes } = this.state;
        return <>
            <Navbar>
                <Accordion defaultActiveKey="menu" className="bg-dark" flush>
                    <Card className="bg-dark text-white p-0 m-0 border-0">
                        <Card.Header className="bg-dark text-white px-0 m-0 border-0 d-flex flex-column align-items-baseline">
                            <CustomToggle eventKey="menu" nodes={this.state.nodes} className="bg-dark text-white p-0">
                                <span className={`nav-link text-light fs-3 p-0 b-0`} style={{ "cursor": "pointer" }}>
                                    <FontAwesomeIcon icon={faPuzzlePiece} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Items</span>
                                </span>
                            </CustomToggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="menu" className="bg-dark text-white">
                            <Card.Body className="bg-dark d-flex flex-column align-items-baseline p-0">
                                <Nav className="mb-sm-auto flex-column align-items-baseline">
                                    <Nav.Item>
                                        <Accordion className="bg-dark" flush>
                                            <Card className="bg-dark text-white p-0 m-0 border-0">
                                                <Card.Header className="bg-dark text-white px-0 m-0 border-0 d-flex flex-column align-items-baseline">
                                                    <CustomToggle eventKey="2" nodes={this.state.nodes} className="bg-dark text-white p-0">
                                                        <FontAwesomeIcon icon={faLeaf} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Resources</span>
                                                    </CustomToggle>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey="2" className="bg-dark text-white">
                                                    <Card.Body className="bg-dark d-flex flex-column align-items-baseline p-0">
                                                        <span className={`nav-link ${this.getColor("2_0", nodes, "text-success", "text-warning")} fs-3 px-0`} style={{ "cursor": "pointer" }} onClick={() => this.onNavigationClicked("2_0", this.props.openResourcesCrud)}> <FontAwesomeIcon icon={faLeaf} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Resources</span></span>
                                                        <span className={`nav-link ${this.getColor("2_1", nodes, "text-success", "text-warning")} fs-3 px-0`} style={{ "cursor": "pointer" }} onClick={() => this.onNavigationClicked("2_1", this.props.openGatherResourceTypesCrud)}> <FontAwesomeIcon icon={faListAlt} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Types</span></span>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                                <Card.Header className="bg-dark text-white px-0 m-0 border-0 d-flex flex-column align-items-baseline">
                                                    <CustomToggle eventKey="4" nodes={this.state.nodes} className="bg-dark text-white p-0">
                                                        <FontAwesomeIcon icon={faVial} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Materials</span>
                                                    </CustomToggle>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey="4" className="bg-dark text-white">
                                                    <Card.Body className="bg-dark d-flex flex-column align-items-baseline p-0">
                                                        <span className={`nav-link ${this.getColor("4_0", nodes, "text-success", "text-warning")} fs-3 px-0`} style={{ "cursor": "pointer" }} onClick={() => this.onNavigationClicked("4_0", this.props.openRecipesCrud)}> <FontAwesomeIcon icon={faBookOpen} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Recipes</span></span>
                                                        <span className={`nav-link ${this.getColor("4_1", nodes, "text-success", "text-warning")} fs-3 px-0`} style={{ "cursor": "pointer" }} onClick={() => this.onNavigationClicked("4_1", this.props.openMaterialsCrud)}> <FontAwesomeIcon icon={faVial} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Materials</span></span>
                                                        <span className={`nav-link ${this.getColor("4_2", nodes, "text-success", "text-warning")} fs-3 px-0`} style={{ "cursor": "pointer" }} onClick={() => this.onNavigationClicked("4_2", this.props.openMaterialTypesCrud)}> <FontAwesomeIcon icon={faListAlt} /> <span className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-inline">Types</span></span>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                    </Nav.Item>
                                </Nav >
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </Navbar>
        </>
    }
}

export default NavbarComponent;