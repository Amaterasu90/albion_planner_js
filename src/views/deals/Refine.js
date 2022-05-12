import CrudRequestDataFactory from "../../factories/CrudRequestDataFactory";
import RequestDataFactory from "../../factories/RequestDataFactory";
import RelatedAsyncSelect from "../../components/modal/form/RelatedAsyncSelect";
import React from "react";
import { Col, Row, Button, FormControl, FormLabel, OverlayTrigger, Tooltip, Form, ToggleButton, ButtonGroup, Image, Container } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faClipboardList } from '@fortawesome/fontawesome-free-solid'
import RecipeRequirementsModal from "./modal/RecipeRequirementsModal";
import Calculator from "./utils/Calculator";
import './css/custom.css'

const numberformat = require('swarm-numberformat')

class Refine extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            view: {
                requirements: {
                    opened: false,
                    content: null
                }
            },
            model: {
                currentRecipe: null,
                returnRate: 25.6,
                tax: 0.03,
                costPer100: 100,
                profitRate: 10,
                recipes: []
            }
        }

        this.refineRecipeDataFactory = new CrudRequestDataFactory("refine", new RequestDataFactory());
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

    addRecipe = () => {
        var model = JSON.parse(JSON.stringify(this.state.model));
        var recipes = model.recipes;

        if (!model.currentRecipe) {
            return;
        }

        model.currentRecipe.resourceStacks = model.currentRecipe.resourceStacks.map((item) => { item.unitCost = item.unitCost || ""; return item; });
        model.currentRecipe.materialStacks = model.currentRecipe.materialStacks.map((item) => { item.unitCost = item.unitCost || ""; return item; });
        model.currentRecipe.count = model.currentRecipe.count || "";
        model.currentRecipe.price = model.currentRecipe.price || "";

        recipes.push(model.currentRecipe);
        this.setState({ model: model });
    }

    removeRecipe = (recipeIndex) => {
        var model = JSON.parse(JSON.stringify(this.state.model));
        if (model.recipes.length <= 1) {
            return;
        }

        model.recipes.splice(recipeIndex, 1);

        this.setState({ model: model });
    }

    getDeleteButtons = (model, recipeIndex) => {
        return model.recipes.length <= 1 ? null :
            <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={(props) => (
                    <Tooltip key={"delete-action-tooltip"} id="delete-action-tooltip" {...props}>
                        Delete
                    </Tooltip>)}>
                <ToggleButton variant="danger" size="lg" className="btn-block" onClick={() => { this.removeRecipe(recipeIndex); }}>
                    <FontAwesomeIcon icon={faTrash} />
                </ToggleButton>
            </OverlayTrigger>
    }


    handleClose = (view) => {
        var actualView = JSON.parse(JSON.stringify(view));
        actualView.requirements.opened = false;
        actualView.requirements.recipe = null;
        actualView.requirements.retrunRate = null;
        this.setState({ view: actualView });
    }

    openRequirements = (view, recipe, retrunRate) => {
        var actualView = JSON.parse(JSON.stringify(view));
        actualView.requirements.opened = true;
        actualView.requirements.recipe = JSON.parse(JSON.stringify(recipe));
        actualView.requirements.retrunRate = retrunRate;
        this.setState({ view: actualView });
    }

    getActionButtons = (model, recipeIndex, view) => {
        return <ButtonGroup>
            {this.getDeleteButtons(model, recipeIndex)}
            {this.getRequirementsButtons(model, recipeIndex, view)}
        </ButtonGroup>
    }

    getRequirementsButtons = (model, recipeIndex, view) => {
        return !model.recipes[recipeIndex].count || model.recipes[recipeIndex].count === 0 ? null : <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={(props) => (
                <Tooltip key={"requirements-action-tooltip"} id="requirements-action-tooltip" {...props}>
                    Requirements
                </Tooltip>)}>
            <ToggleButton variant="outline-info" size="lg" className="btn-block" onClick={() => { this.openRequirements(view, model.recipes[recipeIndex], model.returnRate); }}>
                <FontAwesomeIcon icon={faClipboardList} />
            </ToggleButton>
        </OverlayTrigger>
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

        var allCosts = this.getAllCosts(returnRate, recipe, costPer100, tax);

        return (recipe.price * recipe.count) - allCosts;
    }

    getAllCosts = (returnRate, recipe, costPer100, tax) => {
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
        return cost + taxCost;
    }

    calculateRefineCost = (returnRate, recipe, costPer100) => {
        if (!recipe.count || recipe.count === 0 || !returnRate || returnRate === 0
            || recipe.resourceStacks.find((item) => !item.unitCost || item.unitCost === 0)
            || recipe.materialStacks.find((item) => !item.unitCost || item.unitCost === 0)) {
            return 0;
        }

        const initialValue = 0;
        var baseCount = Calculator.calculateFinalCount(returnRate, recipe.count);

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

    setResourceStackCost = (model, recipeIndex, resourceStackIndex, e) => {
        var unitCost = parseInt(e.currentTarget.value, 10);
        var currentModel = JSON.parse(JSON.stringify(model))
        currentModel.recipes[recipeIndex].resourceStacks[resourceStackIndex].unitCost = isNaN(unitCost) ? "" : unitCost;
        this.setState({ model: currentModel });
    }

    setMaterialStackCost = (model, recipeIndex, materialStackIndex, e) => {
        var unitCost = parseInt(e.currentTarget.value, 10);
        var currentModel = JSON.parse(JSON.stringify(model))
        currentModel.recipes[recipeIndex].materialStacks[materialStackIndex].unitCost = isNaN(unitCost) ? "" : unitCost;
        this.setState({ model: currentModel });
    }

    setPrice = (model, recipeIndex, e) => {
        var price = parseInt(e.currentTarget.value, 10);
        var currentModel = JSON.parse(JSON.stringify(model))
        currentModel.recipes[recipeIndex].price = isNaN(price) ? "" : price;
        this.setState({ model: currentModel });
    }

    setCount = (model, recipeIndex, e) => {
        var count = parseInt(e.currentTarget.value, 10);
        var currentModel = JSON.parse(JSON.stringify(model))
        currentModel.recipes[recipeIndex].count = isNaN(count) ? "" : count;
        this.setState({ model: currentModel });
    }

    setReturnRate = (model, e) => {
        var currentModel = JSON.parse(JSON.stringify(model))
        currentModel.returnRate = e.currentTarget.value;

        this.setState({ model: currentModel });
    }

    setProfitRate = (model, e) => {
        var currentModel = JSON.parse(JSON.stringify(model))
        currentModel.profitRate = e.currentTarget.value;

        this.setState({ model: currentModel });
    }

    setTax = (model, e) => {
        var currentModel = JSON.parse(JSON.stringify(model))
        currentModel.tax = e.currentTarget.value;
        
        this.setState({ model: currentModel });
    }

    setProductioncostPer100 = (model, e) => {
        var currentModel = JSON.parse(JSON.stringify(model))
        currentModel.costPer100 = parseInt(e.currentTarget.value, 10);
        this.setState({ model: currentModel });
    }

    getProfit = (returnRate, recipe, costPer100, tax, profitRate) => {
        var profit = this.calculateProfit(returnRate, recipe, costPer100, tax);
        if (!profit) {
            return null;
        }

        var allCosts = this.getAllCosts(returnRate, recipe, costPer100, tax);
        var profitRateFactor = (profit / allCosts) * 100;
        var profitRateInPercentage = profitRate;

        return <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={(props) => (
                <Tooltip key={"price-tooltip"} id="price-tooltip" {...props}>
                    {this.getToalProfit(returnRate, recipe, costPer100, tax)}
                </Tooltip>)}>
            <p className={`m-0 p-0 ${parseInt(profitRateFactor) === profitRateInPercentage ? "text-dark" : parseInt(profitRateFactor) > profitRateInPercentage ? "text-success" : "text-danger"}`}>{numberformat.format(profit, { suffixes: ['', ' k', ' m', ' b', ' t'] })} ({parseInt(profitRateFactor)} %)</p>
        </OverlayTrigger>;
    }

    getToalProfit = (returnRate, recipe, costPer100, tax) => {
        var profit = this.calculateProfit(returnRate, recipe, costPer100, tax);
        if (!profit) {
            return null;
        }

        return new Intl.NumberFormat('en-us', { maximumSignificantDigits: 3 }).format(profit);
    }

    getProductionCost = (recipe, costPer100) => {
        if (recipe.tier <= 2
            || recipe.resourceStacks.find((item) => !item.resource.type.isAffectedByReturnRate)
            || recipe.materialStacks.find((item) => !item.material.type.isAffectedByReturnRate)) {
            return 0;
        }
        var baseCosts = [90, 180, 360, 720, 1440, 2880, 5760, 11520, 23038];
        var cost = Math.round((baseCosts[recipe.tier + recipe.enhancement - 3] * costPer100) / 9999);
        return cost;
    }

    getListData = (model, view) => {
        return model.recipes.length === 0 ? <Col md={12} className="fs-2 p-0 pt-2 m-0 d-flex justify-content-center">Add recipe to compare</Col> : model.recipes.map((recipe, recipeIndex) => {
            return <Row className="fs-6 p-0 pt-2 m-0 d-flex align-items-start" key={`recipe_${recipe.externalId}_${recipeIndex}`}>
                <Col className="p-0 m-0">
                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={(props) => (
                            <Tooltip key={"material-name-tooltip"} id="material-name-tooltip" {...props}>
                                {recipe.material.name}
                            </Tooltip>)}>
                        <Image src={this.props.imageRetriever ? this.props.imageRetriever.get("thumbnails/small", recipe.material.itemImageIdentifier) : null} style={{ cursor: "pointer" }} onClick={(e) => { console.log(`clicked: ${e}`) }} />
                    </OverlayTrigger>
                </Col>
                <Col className="p-0 m-0 text-left">
                    {recipe.materialStacks.map((stack, materialStackIndex) => {
                        return <Row className="p-0 m-0 text-nowrap" key={`stack_material_name_${stack.externalId}`}>
                            <Row className="p-0 m-0 d-flex">
                                <Col className="p-0 m-0 text-left align-self-center">
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={(props) => (
                                            <Tooltip key={`material-name-tooltip_${materialStackIndex}`} id={`material-name-tooltip_${materialStackIndex}`} {...props}>
                                                {stack.material.name}
                                            </Tooltip>)}>
                                        <Image src={this.props.imageRetriever ? this.props.imageRetriever.get("thumbnails/small", stack.material.itemImageIdentifier) : null} style={{ cursor: "pointer" }} onClick={(e) => { console.log(`clicked: ${e}`) }} />
                                    </OverlayTrigger>
                                </Col>
                                <Col className="p-0 m-0 text-left align-self-center">
                                    <FormControl size="lg" placeholder="Price" value={model.recipes[recipeIndex].materialStacks[materialStackIndex].unitCost} onChange={(e) => { this.setMaterialStackCost(model, recipeIndex, materialStackIndex, e); }} />
                                </Col>
                            </Row>
                        </Row>;
                    })}
                </Col>
                <Col className="text-left p-0 m-0 px-1">
                    {recipe.resourceStacks.map((stack, resourceStackIndex) => {
                        return <Row className="p-0 m-0 text-nowrap" key={`stack_resource_name_${stack.externalId}`}>
                            <Row className="p-0 m-0 d-flex">
                                <Col className="p-0 m-0 text-left align-self-center">
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={(props) => (
                                            <Tooltip key={`resource-name-tooltip_${resourceStackIndex}`} id={`resource-name-tooltip_${resourceStackIndex}`} {...props}>
                                                {stack.resource.name}
                                            </Tooltip>)}>
                                        <Image src={this.props.imageRetriever ? this.props.imageRetriever.get("thumbnails/small", stack.resource.itemImageIdentifier) : null} style={{ cursor: "pointer" }} onClick={(e) => { console.log(`clicked: ${e}`) }} />
                                    </OverlayTrigger>
                                </Col>
                                <Col className="p-0 m-0 text-left align-self-center">
                                    <FormControl size="lg" placeholder="Price" value={model.recipes[recipeIndex].resourceStacks[resourceStackIndex].unitCost} onChange={(e) => { this.setResourceStackCost(model, recipeIndex, resourceStackIndex, e); }} />
                                </Col>
                            </Row>
                        </Row>;
                    })}
                </Col>
                <Col className="p-0 m-0 px-1 text-left">
                    <Row className="p-0 m-0 d-flex align-items-center">
                        <Col className="p-0 m-0 mt-2">
                            <FormControl size="lg" placeholder="Goal material count" value={model.recipes[recipeIndex].count} onChange={(e) => { this.setCount(model, recipeIndex, e); }} />
                        </Col>
                    </Row>
                </Col>
                <Col className="text-left px-1 p-0 m-0">
                    <Row className="p-0 m-0 d-flex">
                        <Col className="p-0 m-0 mt-2">
                            <FormControl size="lg" placeholder="Market price" value={model.recipes[recipeIndex].price} onChange={(e) => { this.setPrice(model, recipeIndex, e); }} />
                        </Col>
                    </Row>
                </Col>
                <Col className="text-left p-0 m-0 fs-5">
                    <Row className="p-0 m-0 d-flex">
                        <Col className="p-0 m-0 mt-3 align-self-center">
                            {this.getProfit(model.returnRate, model.recipes[recipeIndex], model.costPer100, model.tax, model.profitRate)}
                        </Col>
                    </Row>
                </Col>
                <Col className="text-left p-0 m-0 fs-5">
                    <Row className="p-0 m-0 d-flex">
                        <Col className="p-0 m-0 align-self-center">
                            {this.getActionButtons(model, recipeIndex, view)}
                        </Col>
                    </Row>
                </Col>
            </Row>
        })
    }

    getList = (model, view) => {
        return <Row className="text-dark m-0 p-0 fs-6" md={10}>
            <Row className="p-0 m-0 d-flex align-self-center">
                <Row className="p-0 m-0 d-flex text-nowrap align-self-center">
                    <Col className="p-0 m-0 text-left align-self-center">Material</Col>
                    <Col className="p-0 m-0 text-left align-self-center">Buy Price</Col>
                    <Col className="p-0 m-0 text-left align-self-center">Buy Price</Col>
                    <Col className="p-0 m-0 text-left align-self-center">Count</Col>
                    <Col className="p-0 m-0 text-left align-self-center">Sell Price</Col>
                    <Col className="p-0 m-0 text-left align-self-center">Profit</Col>
                    <Col className="p-0 m-0 text-left align-self-center"></Col>
                </Row>
                <Row className="p-0 m-0 d-flex">
                    {this.getListData(model, view)}
                </Row>
            </Row >
        </Row>
    }

    render() {
        const { model, view } = this.state;
        return <Row className="m-0 p-0">
            <Row className="text-center text-dark m-0 p-0 pb-2 fs-6">
                <Col md={10}>
                    <Row className="text-center d-flex align-self-start pb-2" >
                        <Col className="text-center d-flex justify-content-start" >
                            <FormLabel className="mx-2 mb-0 mt-1 align-self-center">Refined recipe</FormLabel>
                            <RelatedAsyncSelect
                                id="refineRecipeId"
                                placeholder="RefineRecipe"
                                defaultValue={model.currentRecipe}
                                dataFactory={this.refineRecipeDataFactory}
                                md={5} xxl={2} onChangeCustom={this.getRecipe} />
                            <Button className="btn-block mx-2 btn-sm mt-0" onClick={this.addRecipe}>Add recipe</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="text-center text-dark pb-2 m-0 p-0 fs-6">
                <Col md={10}>
                    <Row className="text-center d-flex align-self-start pb-2" >
                        <Col xxl={2} md={3} className="d-flex align-self-start text-nowrap">
                            <FormLabel className="mx-2 mb-0 align-self-center">Return rate</FormLabel>
                            <FormControl placeholder="Return Rate" value={model.returnRate} onChange={(e) => { this.setReturnRate(model, e); }} />
                        </Col>
                        <Col xxl={2} md={3} className="d-flex align-self-start text-nowrap">
                            <FormLabel className="mx-2 mb-0 align-self-center">Cost per 100 food unit</FormLabel>
                            <FormControl placeholder="Cost per 100 food unit" value={model.costPer100} onChange={(e) => { this.setProductioncostPer100(model, e); }} />
                        </Col>
                        <Col xxl={2} md={3} className="d-flex align-self-start text-nowrap">
                            <FormLabel className="mx-2 mb-0 align-self-center">Tax</FormLabel>
                            <Form.Select placeholder="Cost per 100 food unit" onChange={(e) => { this.setTax(model, e); }} >
                                <option value="0.03">Premium (3%)</option>
                                <option value="0.06">Non-Premium (6%)</option>
                            </Form.Select>
                        </Col>
                        <Col xxl={2} md={3} className="d-flex align-self-start text-nowrap">
                            <FormLabel className="mx-2 mb-0 align-self-center">Profit rate</FormLabel>
                            <FormControl placeholder="Return Rate" value={model.profitRate} onChange={(e) => { this.setProfitRate(model, e); }} />
                            <FormLabel className="mx-2 mb-0 align-self-center">%</FormLabel>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {this.getList(model, view)}
            <RecipeRequirementsModal imageRetriever={this.props.imageRetriever} view={view} handleClose={this.handleClose} />
        </Row>
    }
}

export default Refine;