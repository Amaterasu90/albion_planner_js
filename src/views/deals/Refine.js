import CrudRequestDataFactory from "../../factories/CrudRequestDataFactory";
import RequestDataFactory from "../../factories/RequestDataFactory";
import RelatedAsyncSelect from "../../components/modal/form/RelatedAsyncSelect";
import React from "react";
import { Col, Row, Button, FormControl, FormLabel, } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/fontawesome-free-solid'

class Refine extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            model: {
                currentRecipe: {
                    externalId: "",
                    material: {
                        externalId: "",
                        name: ""
                    },
                    name: "",
                    tier: 0,
                    enhancement: 0,
                    resourceStacks: [{
                        unitCost: null,
                        externalId: "",
                        resource: {
                            externalId: "",
                            name: ""
                        },
                        count: 0
                    }],
                    materialStacks: [{
                        unitCost: 0,
                        externalId: "",
                        material: {
                            externalId: "",
                            name: ""
                        },
                        count: 0
                    }]
                },
                returnRate: 10,
                costPer100: 100,
                recipes: [{
                    count: null,
                    externalId: "",
                    material: {
                        externalId: "",
                        name: ""
                    },
                    name: "",
                    tier: 0,
                    enhancement: 0,
                    resourceStacks: [{
                        unitCost: null,
                        externalId: "",
                        resource: {
                            externalId: "",
                            name: ""
                        },
                        count: 0
                    }],
                    materialStacks: [{
                        unitCost: 0,
                        externalId: "",
                        material: {
                            externalId: "",
                            name: ""
                        },
                        count: 0
                    }]
                }]
            }
        }

        this.refineRecipeDataFactory = new CrudRequestDataFactory("refine", new RequestDataFactory());
    }

    componentDidMount = () => {
        var requestData = this.refineRecipeDataFactory.createGet();
        fetch(requestData.url, requestData.requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    const { containsRelatedElements, ...data } = result;
                    var model = JSON.parse(JSON.stringify(this.state.model));
                    model.currentRecipe = data[0];
                    model.recipes[0] = data[0]; // todo: remove it will be unused
                    this.setState({ model: model });
                },
                (error) => {
                }
            );
    }

    getRecipe = (externalId) => {
        var requestData = this.refineRecipeDataFactory.createGetDetails(externalId);
        fetch(requestData.url, requestData.requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    const { containsRelatedElements, ...data } = result;
                    var model = JSON.parse(JSON.stringify(this.state.model));
                    model.currentRecipe = data;
                    this.setState({ model: model });
                },
                (error) => {
                }
            );
    }

    addRecipe = (e) => {
        var model = JSON.parse(JSON.stringify(this.state.model));
        var recipes = model.recipes;
        if (!recipes[0].externalId) {
            recipes.pop()
        }

        if (recipes.find((item) => item.externalId === model.currentRecipe.externalId) || recipes.externalId === "") {
            return;
        }

        recipes.push(model.currentRecipe);
        this.setState({ model: model });
    }

    removeRecipe = (recipeIndex) => {
        var model = JSON.parse(JSON.stringify(this.state.model));
        if (model.recipes.length <= 1) {
            return;
        }

        model.recipes.shift(recipeIndex);

        this.setState({ model: model });
    }

    getDeleteButtons = (model, recipeIndex) => {
        return model.recipes.length <= 1 ? null : <Button variant="danger" className="btn-block mr-1 pb-2 mt-0" onClick={() => {
            this.removeRecipe(recipeIndex);
        }}><FontAwesomeIcon icon={faTrash} /></Button>
    }

    calculateRefineCost = (returnRate, recipe) => {
        debugger;
        var finalCount = this.calculateFinalCount(returnRate, recipe.count);
        var cost = recipe.count === 0
            || recipe.resourceStacks.map((item) => item.unitCost).includes(0)
            || recipe.materialStacks.map((item) => item.unitCost).includes(0)
            ? 0
            : (recipe.resourceStacks.reduce((previousValue, currentValue) => {
                return previousValue + currentValue.count * currentValue.unitCost;
            }, 0) + recipe.materialStacks.reduce((previousValue, currentValue) => {
                return previousValue + currentValue.count * currentValue.unitCost;
            }, 0)) * finalCount;

        return isNaN(cost) ? 0 : cost;
    }

    calculateFinalCount(retrunRate, count) {
        var y = count;
        var a = retrunRate / 100;
        var r = 1;

        var n = Math.ceil(Math.log10(y));
        for (var i = 1; i <= n; i++) {
            r += Math.pow(a, i);
        }

        return Math.round(y / r);
    }

    setResourceStackCost = (model, recipeIndex, resourceStackIndex, e) => {
        model.recipes[recipeIndex].resourceStacks[resourceStackIndex].unitCost = parseInt(e.currentTarget.value, 10);
        this.setState({ model: model });
    }

    setMaterialStackCost = (model, recipeIndex, materialStackIndex, e) => {
        model.recipes[recipeIndex].materialStacks[materialStackIndex].unitCost = parseInt(e.currentTarget.value, 10);
        this.setState({ model: model });
    }

    setCount = (model, recipeIndex, e) => {
        model.recipes[recipeIndex].count = parseInt(e.currentTarget.value, 10);
        this.setState({ model: model });
    }

    setReturnRate = (model, e) => {
        model.returnRate = parseInt(e.currentTarget.value, 10);
        this.setState({ model: model });
    }

    setProductioncostPer100 = (model, e) => {
        model.costPer100 = parseInt(e.currentTarget.value, 10);
        this.setState({ model: model });
    }

    getMaterialRequirements = (model) => {
        return "none";
    }

    getResourceRequirements = (model) => {
        return "none";
    }

    render() {
        const { model } = this.state;
        return <Row className="mx-2">
            <Row className="text-center text-dark pb-2 fs-4">
                <Col md={11}>
                    <Row className="text-center d-flex align-self-start pb-2" >
                        <Col md={3} className="text-center d-flex align-self-start" >
                            <FormLabel className="mx-2 mb-0 mt-1">Refined recipe</FormLabel>
                            <RelatedAsyncSelect
                                id="refineRecipeId"
                                placeholder="RefineRecipe"
                                defaultValue={model.currentRecipe}
                                dataFactory={this.refineRecipeDataFactory}
                                size={9} onChangeCustom={this.getRecipe} />
                        </Col>
                        <Col md={1} className="d-flex p-0 mt-0">
                            <Button className="btn-block ml-3 mr-1 btn-lg mt-0" onClick={this.addRecipe}>Add recipe</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="text-center text-dark pb-2 fs-4">
                <Col md={11}>
                    <Row className="text-center d-flex align-self-start pb-2" >
                        <Col md={2} className="d-flex align-self-start text-nowrap">
                            <FormLabel className="mx-2 mb-0">Return rate</FormLabel>
                            <FormControl placeholder="Return Rate" value={model.returnRate} onChange={(e) => { this.setReturnRate(model, e); }} />
                        </Col>
                        <Col md={2} className="d-flex align-self-start text-nowrap">
                            <FormLabel className="mx-2 mb-0">Cost per 100 food unit</FormLabel>
                            <FormControl placeholder="Cost per 100 food unit" value={model.costPer100} onChange={(e) => { this.setProductioncostPer100(model, e); }} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="text-dark mx-3 pb-2" md={10}>
                <Row className="pb-2 px-0">
                    <Row className="pb-2">
                        <Col className="text-left d-flex align-self-start">Name</Col>
                        <Col md={2} className="text-left d-flex align-self-start">Materials</Col>
                        <Col md={2} className="text-left d-flex align-self-start">Resources</Col>
                        <Col className="text-left d-flex align-self-start">Count</Col>
                        <Col className="text-left d-flex align-self-start">Refine Cost</Col>
                        <Col className="text-left d-flex align-self-start">Requiremnets</Col>
                        <Col className="text-left d-flex align-self-start"></Col>
                    </Row>
                    {model.recipes.map((recipe, recipeIndex) => {
                        return <Row className="fs-4 pb-2">
                            <Col className="text-left d-flex justify-content-start">{recipe.material.name}</Col>
                            <Col md={2} className="text-left">
                                {recipe.materialStacks.map((stack, materialStackIndex) => {
                                    return <Row className="pb-2 text-nowrap">
                                        <Row className="pb-2">
                                            <Col md={9} className="text-left d-flex justify-content-start">{stack.material.name}</Col>
                                            <Col md={3} className="text-left d-flex justify-content-start">
                                                <FormControl placeholder="Price" value={model.recipes[recipeIndex].materialStacks[materialStackIndex].unitCost} onChange={(e) => { this.setMaterialStackCost(model, recipeIndex, materialStackIndex, e); }} />
                                            </Col>
                                        </Row>
                                    </Row>;
                                })}
                            </Col>
                            <Col md={2} className="text-left">
                                {recipe.resourceStacks.map((stack, resourceStackIndex) => {
                                    return <Row className="pb-2 text-nowrap">
                                        <Row className="pb-2">
                                            <Col md={9} className="text-left d-flex justify-content-start">{stack.resource.name}</Col>
                                            <Col md={3} className="text-left d-flex justify-content-start">
                                                <FormControl placeholder="Price" value={model.recipes[recipeIndex].resourceStacks[resourceStackIndex].unitCost} onChange={(e) => { this.setResourceStackCost(model, recipeIndex, resourceStackIndex, e); }} />
                                            </Col>
                                        </Row>
                                    </Row>;
                                })}
                            </Col>
                            <Col>
                                <Col className="text-left d-flex justify-content-start">
                                    <FormControl placeholder="Goal material count" value={model.recipes[recipeIndex].count} onChange={(e) => { this.setCount(model, recipeIndex, e); }} />
                                </Col>
                            </Col>
                            <Col className="text-left d-flex justify-content-start">
                                {this.calculateRefineCost(model.returnRate, model.recipes[recipeIndex])}
                            </Col>
                            <Col className="text-left ">
                                <Row className="pb-2 text-nowrap">
                                    <Col className="d-flex justify-content-start">{this.getMaterialRequirements(model)}</Col>
                                </Row>
                                <Row className="pb-2 text-nowrap ">
                                    <Col className="d-flex justify-content-start">{this.getResourceRequirements(model)}</Col>
                                </Row>
                            </Col>
                            <Col className="text-left pb-2 fs-4">
                                {this.getDeleteButtons(model, recipeIndex)}
                            </Col>
                        </Row>
                    })}
                </Row >
            </Row>
        </Row>
    }
}

export default Refine;