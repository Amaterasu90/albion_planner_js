import CrudRequestDataFactory from "../../factories/CrudRequestDataFactory";
import RequestDataFactory from "../../factories/RequestDataFactory";
import RelatedAsyncSelect from "../../components/modal/form/RelatedAsyncSelect";
import React from "react";
import { Col, Row, Button, FormControl, FormLabel, OverlayTrigger, Tooltip, Form } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/fontawesome-free-solid'
const numberformat = require('swarm-numberformat')

const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        {props.content}
    </Tooltip>
);

class Refine extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            model: {
                currentRecipe: {
                    externalId: "",
                    price: 0,
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
                            type: { name: "", isAffectedByReturnRate: false },
                            name: ""
                        },
                        count: 0
                    }],
                    materialStacks: [{
                        unitCost: 0,
                        externalId: "",
                        material: {
                            externalId: "",
                            type: { name: "", isAffectedByReturnRate: false },
                            name: ""
                        },
                        count: 0
                    }]
                },
                returnRate: 25.6,
                tax: 0.03,
                costPer100: 100,
                recipes: [{
                    count: null,
                    externalId: "",
                    price: null,
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
                            type: { name: "", isAffectedByReturnRate: false },
                            name: ""
                        },
                        count: 0
                    }],
                    materialStacks: [{
                        unitCost: 0,
                        externalId: "",
                        material: {
                            externalId: "",
                            type: { name: "", isAffectedByReturnRate: false },
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
        return model.recipes.length <= 1 ? null :
            <Button variant="danger" className="btn-block" onClick={() => { this.removeRecipe(recipeIndex); }}>
                <FontAwesomeIcon icon={faTrash} />
            </Button>
    }

    calculateProfit = (returnRate, recipe, costPer100, tax) => {
        if (isNaN(returnRate)
            || isNaN(costPer100)
            || isNaN(tax)
            || isNaN(recipe.price)
            || isNaN(recipe.count)
            || recipe.resourceStacks.find((item) => !item.unitCost || item.unitCost === 0)
            || recipe.materialStacks.find((item) => !item.unitCost || item.unitCost === 0)) {
            return null;
        }

        var cost = this.calculateRefineCost(returnRate, recipe, costPer100);
        var taxCost = tax * (recipe.price * recipe.count);
        var allCosts = cost + taxCost;

        return (recipe.price * recipe.count) - allCosts;
    }

    calculateRefineCost = (returnRate, recipe, costPer100) => {
        if (!recipe.count || recipe.count === 0 || !returnRate || returnRate === 0
            || recipe.resourceStacks.find((item) => !item.unitCost || item.unitCost === 0)
            || recipe.materialStacks.find((item) => !item.unitCost || item.unitCost === 0)) {
            return 0;
        }

        const initialValue = 0;
        var baseCount = this.calculateFinalCount(returnRate, recipe.count);

        var resourcesAffectedByRetrunRate = recipe.resourceStacks.filter((item) => item.resource.type.isAffectedByReturnRate);
        var materialsAffectedByRetrunRate = recipe.materialStacks.filter((item) => item.material.type.isAffectedByReturnRate);
        var costElementsAffectedByReturnRate =
            (
                resourcesAffectedByRetrunRate.reduce((previousValue, currentValue) => previousValue + currentValue.count * currentValue.unitCost, initialValue)
                + materialsAffectedByRetrunRate.reduce((previousValue, currentValue) => previousValue + currentValue.count * currentValue.unitCost, initialValue)
            ) * baseCount;

        var resourcesNotAffectedByRetrunRate = recipe.resourceStacks.filter((item) => !item.resource.type.isAffectedByReturnRate);
        var materialsNotAffectedByRetrunRate = recipe.materialStacks.filter((item) => !item.material.type.isAffectedByReturnRate);

        var costElementsNotAffectedByReturnRate =
            (
                resourcesNotAffectedByRetrunRate.reduce((previousValue, currentValue) => previousValue + currentValue.count * currentValue.unitCost, initialValue)
                + materialsNotAffectedByRetrunRate.reduce((previousValue, currentValue) => previousValue + currentValue.count * currentValue.unitCost, initialValue)
            )
            * recipe.count;

        var productionCost = this.getProductionCost(recipe, costPer100) * recipe.count;
        return costElementsAffectedByReturnRate + costElementsNotAffectedByReturnRate + productionCost;
    }

    calculateFinalCount(retrunRate, count) {

        if (isNaN(count) || isNaN(retrunRate)) {
            return 0;
        }

        var y = count;
        var a = parseFloat(retrunRate, 10) / 100;
        var r = 1;

        var n = Math.ceil(Math.log10(y));
        for (var i = 1; i <= n; i++) {
            r += Math.pow(a, i);
        }

        return Math.round(y / r);
    }

    setResourceStackCost = (model, recipeIndex, resourceStackIndex, e) => {
        var unitCost = parseInt(e.currentTarget.value, 10);
        model.recipes[recipeIndex].resourceStacks[resourceStackIndex].unitCost = isNaN(unitCost) ? "" : unitCost;
        this.setState({ model: model });
    }

    setMaterialStackCost = (model, recipeIndex, materialStackIndex, e) => {
        var unitCost = parseInt(e.currentTarget.value, 10);
        model.recipes[recipeIndex].materialStacks[materialStackIndex].unitCost = isNaN(unitCost) ? "" : unitCost;
        this.setState({ model: model });
    }

    setPrice = (model, recipeIndex, e) => {
        var price = parseInt(e.currentTarget.value, 10);
        model.recipes[recipeIndex].price = isNaN(price) ? "" : price;
        this.setState({ model: model });
    }

    setCount = (model, recipeIndex, e) => {
        var count = parseInt(e.currentTarget.value, 10);
        model.recipes[recipeIndex].count = isNaN(count) ? "" : count;
        this.setState({ model: model });
    }

    setReturnRate = (model, e) => {
        model.returnRate = e.currentTarget.value;

        this.setState({ model: model });
    }

    setTax = (model, e) => {
        model.tax = parseInt(e.currentTarget.value, 10);
        this.setState({ model: model });
    }

    setProductioncostPer100 = (model, e) => {
        model.costPer100 = parseInt(e.currentTarget.value, 10);
        this.setState({ model: model });
    }

    getMaterialRequirements = (returnRate, recipe) => {
        var baseCount = this.calculateFinalCount(returnRate, recipe.count);
        return recipe.materialStacks.map((stack) => {
            var count = (stack.material.type.isAffectedByReturnRate ? baseCount : recipe.count) * stack.count;
            count = isNaN(count) ? 0 : count;
            return <Row className="m-0 p-0 d-flex">
                <Row className="m-0 p-0 align-self-center">
                    <Col className="m-0 p-0">{stack.material.name} {count}</Col>
                </Row>
            </Row>
        });
    }

    getProfit = (returnRate, recipe, costPer100, tax) => {
        var profit = this.calculateProfit(returnRate, recipe, costPer100, tax);
        if(!profit){
            return null;
        }

        return numberformat.format(profit, { suffixes: ['', ' k', ' m', ' b', ' t'] });
    }

    getProductionCost = (recipe, costPer100) => {
        var baseCosts = [, , , 90, 180, 360, 720, 1440, 2880, 5760, 11520, 23038];
        var cost = Math.round((baseCosts[recipe.tier + recipe.enhancement] * costPer100) / 10000);
        return recipe.tier <= 2
            || recipe.resourceStacks.find((item) => !item.resource.type.isAffectedByReturnRate)
            || recipe.materialStacks.find((item) => !item.material.type.isAffectedByReturnRate) ? 0 : cost
    }

    getResourceRequirements = (returnRate, recipe) => {
        var baseCount = this.calculateFinalCount(returnRate, recipe.count);
        return recipe.resourceStacks.map((stack) => {
            var count = (stack.resource.type.isAffectedByReturnRate ? baseCount : recipe.count) * stack.count;
            count = isNaN(count) ? 0 : count;
            return <Row className="m-0 p-0 d-flex">
                <Row className="m-0 p-0 align-self-center">
                    <Col className="m-0 p-0">{stack.resource.name} {count}</Col>
                </Row>
            </Row>
        });
    }

    render() {
        const { model } = this.state;
        return <Row className="mx-2 fs-6">
            <Row className="text-center text-nowrap text-dark pb-2 fs-6">
                <Col md={11}>
                    <Row className="text-center d-flex align-self-start pb-2" >
                        <Col className="text-center d-flex justify-content-start" >
                            <FormLabel className="mx-2 mb-0 mt-1 align-self-center">Refined recipe</FormLabel>
                            <RelatedAsyncSelect
                                id="refineRecipeId"
                                placeholder="RefineRecipe"
                                defaultValue={model.currentRecipe}
                                dataFactory={this.refineRecipeDataFactory}
                                size={2} onChangeCustom={this.getRecipe} />
                            <Button className="btn-block mx-2 btn-sm mt-0" onClick={this.addRecipe}>Add recipe</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="text-center text-dark pb-2 fs-6">
                <Col md={11}>
                    <Row className="text-center d-flex align-self-start pb-2" >
                        <Col md={2} className="d-flex align-self-start text-nowrap">
                            <FormLabel className="mx-2 mb-0 align-self-center">Return rate</FormLabel>
                            <FormControl placeholder="Return Rate" value={model.returnRate} onChange={(e) => { this.setReturnRate(model, e); }} />
                        </Col>
                        <Col md={2} className="d-flex align-self-start text-nowrap">
                            <FormLabel className="mx-2 mb-0 align-self-center">Cost per 100 food unit</FormLabel>
                            <FormControl placeholder="Cost per 100 food unit" value={model.costPer100} onChange={(e) => { this.setProductioncostPer100(model, e); }} />
                        </Col>
                        <Col md={2} className="d-flex align-self-start text-nowrap">
                            <FormLabel className="mx-2 mb-0 align-self-center">Tax</FormLabel>
                            <Form.Select placeholder="Cost per 100 food unit" onChange={(e) => { this.setTax(model, e); }} >
                                <option value="0.03">Premium (3%)</option>
                                <option value="0.06">Non-Premium (6%)</option>
                            </Form.Select>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="text-dark m-0 p-0 fs-6 d-flex" md={10}>
                <Row className="p-0 m-0 d-flex align-self-center">
                    <Row className="p-0 m-0 d-flex text-nowrap align-self-center">
                        <Col className="p-0 m-0 text-left align-self-center">Name</Col>
                        <Col md={2} className="p-0 m-0 text-left align-self-center">Materials</Col>
                        <Col md={2} className="p-0 m-0 text-left align-self-center">Resources</Col>
                        <Col className="p-0 m-0 text-left align-self-center">Count</Col>
                        <Col className="p-0 m-0 text-left align-self-center">Price</Col>
                        <Col md={2} className="p-0 m-0 text-left align-self-center">Requiremnets</Col>
                        <Col className="p-0 m-0 text-left align-self-center">Profit</Col>
                        <Col className="p-0 m-0 text-left align-self-center"></Col>
                    </Row>
                    <Row className="p-0 m-0 d-flex">
                        {model.recipes.map((recipe, recipeIndex) => {
                            return <Row className="fs-6 p-0 pt-2 m-0 d-flex">
                                <Col className="p-0 m-0 mt-3 text-left align-self-start">{recipe.material.name}</Col>
                                <Col md={2} className="p-0 m-0 text-left">
                                    {recipe.materialStacks.map((stack, materialStackIndex) => {
                                        return <Row className="p-0 m-0 text-nowrap">
                                            <Row className="p-0 m-0 d-flex">
                                                <Col md={7} xxl={9} className="p-0 m-0 mt-2 text-left align-self-center">{stack.material.name}</Col>
                                                <Col md={5} xxl={3} className="p-0 m-0 mt-2 text-left align-self-start">
                                                    <FormControl placeholder="Price" value={model.recipes[recipeIndex].materialStacks[materialStackIndex].unitCost} onChange={(e) => { this.setMaterialStackCost(model, recipeIndex, materialStackIndex, e); }} />
                                                </Col>
                                            </Row>
                                        </Row>;
                                    })}
                                </Col>
                                <Col md={2} className="text-left p-0 m-0 px-1">
                                    {recipe.resourceStacks.map((stack, resourceStackIndex) => {
                                        return <Row className="p-0 m-0">
                                            <Row className="p-0 m-0 d-flex">
                                                <Col md={7} xxl={9} className="p-0 m-0 mt-2 text-left align-self-center">{stack.resource.name}</Col>
                                                <Col md={5} xxl={3} className="p-0 m-0 mt-2 text-left align-self-start">
                                                    <FormControl placeholder="Price" value={model.recipes[recipeIndex].resourceStacks[resourceStackIndex].unitCost} onChange={(e) => { this.setResourceStackCost(model, recipeIndex, resourceStackIndex, e); }} />
                                                </Col>
                                            </Row>
                                        </Row>;
                                    })}
                                </Col>
                                <Col className="p-0 m-0 px-1 text-left">
                                    <Row className="p-0 m-0 d-flex">
                                        <Col className="p-0 m-0 mt-2 align-self-center">
                                            <FormControl placeholder="Goal material count" value={model.recipes[recipeIndex].count} onChange={(e) => { this.setCount(model, recipeIndex, e); }} />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className="text-left px-1 p-0 m-0">
                                    <Row className="p-0 m-0 d-flex">
                                        <Col className="p-0 m-0 mt-2 align-self-center">
                                            <FormControl placeholder="Market price" value={model.recipes[recipeIndex].price} onChange={(e) => { this.setPrice(model, recipeIndex, e); }} />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={2} className="text-left p-0 m-0">
                                    <Row className="p-0 m-0 d-flex">
                                        <Col className="p-0 m-0 mt-2 align-self-center">{!model.recipes[recipeIndex].count || model.recipes[recipeIndex].count === 0 ? null : this.getMaterialRequirements(model.returnRate, model.recipes[recipeIndex])}</Col>
                                    </Row>
                                    <Row className="p-0 m-0 d-flex">
                                        <Col className="p-0 m-0 mt-2 align-self-center">{!model.recipes[recipeIndex].count || model.recipes[recipeIndex].count === 0 ? null : this.getResourceRequirements(model.returnRate, model.recipes[recipeIndex])}</Col>
                                    </Row>
                                </Col>
                                <Col className="text-left p-0 m-0 fs-6">
                                    <Row className="p-0 m-0 d-flex">
                                        <Col className="p-0 m-0 mt-2 align-self-center">
                                            {this.getProfit(model.returnRate, model.recipes[recipeIndex], model.costPer100, model.tax)}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className="text-left p-0 m-0 fs-6 d-flex justify-content-center">
                                    <Row className="p-0 m-0 align-items-center">
                                        <Col className="p-0 m-0">
                                            {this.getDeleteButtons(model, recipeIndex)}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        })}
                    </Row>
                </Row >
            </Row>
        </Row>
    }
}

export default Refine;