import React from "react";
import { Row, Col, Tooltip, Image, OverlayTrigger, Tab, Nav } from "react-bootstrap";
import Calculator from "../utils/Calculator";
import "./../css/inventory.css"

class RecipeRequirements extends React.Component {

    constructor(props) {
        super(props);

        var { inventoryCreator, returnRate, recipe } = this.props;
        this.state = inventoryCreator.createStacks(returnRate, recipe);
    }

    generateGrid = (tab) => {
        return tab.grid.map((columnsData) => {
            var columns = columnsData.map((element) => {
                return element ? this.generateItemStack(element) : <Col className="p-0 d-flex align-items-center col-md-auto" style={{ "width": "64px", "height": "64px" }} />
            });

            return <Row className="m-0 p-0 d-flex justify-content-center align-items-start" style={{ "width": "17.5rem" }}>{columns}</Row>
        });
    }

    generateItemStack = (model) => {
        return <Col md="auto" className="p-0 d-flex align-items-center">
            <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={(props) => (
                    <Tooltip key={`resource-name-tooltip_${model.index}`} id={`resource-name-tooltip_${model.index}`} {...props}>
                        {model.name}
                    </Tooltip>)}>
                <figure className="position-relative m-0">
                    <Image src={this.props.imageRetriever ? this.props.imageRetriever.get("thumbnails/small", model.imageIdentifier) : null} />
                    <figcaption className={`text-warning ${model.count < 10 ? "oneSign" : model.count < 100 ? "twoSign" : "treeSign"}`} style={{ "font-size": "0.55rem" }}>
                        {model.count}
                    </figcaption>
                </figure>
            </OverlayTrigger>
        </Col>
    }

    generateTabButtons = (buttons) => {
        return buttons.map((button, index) => {
            const { item, link } = button;
            const { name, active, ...props } = link;
            return <Nav.Item {...item}>
                <Nav.Link {...props} onClick={(e) => this.onTabButtonHandler(e, index)} style={active ? {
                    "color": "white",
                    "border": "2px solid #a07b5d",
                    "border-top-left-radius": "0px",
                    "border-bottom-right-radius": "0.25rem",
                    "background-color": "#a07b5d"
                } : {
                    "color": "#5a3f2c",
                    "border": "2px solid #a07b5d",
                    "border-top-left-radius": "0px",
                    "border-bottom-right-radius": "0.25rem",
                    "background-color": "#cdaf93"
                }}>{name}</Nav.Link>
            </Nav.Item>
        });
    }

    onTabButtonHandler = (e, i) => {
        var buttons = JSON.parse(JSON.stringify(this.state.buttons));
        buttons.forEach(element => {
            element.link.active = false;
        });
        buttons[i].link.active = true;

        this.setState({ buttons: buttons });

        var tabsContent = JSON.parse(JSON.stringify(this.state.tabsContent));
        tabsContent.forEach(element => {
            element.active = false;
        });
        tabsContent[i].active = true;

        this.setState({ tabsContent: tabsContent });
    }

    generateTransportPlan = (tabsContent) => {
        return <figure className="position-relative m-0 p-0">
            <Image src={this.props.imageRetriever ? this.props.imageRetriever.get("view", "inventory") : null} />
            <figcaption id={`inventory`} className="text-warning" >
                <Row className="m-0 p-0" style={{ "margin-left": "0.6rem" }}>
                    {this.generateGrid(tabsContent.find((item) => item.active))}
                </Row>
            </figcaption>
        </figure>;
    }

    generateTransportPlans = (recipe, tabsContent, buttons) => {
        return !recipe || !recipe.count ? null :
            buttons.length === 1
                ? this.generateTransportPlan(tabsContent)
                : <Tab.Container defaultActiveKey="inventory-1" className="p-0 m-0">
                    <Row className="m-0 p-0">
                        <Col sm="auto" className="m-0 p-0">
                            <Tab.Content>
                                {this.generateTransportPlan(tabsContent)}
                            </Tab.Content>
                        </Col>
                        <Col xs lg="3" className="m-0 p-0">
                            <figure className="position-relative m-0 p-0">
                                <Nav variant="tabs" className="flex-column m-0 p-0">
                                    <figcaption className="text-warning tabs-location" >
                                        {this.generateTabButtons(buttons)}
                                    </figcaption>
                                </Nav>
                            </figure>
                        </Col>
                    </Row>
                </Tab.Container>
    }

    getMaterialRequirement = (materialStackIndex, itemImageIdentifier, materialName, count) => {
        return <Col md="auto" className="p-0 d-flex align-items-center">
            <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={(props) => (
                    <Tooltip key={`material-name-tooltip_${materialStackIndex}`} id={`material-name-tooltip_${materialStackIndex}`} {...props}>
                        {materialName}
                    </Tooltip>)}>
                <figure className="position-relative m-0">
                    <Image src={this.props.imageRetriever ? this.props.imageRetriever.get("thumbnails/small", itemImageIdentifier) : null} />
                    <figcaption className="text-warning" style={{ "font-size": "0.55rem" }}>
                        {count}
                    </figcaption>
                </figure>
            </OverlayTrigger>
        </Col>
    }



    getResourceStacks = (returnRate, recipe) => {

        if (!returnRate || !recipe) {
            return [];
        }

        var baseCount = Calculator.calculateFinalCount(returnRate, recipe.count);
        var stacks = [];
        recipe.resourceStacks.forEach((stack, resourceStackIndex) => {
            var count = (stack.resource.type.isAffectedByReturnRate ? baseCount : recipe.count) * stack.count;
            const maxStackCount = 999;
            count = isNaN(count) ? 0 : count;

            for (var i = 0; i < Math.floor(count / maxStackCount); i++) {
                stacks.push(this.getResourceRequirement(resourceStackIndex, stack.resource.itemImageIdentifier, stack.resource.name, maxStackCount));
            }

            if (count % maxStackCount !== 0) {
                stacks.push(this.getResourceRequirement(resourceStackIndex, stack.resource.itemImageIdentifier, stack.resource.name, count % maxStackCount));
            }
        });

        return stacks;
    }

    getResourceRequirement = (resourceStackIndex, itemImageIdentifier, resourceName, count) => {
        return <Col md="auto" className="p-0 d-flex align-items-center">
            <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={(props) => (
                    <Tooltip key={`resource-name-tooltip_${resourceStackIndex}`} id={`resource-name-tooltip_${resourceStackIndex}`} {...props}>
                        {resourceName}
                    </Tooltip>)}>
                <figure className="position-relative m-0">
                    <Image src={this.props.imageRetriever ? this.props.imageRetriever.get("thumbnails/small", itemImageIdentifier) : null} />
                    <figcaption className="text-warning" style={{ "font-size": "0.55rem" }}>
                        {count}
                    </figcaption>
                </figure>
            </OverlayTrigger>
        </Col>
    }

    componentDidMount = () => {
        this.props.handleReady(this.props.view);
    }

    render() {
        var { recipe } = this.props;
        var { tabsContent, buttons } = this.state;
        return <Row className="fs-6 p-0 m-0 d-flex justify-content-start">
            <Col md="auto" className="m-0 p-0 d-flex justify-content-center">
                {this.generateTransportPlans(recipe, tabsContent, buttons)}
            </Col >
        </Row >
    }
}

export default RecipeRequirements;