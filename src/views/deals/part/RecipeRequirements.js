import React from "react";
import {Row, Col} from "react-bootstrap";
import Calculator from "../utils/Calculator";

class RecipeRequirements extends React.Component {
    getResourceRequirements = (returnRate, recipe) => {
        var baseCount = Calculator.calculateFinalCount(returnRate, recipe.count);
        return recipe.resourceStacks.map((stack) => {
            var count = (stack.resource.type.isAffectedByReturnRate ? baseCount : recipe.count) * stack.count;
            count = isNaN(count) ? 0 : count;
            return <Row className="m-0 p-0 d-flex" key={`resource_requirement_${recipe.externalId}_${stack.externalId}`}>
                <Row className="m-0 p-0 align-self-center">
                    <Col className="m-0 p-0">{stack.resource.name} {count}</Col>
                </Row>
            </Row>
        });
    }

    getMaterialRequirements = (returnRate, recipe) => {
        var baseCount = Calculator.calculateFinalCount(returnRate, recipe.count);
        return recipe.materialStacks.map((stack) => {
            var count = (stack.material.type.isAffectedByReturnRate ? baseCount : recipe.count) * stack.count;
            count = isNaN(count) ? 0 : count;
            return <Row className="m-0 p-0 d-flex" key={`material_requirement_${recipe.externalId}_${stack.externalId}`}>
                <Row className="m-0 p-0 align-self-center">
                    <Col className="m-0 p-0">{stack.material.name} {count}</Col>
                </Row>
            </Row>
        });
    }

    getMaterialRequirementsPart = (returnRate, recipe) => {
        return !recipe || !recipe.materialStacks.length ? null : <Row className="p-0 m-0">
            <Row className="p-0 m-0">
                Materials:
            </Row>
            <Row className="p-0 m-0 d-flex">
                <Col className="p-0 m-0 align-self-center">{this.getMaterialRequirements(returnRate, recipe)}</Col>
            </Row>
        </Row>
    }

    getResourceRequirementsPart = (returnRate, recipe) => {
        return !recipe || !recipe.resourceStacks.length ? null : <Row className="p-0 m-0">
            <Row className="p-0 m-0">
                Resources:
            </Row>
            <Row className="p-0 m-0 d-flex">
                <Col className="p-0 m-0 align-self-center">{this.getResourceRequirements(returnRate, recipe)}</Col>
            </Row>
        </Row>
    }

    render() {
        var { recipe, retrunRate } = this.props;
        return <Col md={11} className="text-left p-0 m-0 fs-6">
            {this.getMaterialRequirementsPart(retrunRate, recipe)}
            {this.getResourceRequirementsPart(retrunRate, recipe)}
        </Col>
    }
}

export default RecipeRequirements;