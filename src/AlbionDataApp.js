import React from 'react';
import RequestDataFactory from './factories/RequestDataFactory';
import CrudRequestDataFactory from './factories/CrudRequestDataFactory';
import NavbarComponent from './components/navigation/NavbarComponent';
import { Col, Row } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import Recipe from './views/items/material/Recipe';
import Material from './views/items/material/Material';
import MaterialType from './views/items/material/MaterialType';
import Resource from './views/items/resource/Resource';
import ResourceType from './views/items/resource/ResourceType';
import Refine from './views/deals/Refine';
import ImageRetriever from './services/ImageRetriever';
import ImageRequestDataFactory from './factories/ImageRequestDataFactory';

class AlbionDataApp extends React.Component {
    constructor(props) {
        super(props);
        const requestDataFactory = new RequestDataFactory();
        this.artifactRequestDataFactory = new CrudRequestDataFactory("artifact",
            requestDataFactory);
        this.materialTypeRequestDataFactory = new CrudRequestDataFactory("material/type",
            requestDataFactory);
        this.productTypeRequestDataFactory = new CrudRequestDataFactory("product/type",
            requestDataFactory);
        this.productRequestDataFactory = new CrudRequestDataFactory("product",
            requestDataFactory);
        this.resourceTypeRequestDataFactory = new CrudRequestDataFactory("resource/type",
            requestDataFactory);
        this.resourceRecipeDataFactory = new CrudRequestDataFactory("refine",
            requestDataFactory);
        this.resourceRequestDataFactory = new CrudRequestDataFactory("resource",
            requestDataFactory);
        this.journalRequestDataFactory = new CrudRequestDataFactory("journal",
            requestDataFactory);
        this.materialRequestDataFactory = new CrudRequestDataFactory("material",
            requestDataFactory);
        this.productRequestDataFactory = new CrudRequestDataFactory("product",
            requestDataFactory);
        this.imageDataFactory = new ImageRequestDataFactory(requestDataFactory);

        this.state = {
            component: null,
            images: null
        }
    }

    componentDidMount = () => {
        this.getImages();
    }

