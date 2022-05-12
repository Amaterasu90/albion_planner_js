import React from "react";
import { Row, Col, Image, Tooltip, OverlayTrigger } from "react-bootstrap";
import Calculator from "../utils/Calculator";

class RecipeRequirements extends React.Component {

    getGrid = (returnRate, recipe) => {
        var components = [];
        this.getResourceStacks(returnRate, recipe).forEach((item) => components.push(item));
        this.getMaterialStacks(returnRate, recipe).forEach((item) => components.push(item));

        var componentsCount = components.length;
        var rows = componentsCount / 4;
        var rest = componentsCount % 4;

        var result = [];

        if (rows > 1) {
            for (var i = 0; i < Math.floor(rows); i++) {
                result.push(this.getLine(components.slice(i * 4, (i+1) * 4)));
            }
        }

        if (rest !== 0) {
            result.push(this.getLine(components.slice(components.length - rest, components.length), 4 - rest));
        }

        return result;
    }

    getLine = (columns, count) => {
        var emptySpaces = [];
        for (var i = 0; i < count; i++) {
            emptySpaces.push(<Col md="auto" className="m-0 p-0" style={{"width":"64px", "height":"64px"}}/>);
        }
        return <Row className="m-0 p-0 d-flex justify-content-center">{columns}{emptySpaces}</Row>
    }

    getRequirements = (returnRate, recipe) => {
        return !recipe || !recipe.materialStacks.length || !recipe.count ? null : <Row className="m-0 p-0">
            {this.getGrid(returnRate, recipe)}
        </Row>
    }

    getMaterialRequirement = (materialStackIndex, itemImageIdentifier, materialName, count) => {
        return <Col md="auto" className="m-0 p-0 d-flex align-items-start">
            <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={(props) => (
                    <Tooltip key={`material-name-tooltip_${materialStackIndex}`} id={`material-name-tooltip_${materialStackIndex}`} {...props}>
                        {materialName}
                    </Tooltip>)}>
                <figure className="position-relative m-0 p-0 ">
                    <Image src={this.props.imageRetriever ? this.props.imageRetriever.get("thumbnails/small", itemImageIdentifier) : null} style={{ cursor: "pointer" }} onClick={(e) => { console.log(`clicked: ${e}`) }} />
                    <figcaption className="text-warning text-center" style={{ "font-size": "0.55rem" }}>
                        {count}
                    </figcaption>
                </figure>
            </OverlayTrigger>
        </Col>
    }

    getMaterialStacks = (returnRate, recipe) => {
        var baseCount = Calculator.calculateFinalCount(returnRate, recipe.count);
        var stacks = [];

        recipe.materialStacks.map((stack, materialStackIndex) => {
            var count = (stack.material.type.isAffectedByReturnRate ? baseCount : recipe.count) * stack.count;
            const maxStackCount = 999;
            count = isNaN(count) ? 0 : count;

            for (var i = 0; i < Math.floor(count / maxStackCount); i++) {
                stacks.push(this.getMaterialRequirement(materialStackIndex, stack.material.itemImageIdentifier, stack.material.name, maxStackCount));
            }

            if (count % maxStackCount !== 0) {
                stacks.push(this.getMaterialRequirement(materialStackIndex, stack.material.itemImageIdentifier, stack.material.name, count % maxStackCount));
            }
        });

        return stacks;
    }

    getResourceStacks = (returnRate, recipe) => {
        var baseCount = Calculator.calculateFinalCount(returnRate, recipe.count);
        var stacks = [];
        recipe.resourceStacks.map((stack, resourceStackIndex) => {
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
        return <Col md="auto" className="m-0 p-0 d-flex align-items-start">
            <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={(props) => (
                    <Tooltip key={`resource-name-tooltip_${resourceStackIndex}`} id={`resource-name-tooltip_${resourceStackIndex}`} {...props}>
                        {resourceName}
                    </Tooltip>)}>
                <figure className="position-relative m-0 p-0 ">
                    <Image src={this.props.imageRetriever ? this.props.imageRetriever.get("thumbnails/small", itemImageIdentifier) : null} style={{ cursor: "pointer" }} onClick={(e) => { console.log(`clicked: ${e}`) }} />
                    <figcaption className="text-warning text-center" style={{ "font-size": "0.55rem" }}>
                        {count}
                    </figcaption>
                </figure>
            </OverlayTrigger>
        </Col>
    }

    getResourceRequirements = (returnRate, recipe) => {
        var baseCount = Calculator.calculateFinalCount(returnRate, recipe.count);
        return recipe.resourceStacks.map((stack, resourceStackIndex) => {
            var count = (stack.resource.type.isAffectedByReturnRate ? baseCount : recipe.count) * stack.count;
            const maxStackCount = 999;
            count = isNaN(count) ? 0 : count;

            var components = [];

            for (var i = 0; i < Math.floor(count / maxStackCount); i++) {
                components.push(this.getResourceRequirement(resourceStackIndex, stack.resource.itemImageIdentifier, stack.resource.name, maxStackCount));
            }

            if (count % maxStackCount !== 0) {
                components.push(this.getResourceRequirement(resourceStackIndex, stack.resource.itemImageIdentifier, stack.resource.name, count % maxStackCount))
            }

            return components;
        });
    }

    render() {
        var { recipe, retrunRate } = this.props;
        return <Row className="fs-6 p-0 pt-2 m-0 d-flex justify-content-center">
            <Col className="m-0 p-0 d-flex justify-content-center">
                {this.getRequirements(retrunRate, recipe)}
            </Col>
        </Row>
    }
}

export default RecipeRequirements;