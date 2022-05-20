import CrudRequestDataFactory from "../../factories/CrudRequestDataFactory";
import RequestDataFactory from "../../factories/RequestDataFactory";
import React from "react";
import { Col, Row, Button, FormControl, FormLabel, OverlayTrigger, Tooltip, Form, ToggleButton, ButtonGroup, Image } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faClipboardList, faSpinner } from '@fortawesome/fontawesome-free-solid'
import RecipeRequirementsModal from "./modal/RecipeRequirementsModal";
import Calculator from "./utils/Calculator";
import './css/custom.css'
import TransportCreator from "./utils/InventoryCreator";
import RecipeRequirements from "./part/RecipeRequirements";
import RecipeFilter from "./part/RecipeFilter";

const numberformat = require('swarm-numberformat')

class Refine extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            view: {
                requirements: {
                    opened: false,
                    content: null,
                    loading: false,
                }
            },
            model: {
                currentRecipe: null,
                returnRate: 25.6,
                tax: 0.03,
                costPer100: 100,
                profitRate: 10,
                recipes: [],
                materialTypes: [],
                currentMaterialType: null,
                tiers: [],
                currentTier: null,
                enhancements: [],
                currentEnhancement: null
            }
        }

        this.inventoryCreator = new TransportCreator();
        this.refineRecipeDataFactory = new CrudRequestDataFactory("refine", new RequestDataFactory());
        this.materialTypeDataFactory = new CrudRequestDataFactory("material/type", new RequestDataFactory());
        this.materialDataFactory = new CrudRequestDataFactory("material", new RequestDataFactory());
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

    // addRecipe = () => {
    //     var model = JSON.parse(JSON.stringify(this.state.model));
    //     var recipes = model.recipes;

    //     if (!model.currentRecipe) {
    //         return;
    //     }

    //     model.currentRecipe.resourceStacks = model.currentRecipe.resourceStacks.map((item) => { item.unitCost = item.unitCost || ""; return item; });
    //     model.currentRecipe.materialStacks = model.currentRecipe.materialStacks.map((item) => { item.unitCost = item.unitCost || ""; return item; });
    //     model.currentRecipe.count = model.currentRecipe.count || "";
    //     model.currentRecipe.price = model.currentRecipe.price || "";

    //     recipes.push(model.currentRecipe);
    //     this.setState({ model: model });
    // }

    removeRecipe = (recipeIndex) => {
        var model = JSON.parse(JSON.stringify(this.state.model));
        if (model.recipes.length <= 1) {
            return;
        }

        model.recipes.splice(recipeIndex, 1);

        this.setState({ model: model });
    }


    handleClose = (view) => {
        var actualView = JSON.parse(JSON.stringify(view));
        actualView.requirements.opened = false;
        actualView.requirements.recipe = null;
        actualView.requirements.returnRate = null;
        this.setState({ view: actualView });
    }

    requirementsReady = (view) => {
        var actualView = JSON.parse(JSON.stringify(view));
        actualView.requirements.loading = false;
        this.setState({ view: actualView });
    }

    openRequirements = (view, recipe, returnRate) => {
        var actualView = JSON.parse(JSON.stringify(view));
        actualView.requirements.opened = true;
        actualView.requirements.loading = true;
        actualView.requirements.recipe = JSON.parse(JSON.stringify(recipe));
        actualView.requirements.returnRate = returnRate;
        this.setState({ view: actualView });
    }

    getActionButtons = (model, recipeIndex, view) => {
        return <ButtonGroup className="p-0 m-0">
            {this.getDeleteButtons(model, recipeIndex)}
            {this.getRequirementsButtons(model, recipeIndex, view)}
        </ButtonGroup>
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
                <Button variant="danger" size="lg" className="btn-block" onClick={() => { this.removeRecipe(recipeIndex); }}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </OverlayTrigger>
    }

    getRequirementsButtons = (model, recipeIndex, view) => {
        return !model.recipes[recipeIndex].count || model.recipes[recipeIndex].count === 0
            ? null
            : window.innerHeight < 1300
                ? <Button size="lg" className="btn-block" onClick={() => { this.openRequirements(view, model.recipes[recipeIndex], model.returnRate); }}>
                    {view.requirements.loading ? <FontAwesomeIcon icon={faSpinner} /> : <FontAwesomeIcon icon={faClipboardList} />}
                </Button>
                : <OverlayTrigger
                    placement="left"
                    delay={{ show: 250, hide: 400 }}
                    overlay={(props) => {
                        return <Tooltip key={"requirements-action-tooltip"} id="requirements-action-tooltip" {...props} className="mytooltip d-flex align-items-center">
                            <figure className="position-relative m-0">
                                <figcaption style={{ "position": "absolute", "top": "-39rem", "left": "-27rem" }}>
                                    <RecipeRequirements inventoryCreator={this.inventoryCreator}
                                        handleReady={this.requirementsReady}
                                        imageRetriever={this.props.imageRetriever}
                                        returnRate={model.returnRate}
                                        recipe={model.recipes[recipeIndex]}
                                        view={view} />
                                </figcaption>
                            </figure>
                        </Tooltip>
                    }}>
                    <Button size="lg" className="btn-block" onClick={() => { this.openRequirements(view, model.recipes[recipeIndex], model.returnRate); }}>
                        {view.requirements.loading ? <FontAwesomeIcon icon={faSpinner} /> : <FontAwesomeIcon icon={faClipboardList} />}
                    </Button>
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
            return 0;
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
            return 0;
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

        var resourcesAffectedByReturnRate = recipe.resourceStacks.filter((item) => item.resource.type.isAffectedByReturnRate);
        var materialsAffectedByReturnRate = recipe.materialStacks.filter((item) => item.material.type.isAffectedByReturnRate);
        var costElementsAffectedByReturnRate =
            (
                resourcesAffectedByReturnRate.reduce((previousValue, currentValue) => previousValue + currentValue.count * currentValue.unitCost, initialValue)
                + materialsAffectedByReturnRate.reduce((previousValue, currentValue) => previousValue + currentValue.count * currentValue.unitCost, initialValue)
            ) * baseCount;

        var resourcesNotAffectedByReturnRate = recipe.resourceStacks.filter((item) => !item.resource.type.isAffectedByReturnRate);
        var materialsNotAffectedByReturnRate = recipe.materialStacks.filter((item) => !item.material.type.isAffectedByReturnRate);

        var costElementsNotAffectedByReturnRate =
            (
                resourcesNotAffectedByReturnRate.reduce((previousValue, currentValue) => previousValue + currentValue.count * currentValue.unitCost, initialValue)
                + materialsNotAffectedByReturnRate.reduce((previousValue, currentValue) => previousValue + currentValue.count * currentValue.unitCost, initialValue)
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

        return new Intl.NumberFormat('en-us', { maximumFractionDigits: 0 }).format(profit);
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
            return <Row className="p-0 m-0 p-0 m-0 d-flex justify-content-start" key={`recipe_${recipe.externalId}_${recipeIndex}`}>
                <Col md="auto" className="p-0 m-0" style={{ "border": "1px", "border-left-style": "solid", "border-right-style": "solid", "border-bottom-style": "solid" }}>
                    <OverlayTrigger
                        placement="left"
                        delay={{ show: 250, hide: 400 }}
                        overlay={(props) => (
                            <Tooltip key={"material-name-tooltip"} id="material-name-tooltip" {...props}>
                                {recipe.material.name}
                            </Tooltip>)}>
                        <Image src={this.props.imageRetriever ? this.props.imageRetriever.get("thumbnails/small", recipe.material.itemImageIdentifier) : null} style={{ cursor: "pointer" }} />
                    </OverlayTrigger>
                </Col>
                <Col className="p-0 m-0 text-left" style={{ "border": "1px", "border-right-style": "solid", "border-bottom-style": "solid" }}>
                    {recipe.materialStacks.map((stack, materialStackIndex) => {
                        return <Row className="p-0 m-0 text-nowrap" key={`stack_material_name_${stack.externalId}`}>
                            <Row className="p-0 m-0 d-flex">
                                <Col md="auto" className="p-0 m-0 text-left align-self-center">
                                    <OverlayTrigger
                                        placement="left"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={(props) => (
                                            <Tooltip key={`material-name-tooltip_${materialStackIndex}`} id={`material-name-tooltip_${materialStackIndex}`} {...props}>
                                                {stack.material.name}
                                            </Tooltip>)}>
                                        <Image src={this.props.imageRetriever ? this.props.imageRetriever.get("thumbnails/small", stack.material.itemImageIdentifier) : null} style={{ cursor: "pointer" }} />
                                    </OverlayTrigger>
                                </Col>
                                <Col className="d-flex p-0 m-0 text-left align-self-center">
                                    <FormControl className="p-0 border-0 m-0" size="lg" placeholder="Price" value={model.recipes[recipeIndex].materialStacks[materialStackIndex].unitCost} onChange={(e) => { this.setMaterialStackCost(model, recipeIndex, materialStackIndex, e); }} />
                                </Col>
                            </Row>
                        </Row>;
                    })}
                </Col>
                <Col className="text-left p-0 m-0 px-1" style={{ "border": "1px", "border-right-style": "solid", "border-bottom-style": "solid" }}>
                    {recipe.resourceStacks.map((stack, resourceStackIndex) => {
                        return <Row className="p-0 m-0 text-nowrap" key={`stack_resource_name_${stack.externalId}`}>
                            <Row className="p-0 m-0 d-flex">
                                <Col md="auto" className="p-0 m-0 text-left align-self-center">
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={(props) => (
                                            <Tooltip key={`resource-name-tooltip_${resourceStackIndex}`} id={`resource-name-tooltip_${resourceStackIndex}`} {...props}>
                                                {stack.resource.name}
                                            </Tooltip>)}>
                                        <Image src={this.props.imageRetriever ? this.props.imageRetriever.get("thumbnails/small", stack.resource.itemImageIdentifier) : null} style={{ cursor: "pointer" }} />
                                    </OverlayTrigger>
                                </Col>
                                <Col className="p-0 m-0 text-left align-self-center">
                                    <FormControl className="p-0 border-0 m-0" size="lg" placeholder="Price" value={model.recipes[recipeIndex].resourceStacks[resourceStackIndex].unitCost} onChange={(e) => { this.setResourceStackCost(model, recipeIndex, resourceStackIndex, e); }} />
                                </Col>
                            </Row>
                        </Row>;
                    })}
                </Col>
                <Col className="p-0 m-0 px-1 text-left" style={{ "border": "1px", "border-right-style": "solid", "border-bottom-style": "solid" }}>
                    <Row className="p-0 m-0 d-flex align-items-center">
                        <Col className="p-0 m-0 mt-2">
                            <FormControl className="p-0 border-0 m-0" size="lg" placeholder="Goal material count" value={model.recipes[recipeIndex].count} onChange={(e) => { this.setCount(model, recipeIndex, e); }} />
                        </Col>
                    </Row>
                </Col>
                <Col className="text-left px-1 p-0 m-0" style={{ "border": "1px", "border-right-style": "solid", "border-bottom-style": "solid" }}>
                    <Row className="p-0 m-0 d-flex">
                        <Col className="p-0 m-0 mt-2">
                            <FormControl className="p-0 border-0 m-0" size="lg" placeholder="Market price" value={model.recipes[recipeIndex].price} onChange={(e) => { this.setPrice(model, recipeIndex, e); }} />
                        </Col>
                    </Row>
                </Col>
                <Col md="auto" className="text-left p-0 m-0 fs-5" style={{ "width": "250px", "border": "1px", "border-right-style": "solid", "border-bottom-style": "solid" }}>
                    <Row className="p-0 m-0 d-flex">
                        <Col className="p-0 m-0 mt-3 align-self-center">
                            {this.getProfit(model.returnRate, model.recipes[recipeIndex], model.costPer100, model.tax, model.profitRate)}
                        </Col>
                    </Row>
                </Col>
                <Col md="auto" className="text-left p-0 m-0 fs-5 align-self-center justify-content-center" style={{ "width": "100px" }}>
                    <Row className="p-0 m-0 ">
                        <Col className="p-0 m-0">
                            {this.getActionButtons(model, recipeIndex, view)}
                        </Col>
                    </Row>
                </Col>
            </Row>
        })
    }

    getAllProfits = (model) => {
        var profits = model.recipes.map((element) => this.calculateProfit(model.returnRate, element, model.costPer100, model.tax))
        var result = profits.reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
        }, 0);

        return result;
    }

    generateAllProfitsShort = (model) => {
        var value = this.getAllProfits(model);
        return numberformat.format(value, { suffixes: ['', ' k', ' m', ' b', ' t'] });
    }

    generateAllProfits = (model) => {
        var value = this.getAllProfits(model);
        if (!value) {
            return null;
        }

        return new Intl.NumberFormat('en-us', { maximumFractionDigits: 0 }).format(value);
    }


    generateAverageProfitRate = (model) => {
        var profitRate = this.getAverageProfitRate(model);
        return <p className={`m-0 p-0 ${parseInt(profitRate) === model.profitRate ? "text-dark" : parseInt(profitRate) > model.profitRate ? "text-success" : "text-danger"}`}>{this.generateAllProfitsShort(model)} ({parseInt(profitRate)} %)</p>
    }

    getAverageProfitRate = (model) => {
        var returnRates = model.recipes.map((recipe) => {
            var profit = this.calculateProfit(model.returnRate, recipe, model.costPer100, model.tax);
            var allCosts = this.getAllCosts(model.returnRate, recipe, model.costPer100, model.tax);
            return allCosts === 0 ? 0 : (profit / allCosts) * 100;
        });

        return returnRates.reduce((prev, next) => (prev + next)) / returnRates.length;
    }

    generateAllProfitsPart = (model) => {
        return <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={(props) => (
                <Tooltip key={"price-tooltip"} id="price-tooltip" {...props}>
                    {this.generateAllProfits(model)}
                </Tooltip>)}>
            <Col>{this.generateAverageProfitRate(model)}</Col>
        </OverlayTrigger>;
    }

    getList = (model, view) => {
        return <Row className="text-dark m-0 p-0 fs-6">
            <Col md={12} className="p-0 m-0">
                <Row className="p-0 m-0 d-flex align-self-start">
                    <Row className="p-0 m-0 d-flex justify-content-start">
                        <Col md="auto" className="p-0 m-0" style={{ "width": "64px", "border": "1px", "border-bottom-style": "solid" }}>Material</Col>
                        <Col className="p-0 m-0" style={{ "border": "1px", "border-bottom-style": "solid" }}>Buy Price</Col>
                        <Col className="p-0 m-0 px-1" style={{ "border": "1px", "border-bottom-style": "solid" }} >Buy Price</Col>
                        <Col className="p-0 m-0 px-1" style={{ "border": "1px", "border-bottom-style": "solid" }} >Count</Col>
                        <Col className="text-left p-0 m-0 fs-5 px-1" style={{ "border": "1px", "border-bottom-style": "solid" }}>Sell Price</Col>
                        <Col md="auto" className="text-left p-0 m-0 fs-5" style={{ "width": "250px", "border": "1px", "border-bottom-style": "solid" }}>Profit</Col>
                        <Col md="auto" className="p-0 m-0" style={{ "width": "100px" }}>Actions</Col>
                    </Row>
                    {this.getListData(model, view)}
                    {model.recipes.length === 0
                        ? null
                        : <Row className="p-0 m-0 d-flex justify-content-start">
                            <Col md="auto" className="p-0 m-0" style={{ "width": "64px", "border": "1px", "border-right-style": "hidden" }} />
                            <Col className="p-0 m-0" />
                            <Col className="p-0 m-0 px-1" />
                            <Col className="p-0 m-0 px-1" />
                            <Col className="text-left p-0 m-0 fs-5 px-1" style={{ "border": "1px", "border-right-style": "solid" }}>
                            </Col>
                            <Col md="auto" className="text-left p-0 m-0 fs-5" style={{ "width": "250px", "border": "1px", "border-bottom-style": "solid", "border-right-style": "solid" }}  >
                                <Row className="p-0 m-0 d-flex">
                                    <Col className="p-0 m-0 mt-3 align-self-center">
                                        {this.generateAllProfitsPart(model)}
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="auto" className="p-0 m-0" style={{ "width": "100px" }} />
                        </Row>}
                </Row>
            </Col>
        </Row>
    }

    componentDidMount = () => {

        this.recieveMaterials(this.state.model);
    }

    onInitializeMaterials = (all) => {
        var model = JSON.parse(JSON.stringify(this.state.model));
        model.currentMaterial = all[0];
        model.materials = all;
        this.setState({ model: model });
    }

    recieveMaterials = (model) => {
        var requestData = this.materialDataFactory.createSelectList(
            "externalId", !model.currentMaterialType || model.currentMaterialType.externalId == null ? "" : model.currentMaterialType.externalId,
            "tier", !model.currentTier || model.currentTier == "all" ? "" : model.currentTier,
            "enhancement", !model.currentEnhancement || model.currentEnhancement == "all" ? "" : model.currentEnhancement);
        fetch(requestData.url, requestData.requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    var model = JSON.parse(JSON.stringify(this.state.model));
                    model.currentMaterial = result[0];
                    model.materials = result;
                    this.setState({ model: model });
                },
                (error) => {
                }
            );
    }

    addRecipe = (recipe) => {
        var model = JSON.parse(JSON.stringify(this.state.model));
        var recipes = model.recipes;

        recipe.resourceStacks = recipe.resourceStacks.map((item) => { item.unitCost = item.unitCost || ""; return item; });
        recipe.materialStacks = recipe.materialStacks.map((item) => { item.unitCost = item.unitCost || ""; return item; });
        recipe.count = recipe.count || "";
        recipe.price = recipe.price || "";

        recipes.push(recipe);
        this.setState({ model: model });
    }

    selectMaterial = (model, material) => {
        var model = JSON.parse(JSON.stringify(this.state.model));
        model.currentMaterial = material;
        this.setState({ model: model });

        var requestData = this.refineRecipeDataFactory.createListAll("material", material.externalId);
        fetch(requestData.url, requestData.requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    var model = JSON.parse(JSON.stringify(this.state.model));
                    model.menuCurrentRecipe = result[0];
                    model.menuRecipes = result;
                    this.setState({ model: model });
                },
                (error) => {
                }
            );
    }

    moveNext = (current) => {
        var model = JSON.parse(JSON.stringify(this.state.model));
        model.menuCurrentRecipe = current;
        this.setState({ model: model });
    }

    movePrevious = (current) => {
        var model = JSON.parse(JSON.stringify(this.state.model));
        model.menuCurrentRecipe = current;
        this.setState({ model: model });
    }

    render() {
        const { model, view } = this.state;
        return <Row className="m-0 p-0">
            <RecipeFilter materialDataFactory={this.materialDataFactory}
                materialTypeDataFactory={this.materialTypeDataFactory}
                imageRetriever={this.props.imageRetriever}
                onSelectMaterial={(currentTier) => this.selectMaterial(model, currentTier)}
                all={model.menuRecipes}
                current={model.menuCurrentRecipe}
                onMoveNext={(current) => this.moveNext(current)}
                onMovePrevious={(current) => this.movePrevious(current)}
                onAddRecipe={(recipe) => this.addRecipe(recipe)}
                onInitialize={(all) => this.onInitializeMaterials(all)} />
            <Row className="text-center text-dark pb-2 m-0 p-0 fs-6 d-flex justify-content-start">
                <Col md={10}>
                    <Row className="text-center d-flex align-self-start pb-2" >
                        <Col xxl={2} md={3} className="d-flex align-self-start text-nowrap">
                            <FormLabel className="mx-2 mb-0 align-self-center">Return rate</FormLabel>
                            <FormControl placeholder="Return Rate" value={model.returnRate} onChange={(e) => { this.setReturnRate(model, e); }} />
                        </Col>
                        <Col xxl={3} md={3} className="d-flex align-self-start text-nowrap">
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
            < RecipeRequirementsModal
                inventoryCreator={this.inventoryCreator}
                handleReady={this.requirementsReady}
                imageRetriever={this.props.imageRetriever}
                view={view}
                handleClose={this.handleClose} />
        </Row >
    }
}

export default Refine;