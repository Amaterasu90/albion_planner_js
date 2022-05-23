import CrudRequestDataFactory from "../../factories/CrudRequestDataFactory";
import RequestDataFactory from "../../factories/RequestDataFactory";
import React from "react";
import {Row} from "react-bootstrap"
import RecipeRequirementsModal from "./modal/RecipeRequirementsModal";
import TransportCreator from "./utils/InventoryCreator";
import RecipeFilter from "./part/RecipeFilter";
import FinancialInput from "./part/FinancialInput";
import Table from "./part/Table";

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
            "tier", !model.currentTier || model.currentTier === "all" ? "" : model.currentTier,
            "enhancement", !model.currentEnhancement || model.currentEnhancement === "all" ? "" : model.currentEnhancement);
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
        var actualModel = JSON.parse(JSON.stringify(this.state.model));
        actualModel.currentMaterial = material;
        this.setState({ model: actualModel });

        var requestData = this.refineRecipeDataFactory.createListAll("material", material.externalId);
        fetch(requestData.url, requestData.requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    actualModel = JSON.parse(JSON.stringify(this.state.model));
                    actualModel.menuCurrentRecipe = result[0];
                    actualModel.menuRecipes = result;
                    this.setState({ model: actualModel });
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
            <FinancialInput
                model={model}
                onChangeReturnRate={this.setReturnRate}
                onChangeFoodCost={this.setProductioncostPer100}
                onChangeTax={this.setTax}
                onChangeProfitRate={this.setProfitRate} />
            <Table
                model={model}
                view={view}
                onChangeMaterialStackCost={this.setMaterialStackCost}
                onChangeResourceStackCost={this.setResourceStackCost}
                onChangeCount={this.setCount}
                onChangePrice={this.setPrice}
                onOpenRequirements={this.openRequirements}
                onRemoveRecipe={this.removeRecipe}
                imageRetriever={this.props.imageRetriever} />
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