    getImages = () => {
        if (!this.state.images) {
            var requestData = this.imageDataFactory.createListAll();
            fetch(requestData.url, requestData.requestOptions)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({ images: result });
                    },
                    (error) => {
                    }
                )
        }
    }

    onArtifactSelected = (e) => {
        this.setState({
            component: "artifact"
        });
    }

    onProductTypeSelected = (e) => {
        this.setState({
            component: "productType"
        });
    }

    onMaterialTypeSelected = (e) => {
        this.setState({
            component: "materialType"
        });
    }

    onGatherResourcesTypeSelected = (e) => {
        this.setState({
            component: "resourceType"
        });
    }

    onJournalSelected = (e) => {
        this.setState({
            component: "journal"
        });
    }

    onMaterialSelected = (e) => {
        this.setState({
            component: "material"
        });
    }

    onProductSelected = (e) => {
        this.setState({
            component: "product"
        });
    }

    onResourceSelected = (e) => {
        this.setState({
            component: "resource"
        });
    }

    onRefineRecipeSelected = (e) => {
        this.setState({
            component: "refineRecipe"
        });
    }

    openRefineDealSelected = (e) => {
        this.setState({
            component: "refineDeal"
        });
    }

    // getCrudData = (component) => {
    //     switch (component) {
    //         case "materialType":
    //             return {
    //                 provider: this.props.provider,
    //                 optionsFactory: new TableOptionsFactory(),
    //                 columnsFactory: new TableColumnFactory(),
    //                 actionFactory: new ApiEditDeleteActionsColumnFactory(this.materialTypeRequestDataFactory, "Edit material type", "Some products are related with this item type"),
    //                 requestDataFactory: this.materialTypeRequestDataFactory,
    //                 propertyDefinitions: [
    //                     { id: "externalId", name: "External Id", width: "0%", hidden: true },
    //                     { id: "name", name: "Name", width: "49%" },
    //                     { id: "actions", name: "Actions", width: "1%" },
    //                     { id: "containsRelatedElements", name: "ContainsRelatedElements", width: "0%", hidden: true }
    //                 ],
    //                 createFormFields:
    //                     [
    //                         { id: "name", name: "Name", type: "text", placeholder: "Name" }
    //                     ],
    //                 editFormFields: (item) => {
    //                     return {
    //                         fields: [
    //                             { id: "name", name: "Name", type: "text", placeholder: "Name", defaultValue: item.name },
    //                             { id: "externalId", name: "ExternalId", type: "hidden", placeholder: "External Id", defaultValue: item.externalId }
    //                         ]
    //                     }
    //                 },
    //                 deleteRelatedFields: (item) => {
    //                     return {
    //                         containsRelatedElements: item.containsRelatedElements
    //                     }
    //                 },
    //                 createBtnText: "Add material type",
    //                 createFormatHeaderText: "Add new material type"
    //             };
    //         case "resourceType":
    //             return {
    //                 provider: this.props.provider,
    //                 optionsFactory: new TableOptionsFactory(),
    //                 columnsFactory: new TableColumnFactory(),
    //                 actionFactory: new ApiEditDeleteActionsColumnFactory(this.resourceTypeRequestDataFactory, "Edit resource type", "Some products are related with this item type"),
    //                 requestDataFactory: this.resourceTypeRequestDataFactory,
    //                 propertyDefinitions: [
    //                     { id: "externalId", name: "External Id", width: "0%", hidden: true },
    //                     { id: "name", name: "Name", width: "49%" },
    //                     { id: "actions", name: "Actions", width: "1%" },
    //                     { id: "containsRelatedElements", name: "ContainsRelatedElements", width: "0%", hidden: true }
    //                 ],
    //                 createFormFields:
    //                     [
    //                         { id: "name", name: "Name", type: "text", placeholder: "Name" }
    //                     ],
    //                 editFormFields: (item) => {
    //                     return {
    //                         fields: [
    //                             { id: "name", name: "Name", type: "text", placeholder: "Name", defaultValue: item.name },
    //                             { id: "externalId", name: "ExternalId", type: "hidden", placeholder: "External Id", defaultValue: item.externalId }
    //                         ]
    //                     }
    //                 },
    //                 deleteRelatedFields: (item) => {
    //                     return {
    //                         containsRelatedElements: item.containsRelatedElements
    //                     }
    //                 },
    //                 createBtnText: "Add resource type",
    //                 createFormatHeaderText: "Add new resource type"
    //             };
    //         case "refineRecipe":
    //             return {
    //                 provider: this.props.provider,
    //                 optionsFactory: new TableOptionsFactory(),
    //                 columnsFactory: new TableColumnFactory(),
    //                 actionFactory: new ApiDetailsEditDeleteActionsColumnFactory(this.resourceRecipeDataFactory, "Edit refine recipe", "Refine recipe details", "Some material or resource are related with this recipe"),
    //                 requestDataFactory: this.resourceRecipeDataFactory,
    //                 propertyDefinitions: [
    //                     { id: "externalId", name: "External Id", width: "0%", hidden: true },
    //                     { id: "name", name: "Name", width: "20%" },
    //                     { id: "material", name: "Material", width: "10%", hidden: true },
    //                     { id: "enhancement", name: "Enhancement", width: "5%" },
    //                     { id: "tier", name: "Tier", width: "5%" },
    //                     { id: "materialStacks", name: "Materials", width: "20%", hidden: true },
    //                     { id: "resourceStacks", name: "Resources", width: "20%", hidden: true },
    //                     { id: "actions", name: "Actions", width: "1%" },
    //                     { id: "containsRelatedElements", name: "ContainsRelatedElements", width: "0%", hidden: true }
    //                 ],
    //                 createFormFields:
    //                     [
    //                         { id: "enhancement", name: "enhancement", type: "range", placeholder: "Enhancement", defaultValue: 0, min: 0, max: 3, step: 1 },
    //                         { id: "tier", name: "Tier", type: "range", placeholder: "Tier", defaultValue: 4, min: 1, max: 8, step: 1 },
    //                         { id: "material", name: "MaterialId", type: "asyncRelatedDropdown", placeholder: "Material", dataFactory: this.materialRequestDataFactory },
    //                         {
    //                             id: "materialStacks",
    //                             name: "MaterialStacks",
    //                             sub_entries: [
    //                                 { id: "MaterialStacks_externalId", name: "MaterialExternalId", type: "asyncRelatedDropdown", placeholder: "Material", dataFactory: this.materialRequestDataFactory },
    //                                 { id: "MaterialStacks_count", name: "Count", type: "text", placeholder: "Count" }
    //                             ],
    //                             type: "relatedMany",
    //                             placeholder: "Material stacks"
    //                         },
    //                         {
    //                             id: "resourceStacks",
    //                             name: "ResourceStacks",
    //                             sub_entries: [
    //                                 { id: "ResourceStacks_externalId", name: "ResourceExternalId", type: "asyncRelatedDropdown", placeholder: "Resource", dataFactory: this.resourceRequestDataFactory },
    //                                 { id: "ResourceStacks_count", name: "Count", type: "text", placeholder: "Count" }
    //                             ],
    //                             type: "relatedMany",
    //                             placeholder: "Resource Stacks"
    //                         }
    //                     ],
    //                 detailsFormFields: (item) => {
    //                     return {
    //                         fields: [
    //                             { id: "externalId", name: "ExternalId", type: "hidden", placeholder: "External Id", defaultValue: item.externalId },
    //                             { id: "enhancement", name: "enhancement", type: "range", placeholder: "Enhancement", defaultValue: 0, min: 0, max: 3, step: 1, defaultValue: item.enhancement, disabled: true },
    //                             { id: "tier", name: "Tier", type: "range", placeholder: "Tier", defaultValue: 4, min: 1, max: 8, step: 1, defaultValue: item.tier, disabled: true },
    //                             { id: "material", name: "MaterialExternalId", type: "asyncRelatedDropdown", placeholder: "Material", dataFactory: this.materialRequestDataFactory, defaultValue: item.material, isDisabled: true },
    //                             {
    //                                 id: "materialStacks",
    //                                 name: "MaterialStacks",
    //                                 sub_entries: [
    //                                     { id: "MaterialStacks_externalId", name: "MaterialExternalId", type: "asyncRelatedDropdown", placeholder: "Material", dataFactory: this.materialRequestDataFactory, isDisabled: true },
    //                                     { id: "MaterialStacks_count", name: "Count", type: "text", placeholder: "Count", readOnly: true }
    //                                 ],
    //                                 defaultValue: item.materialStacks,
    //                                 type: "relatedMany",
    //                                 placeholder: "Material stacks"
    //                             },
    //                             {
    //                                 id: "resourceStacks",
    //                                 name: "ResourceStacks",
    //                                 sub_entries: [
    //                                     { id: "ResourceStacks_externalId", name: "ResourceExternalId", type: "asyncRelatedDropdown", placeholder: "Resource", dataFactory: this.resourceRequestDataFactory, isDisabled: true },
    //                                     { id: "ResourceStacks_count", name: "Count", type: "text", placeholder: "Count", readOnly: true }
    //                                 ],
    //                                 defaultValue: item.resourceStacks,
    //                                 type: "relatedMany",
    //                                 placeholder: "Resource Stacks"
    //                             }
    //                         ]
    //                     }
    //                 },
    //                 editFormFields: (item) => {
    //                     return {
    //                         fields: [
    //                             { id: "externalId", name: "ExternalId", type: "hidden", placeholder: "External Id", defaultValue: item.externalId },
    //                             { id: "enhancement", name: "enhancement", type: "range", placeholder: "Enhancement", defaultValue: 0, min: 0, max: 3, step: 1, defaultValue: item.enhancement },
    //                             { id: "tier", name: "Tier", type: "range", placeholder: "Tier", defaultValue: 4, min: 1, max: 8, step: 1, defaultValue: item.tier },
    //                             { id: "MaterialExternalId", name: "MaterialExternalId", type: "asyncRelatedDropdown", placeholder: "Material", dataFactory: this.materialRequestDataFactory, defaultValue: item.material },
    //                             {
    //                                 id: "materialStacks",
    //                                 name: "MaterialStacks",
    //                                 sub_entries: [
    //                                     { id: "MaterialStacks_materialExternalId", name: "MaterialExternalId", type: "asyncRelatedDropdown", placeholder: "Material", dataFactory: this.materialRequestDataFactory },
    //                                     { id: "MaterialStacks_count", name: "Count", type: "text", placeholder: "Count" }
    //                                 ],
    //                                 defaultValue: item.materialStacks,
    //                                 type: "relatedMany",
    //                                 placeholder: "Material stacks"
    //                             },
    //                             {
    //                                 id: "resourceStacks",
    //                                 name: "ResourceStacks",
    //                                 sub_entries: [
    //                                     { id: "ResourceStacks_resourceExternalId", name: "ResourceExternalId", type: "asyncRelatedDropdown", placeholder: "Resource", dataFactory: this.resourceRequestDataFactory },
    //                                     { id: "ResourceStacks_count", name: "Count", type: "text", placeholder: "Count" }
    //                                 ],
    //                                 defaultValue: item.resourceStacks,
    //                                 type: "relatedMany",
    //                                 placeholder: "Resource Stacks"
    //                             }
    //                         ]
    //                     }
    //                 },
    //                 deleteRelatedFields: (item) => {
    //                     return {
    //                         containsRelatedElements: item.containsRelatedElements
    //                     }
    //                 },
    //                 createBtnText: "Add refine recipe",
    //                 createFormatHeaderText: "Add new refine recipe"
    //             };
    //         case "material":
    //             return {
    //                 provider: this.props.provider,
    //                 optionsFactory: new TableOptionsFactory(),
    //                 columnsFactory: new TableColumnFactory(),
    //                 actionFactory: new ApiEditDeleteActionsColumnFactory(this.materialRequestDataFactory, "Edit material", "Some product resources are related with this item type"),
    //                 requestDataFactory: this.materialRequestDataFactory,
    //                 propertyDefinitions:
    //                     [
    //                         { id: "externalId", name: "ExternalId", width: "0%", hidden: true },
    //                         { id: "name", name: "Name", width: "49%" },
    //                         { id: "tier", name: "Tier", width: "1%" },
    //                         { id: "enhancement", name: "Enhancement", width: "5%" },
    //                         { id: "actions", name: "Actions", width: "1%" },
    //                         { id: "type", name: "Type", width: "1%" },
    //                         { id: "containsRelatedElements", name: "ContainsRelatedElements", width: "0%", hidden: true }
    //                     ],
    //                 createFormFields:
    //                     [
    //                         { id: "name", name: "name", type: "text", placeholder: "Name" },
    //                         { id: "enhancement", name: "enhancement", type: "range", placeholder: "Enhancement", defaultValue: 0, min: 0, max: 3, step: 1 },
    //                         { id: "tier", name: "tier", type: "range", placeholder: "Tier", defaultValue: 4, min: 1, max: 8, step: 1 },
    //                         { id: "MaterialTypeId", name: "MaterialTypeId", type: "asyncRelatedDropdown", placeholder: "Material Type", dataFactory: this.materialTypeRequestDataFactory },
    //                     ],
    //                 editFormFields: (item) => {
    //                     return {
    //                         fields: [
    //                             { id: "name", name: "name", type: "text", placeholder: "Name", defaultValue: item.name },
    //                             { id: "tier", name: "tier", type: "range", placeholder: "Tier", defaultValue: item.tier, min: 1, max: 8, step: 1 },
    //                             { id: "enhancement", name: "enhancement", type: "range", placeholder: "Enhancement", defaultValue: item.enhancement, min: 0, max: 3, step: 1 },
    //                             { id: "MaterialTypeId", name: "MaterialTypeId", type: "asyncRelatedDropdown", placeholder: "Material Type", dataFactory: this.materialTypeRequestDataFactory, defaultValue: item.type },
    //                             { id: "externalId", name: "ExternalId", type: "hidden", placeholder: "External Id", defaultValue: item.externalId }
    //                         ]
    //                     }
    //                 },
    //                 deleteRelatedFields: (item) => {
    //                     return {
    //                         containsRelatedElements: item.containsRelatedElements
    //                     }
    //                 },
    //                 createBtnText: "Add material",
    //                 createFormatHeaderText: "Add new material"
    //             }
    //         case "resource":
    //             return {
    //                 provider: this.props.provider,
    //                 optionsFactory: new TableOptionsFactory(),
    //                 columnsFactory: new TableColumnFactory(),
    //                 actionFactory: new ApiEditDeleteActionsColumnFactory(this.resourceRequestDataFactory, "Edit resource", "Some product resources are related with this item type"),
    //                 requestDataFactory: this.resourceRequestDataFactory,
    //                 propertyDefinitions:
    //                     [
    //                         { id: "externalId", name: "ExternalId", width: "0%", hidden: true },
    //                         { id: "name", name: "Name", width: "49%" },
    //                         { id: "tier", name: "Tier", width: "1%" },
    //                         { id: "enhancement", name: "Enhancement", width: "5%" },
    //                         { id: "actions", name: "Actions", width: "1%" },
    //                         { id: "type", name: "Type", width: "1%" },
    //                         { id: "containsRelatedElements", name: "ContainsRelatedElements", width: "0%", hidden: true }
    //                     ],
    //                 createFormFields:
    //                     [
    //                         { id: "name", name: "name", type: "text", placeholder: "Name" },
    //                         { id: "enhancement", name: "enhancement", type: "range", placeholder: "Enhancement", defaultValue: 0, min: 0, max: 3, step: 1 },
    //                         { id: "tier", name: "tier", type: "range", placeholder: "Tier", defaultValue: 4, min: 1, max: 8, step: 1 },
    //                         { id: "ResourceTypeId", name: "ResourceTypeId", type: "asyncRelatedDropdown", placeholder: "Resource Type", dataFactory: this.resourceTypeRequestDataFactory }
    //                     ],
    //                 editFormFields: (item) => {
    //                     return {
    //                         fields: [
    //                             { id: "name", name: "name", type: "text", placeholder: "Name", defaultValue: item.name },
    //                             { id: "tier", name: "tier", type: "range", placeholder: "Tier", defaultValue: item.tier, min: 1, max: 8, step: 1 },
    //                             { id: "enhancement", name: "enhancement", type: "range", placeholder: "Enhancement", defaultValue: item.enhancement, min: 0, max: 3, step: 1 },
    //                             { id: "ResourceTypeId", name: "ResourceTypeId", type: "asyncRelatedDropdown", placeholder: "Resource Type", dataFactory: this.resourceTypeRequestDataFactory, defaultValue: item.type },
    //                             { id: "externalId", name: "ExternalId", type: "hidden", placeholder: "External Id", defaultValue: item.externalId }
    //                         ]
    //                     }
    //                 },
    //                 deleteRelatedFields: (item) => {
    //                     return {
    //                         containsRelatedElements: item.containsRelatedElements
    //                     }
    //                 },
    //                 createBtnText: "Add resource",
    //                 createFormatHeaderText: "Add new resource"
    //             }
    //         default:
    //             return null
    //     }
    // };

    showComponent = (component, images) => {
        var imageRetriever = new ImageRetriever("http://127.0.0.1:10000/devstoreaccount1/images", images);
        switch (component) {
            case "refineRecipe":
                return <Col md={11} className="align-self-center ms-2">
                    <Recipe imageRetriever={imageRetriever} />
                </Col>;
            case "material":
                return <Col md={11} className="align-self-center ms-2">
                    <Material imageRetriever={imageRetriever} />
                </Col>;
            case "materialType":
                return <Col md={11} className="align-self-center ms-2">
                    <MaterialType imageRetriever={imageRetriever} />
                </Col>;
            case "resource":
                return <Col md={11} className="align-self-center ms-2">
                    <Resource imageRetriever={imageRetriever} />
                </Col>
            case "resourceType":
                return <Col md={11} className="align-self-center ms-2">
                    <ResourceType imageRetriever={imageRetriever} />
                </Col>;
            case "refineDeal":
                return <Col md={11} className="m-0 p-0 ms-2 mt-3">
                    <Refine imageRetriever={imageRetriever} />
                </Col>
            default:
                return <Col md={11} className="align-self-center ms-2">
                    <p className="text-dark">Welcome in Albion Planner</p>
                </Col>;
        }
    }

    render() {
        const { component, images } = this.state;
        return <Container fluid>
            <Row className="flex-nowrap">
                <Col className="col-auto bg-dark p-0">
                    <div className="d-flex flex-column align-items-center px-3 pt-2 text-white min-vh-100">
                        <NavbarComponent
                            openGatherResourceTypesCrud={this.onGatherResourcesTypeSelected}
                            openMaterialTypesCrud={this.onMaterialTypeSelected}
                            openMaterialsCrud={this.onMaterialSelected}
                            openResourcesCrud={this.onResourceSelected}
                            openRecipesCrud={this.onRefineRecipeSelected}
                            openRefineDeal={this.openRefineDealSelected} />
                    </div>
                </Col>
                {this.showComponent(component, images)}
            </Row >
        </Container >
    }
}

export default AlbionDataApp;