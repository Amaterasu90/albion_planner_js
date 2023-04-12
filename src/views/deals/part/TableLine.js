import React from "react";
import { Row, Col, Tooltip, OverlayTrigger, FormControl, Container, Form } from "react-bootstrap";
import ProfitInformations from "./ProfitInformations";
import ItemStack from "./ItemStack";
import ActionButtons from "./ActionButtons";


class TableLine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hovered: false
        }
    }

    onTransitionEnterDelete = () => {
        this.setState({ hovered: true });
    }

    onTransitionExitDelete = () => {
        this.setState({ hovered: false });
    }

    onRemoveRecipe = (index) => {
        this.setState({ hovered: false });
        this.props.onRemoveRecipe(index);
    }

    render = () => {
        const { recipe, imageRetriever, index, model, view } = this.props;
        const { hovered } = this.state;
        const isOverLimit = this.props.inventoryCreator.tabsIsOverLimit(model.returnRate, model.recipes[index]);
        return <Row className="p-0 m-0 p-0 m-0 d-flex justify-content-start align-self-center" key={`recipe_${recipe.externalId}_${index}`} style={hovered ? { "backgroundColor": "#bb2d3b" } : { "backgroundColor": "#fff" }}>
            <Col xs="auto" className="p-0 m-0" style={index === 0
                ? { "border": "1px", "borderLeftStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderTopStyle": "solid" }
                : { "border": "1px", "borderLeftStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid" }}>
                <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={(props) => (
                        <Tooltip key={"material-name-tooltip"} id="material-name-tooltip" {...props}>
                            {recipe.material.name}
                        </Tooltip>)}>
                    <Col xs="auto" className="p-0 m-0">
                        {document.documentElement.clientWidth < 576 || document.documentElement.clientHeight < 400
                            ? <ItemStack imageRetriever={imageRetriever} size="extra-small" path={"thumbnails"} imageIdentifier={recipe.material.itemImageIdentifier} count={1} />
                            : <ItemStack imageRetriever={imageRetriever} size="small" path={"thumbnails"} imageIdentifier={recipe.material.itemImageIdentifier} count={1} />}
                    </Col>
                </OverlayTrigger>
            </Col>
            <Col className="p-0 m-0 text-left px-1" style={index === 0
                ? { "border": "1px", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderTopStyle": "solid" }
                : { "border": "1px", "borderRightStyle": "solid", "borderBottomStyle": "solid" }}>
                <Row className="m-0 p-0">
                    {
                        recipe.materialStacks.map((stack, materialStackIndex) => {
                            return <Col className="p-0 m-0 text-nowrap d-flex align-self-center" key={`stack_material_name_${stack.externalId}`}>
                                <Col xs="auto" className="p-0 m-0 text-left">
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={(props) => (
                                            <Tooltip key={`material-name-tooltip_${materialStackIndex}`} id={`material-name-tooltip_${materialStackIndex}`} {...props}>
                                                {stack.material.name}
                                            </Tooltip>)}>
                                        <Col xs="auto" className="p-0 m-0">
                                            {document.documentElement.clientWidth < 576 || document.documentElement.clientHeight < 400
                                                ? <ItemStack imageRetriever={imageRetriever} size="extra-small" path={"thumbnails"} imageIdentifier={stack.material.itemImageIdentifier} count={1} />
                                                : <ItemStack imageRetriever={imageRetriever} size="small" path={"thumbnails"} imageIdentifier={stack.material.itemImageIdentifier} count={1} />}
                                        </Col>
                                    </OverlayTrigger>
                                </Col>
                                <Col className="d-flex p-0 m-0 text-left align-self-center justify-content-center">
                                    <FormControl
                                        className="p-0"
                                        size={document.documentElement.clientWidth < 576 || document.documentElement.clientHeight < 400 ? "sm" : "lg"}
                                        placeholder="Price"
                                        value={model.recipes[index].materialStacks[materialStackIndex].unitCost}
                                        onChange={(e) => { this.props.onChangeMaterialStackCost(model, index, materialStackIndex, e); }} />
                                </Col>
                            </Col>;
                        })
                    }
                </Row>
            </Col>
            <Col className="text-left p-0 m-0 px-1" style={index === 0
                ? { "border": "1px", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderTopStyle": "solid" }
                : { "border": "1px", "borderRightStyle": "solid", "borderBottomStyle": "solid" }}>
                <Row className="m-0 p-0">
                    {
                        recipe.resourceStacks.map((stack, resourceStackIndex) => {
                            return <Col className="p-0 m-0 text-nowrap d-flex align-self-center" key={`stack_resource_name_${stack.externalId}`}>
                                <Col xs="auto" className="p-0 m-0 text-left">
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={(props) => (
                                            <Tooltip key={`resource-name-tooltip_${resourceStackIndex}`} id={`resource-name-tooltip_${resourceStackIndex}`} {...props}>
                                                {stack.resource.name}
                                            </Tooltip>)}>
                                        <Col xs="auto" className="p-0 m-0">
                                            {document.documentElement.clientWidth < 576 || document.documentElement.clientHeight < 400
                                                ? <ItemStack imageRetriever={imageRetriever} size="extra-small" path={"thumbnails"} imageIdentifier={stack.resource.itemImageIdentifier} count={1} />
                                                : <ItemStack imageRetriever={imageRetriever} size="small" path={"thumbnails"} imageIdentifier={stack.resource.itemImageIdentifier} count={1} />}
                                        </Col>
                                    </OverlayTrigger>
                                </Col>
                                <Col className="p-0 m-0 text-left align-self-center justify-content-center">
                                    <FormControl
                                        className="p-0"
                                        size={document.documentElement.clientWidth < 576 || document.documentElement.clientHeight < 400 ? "sm" : "lg"}
                                        placeholder="Price"
                                        value={model.recipes[index].resourceStacks[resourceStackIndex].unitCost}
                                        onChange={(e) => { this.props.onChangeResourceStackCost(model, index, resourceStackIndex, e); }} />
                                </Col>
                            </Col>;
                        })
                    }
                </Row>
            </Col>
            <Col className="p-0 m-0 px-1 text-left d-flex align-items-stretch" style={index === 0
                ? { "border": "1px", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderTopStyle": "solid" }
                : { "border": "1px", "borderRightStyle": "solid", "borderBottomStyle": "solid" }}>
                <Container className="p-0 m-0 d-flex align-self-start" fluid>
                    {
                        isOverLimit
                            ? <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={(props) => (<div
                                {...props}
                                style={{
                                  position: 'absolute',
                                  backgroundColor: 'rgba(255, 100, 100, 0.85)',
                                  padding: '10px 10px',
                                  color: 'white',
                                  borderRadius: 3,
                                  ...props.style,
                                }}
                              >
                                This number is to big
                              </div>)}>
                            <Form.Control
                                className="p-0 my-2"
                                size={document.documentElement.clientWidth < 576 || document.documentElement.clientHeight < 400 ? "sm" : "lg"}
                                placeholder="Goal material count"
                                isInvalid={isOverLimit}
                                value={model.recipes[index].count} onChange={(e) => { this.props.onChangeCount(model, index, e); }} />
                        </OverlayTrigger>
                            : <Form.Control
                            className="p-0 my-2"
                            size={document.documentElement.clientWidth < 576 || document.documentElement.clientHeight < 400 ? "sm" : "lg"}
                            placeholder="Goal material count"                                
                            value={model.recipes[index].count} onChange={(e) => { this.props.onChangeCount(model, index, e); }} />
                    }
                </Container>
            </Col>
            <Col className="text-left px-1 p-0 m-0 d-flex align-items-stretch" style={index === 0
                ? { "border": "1px", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderTopStyle": "solid" }
                : { "border": "1px", "borderRightStyle": "solid", "borderBottomStyle": "solid" }}>
                <Container className="p-0 m-0 d-flex align-self-start" fluid>
                    <FormControl
                        className="p-0 my-2"
                        size={document.documentElement.clientWidth < 576 || document.documentElement.clientHeight < 400 ? "sm" : "lg"}
                        placeholder="Market price"
                        value={model.recipes[index].price} onChange={(e) => { this.props.onChangePrice(model, index, e); }} />
                </Container>
            </Col>
            <Col xs="auto" className="text-left p-0 m-0 fs-5 " style={index === 0
                ? { "width": "250px", "border": "1px", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderTopStyle": "solid" }
                : { "width": "250px", "border": "1px", "borderRightStyle": "solid", "borderBottomStyle": "solid" }}>
                <ProfitInformations returnRate={model.returnRate} recipe={model.recipes[index]} costPer100={model.costPer100} tax={model.tax} profitRate={model.profitRate} />
            </Col>
            <Col xs="auto" className="text-left p-0 m-0 fs-5 d-flex align-items-stretch" style={{ "backgroundColor": "#fff", "width": "100px" }}>
                <ActionButtons
                    onTransitionEnterDelete={() => this.onTransitionEnterDelete(index)}
                    onTransitionExitDelete={() => this.onTransitionExitDelete()}
                    model={model}
                    view={view}
                    index={index}
                    onRemoveRecipe={() => this.onRemoveRecipe(index)}
                    onOpenRequirements={this.props.onOpenRequirements}
                    inventoryCreator={this.props.inventoryCreator}
                    handleReady={this.props.handleReady}
                    handleClose={this.props.handleClose} />
            </Col>
        </Row >
    }
}

export default TableLine;