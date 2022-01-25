import React from 'react';
import CrudComponent from './components/CrudComponent'
import TableOptionsFactory from './factories/TableOptionsFactory';
import TableColumnFactory from './factories/TableColumnFactory';
import ApiActionColumnFactory from './factories/ApiActionColumnFactory';
import RequestDataFactory from './factories/RequestDataFactory';
import CrudRequestDataFactory from './factories/CrudRequestDataFactory';
import NavbarComponent from './components/navigation/NavbarComponent';
import { Col, Row } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

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
        this.resourceRequestDataFactory = new CrudRequestDataFactory("resource",
            requestDataFactory);
        this.journalRequestDataFactory = new CrudRequestDataFactory("journal",
            requestDataFactory);
        this.materialRequestDataFactory = new CrudRequestDataFactory("material",
            requestDataFactory);
        this.productRequestDataFactory = new CrudRequestDataFactory("product",
            requestDataFactory);
        this.state = {
            component: "artifact"
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

    showComponent = (component) => {
        switch (component) {
            case "artifact":
                return {
                    provider: this.props.provider,
                    optionsFactory: new TableOptionsFactory(),
                    columnsFactory: new TableColumnFactory(),
                    actionFactory: new ApiActionColumnFactory(this.artifactRequestDataFactory, "Edit artifact", "Some products are related with this artifact"),
                    requestDataFactory: this.artifactRequestDataFactory,
                    propertyDefinitions:
                        [
                            { id: "externalId", name: "External Id", width: "0%", hidden: true },
                            { id: "name", name: "Name", width: "49%" },
                            { id: "tier", name: "Tier", width: "1%" },
                            { id: "actions", name: "Actions", width: "1%" },
                            { id: "artifactType", name: "Type", with: "1%" },
                            { id: "containsRelatedElements", name: "ContainsRelatedElements", width: "0%", hidden: true }
                        ],
                    createFormFields:
                        [
                            { id: "name", name: "Name", type: "text", placeholder: "Name" },
                            { id: "artifactType", name: "ArtifactType", type: "dropdown", placeholder: "Artifact Type", defaultValue: 1, options: [{ value: 1, text: "Rune" }, { value: 2, text: "Soul" }, { value: 3, text: "Relict" }, { value: 4, text: "Avalonian" }] },
                            { id: "tier", name: "Tier", type: "range", placeholder: "Tier", defaultValue: 4, min: 1, max: 8, step: 1 }
                        ],
                    editFormFields: (item) => {
                        return {
                            fields: [
                                { id: "name", name: "Name", type: "text", placeholder: "Name", defaultValue: item.name },
                                { id: "tier", name: "Tier", type: "range", placeholder: "Tier", defaultValue: item.tier, min: 1, max: 8, step: 1 },
                                { id: "artifactType", name: "ArtifactType", type: "dropdown", placeholder: "Artifact Type", defaultValue: item.artifactType, options: [{ value: 1, text: "Rune" }, { value: 2, text: "Soul" }, { value: 3, text: "Relict" }, { value: 4, text: "Avalonian" }] },
                                { id: "externalId", name: "ExternalId", type: "hidden", placeholder: "External Id", defaultValue: item.externalId }
                            ]
                        }
                    },
                    deleteRelatedFields: (item) => {
                        return {
                            containsRelatedElements: item.containsRelatedElements
                        }
                    },
                    createBtnText: "Add artifact",
                    createFormatHeaderText: "Add new artifact"
                };
            case "productType":
                return {
                    provider: this.props.provider,
                    optionsFactory: new TableOptionsFactory(),
                    columnsFactory: new TableColumnFactory(),
                    actionFactory: new ApiActionColumnFactory(this.productTypeRequestDataFactory, "Edit product type", "Some products product are related with this item type"),
                    requestDataFactory: this.productTypeRequestDataFactory,
                    propertyDefinitions: [
                        { id: "externalId", name: "External Id", width: "0%", hidden: true },
                        { id: "name", name: "Name", width: "49%" },
                        { id: "actions", name: "Actions", width: "1%" },
                        { id: "containsRelatedElements", name: "ContainsRelatedElements", width: "0%", hidden: true }
                    ],
                    createFormFields:
                        [
                            { id: "name", name: "Name", type: "text", placeholder: "Name" }
                        ],
                    editFormFields: (item) => {
                        return {
                            fields: [
                                { id: "name", name: "Name", type: "text", placeholder: "Name", defaultValue: item.name },
                                { id: "externalId", name: "ExternalId", type: "hidden", placeholder: "External Id", defaultValue: item.externalId }
                            ]
                        }
                    },
                    deleteRelatedFields: (item) => {
                        return {
                            containsRelatedElements: item.containsRelatedElements
                        }
                    },
                    createBtnText: "Add product type",
                    createFormatHeaderText: "Add new product type"
                };
            case "materialType":
                return {
                    provider: this.props.provider,
                    optionsFactory: new TableOptionsFactory(),
                    columnsFactory: new TableColumnFactory(),
                    actionFactory: new ApiActionColumnFactory(this.materialTypeRequestDataFactory, "Edit material type", "Some products are related with this item type"),
                    requestDataFactory: this.materialTypeRequestDataFactory,
                    propertyDefinitions: [
                        { id: "externalId", name: "External Id", width: "0%", hidden: true },
                        { id: "name", name: "Name", width: "49%" },
                        { id: "actions", name: "Actions", width: "1%" },
                        { id: "containsRelatedElements", name: "ContainsRelatedElements", width: "0%", hidden: true }
                    ],
                    createFormFields:
                        [
                            { id: "name", name: "Name", type: "text", placeholder: "Name" }
                        ],
                    editFormFields: (item) => {
                        return {
                            fields: [
                                { id: "name", name: "Name", type: "text", placeholder: "Name", defaultValue: item.name },
                                { id: "externalId", name: "ExternalId", type: "hidden", placeholder: "External Id", defaultValue: item.externalId }
                            ]
                        }
                    },
                    deleteRelatedFields: (item) => {
                        return {
                            containsRelatedElements: item.containsRelatedElements
                        }
                    },
                    createBtnText: "Add material type",
                    createFormatHeaderText: "Add new material type"
                };
            case "resourceType":
                return {
                    provider: this.props.provider,
                    optionsFactory: new TableOptionsFactory(),
                    columnsFactory: new TableColumnFactory(),
                    actionFactory: new ApiActionColumnFactory(this.resourceTypeRequestDataFactory, "Edit resource type", "Some materials are related with this item type"),
                    requestDataFactory: this.resourceTypeRequestDataFactory,
                    propertyDefinitions: [
                        { id: "externalId", name: "External Id", width: "0%", hidden: true },
                        { id: "name", name: "Name", width: "49%" },
                        { id: "actions", name: "Actions", width: "1%" },
                        { id: "containsRelatedElements", name: "ContainsRelatedElements", width: "0%", hidden: true }
                    ],
                    createFormFields:
                        [
                            { id: "name", name: "Name", type: "text", placeholder: "Name" }
                        ],
                    editFormFields: (item) => {
                        return {
                            fields: [
                                { id: "name", name: "Name", type: "text", placeholder: "Name", defaultValue: item.name },
                                { id: "externalId", name: "ExternalId", type: "hidden", placeholder: "External Id", defaultValue: item.externalId }
                            ]
                        }
                    },
                    deleteRelatedFields: (item) => {
                        return {
                            containsRelatedElements: item.containsRelatedElements
                        }
                    },
                    createBtnText: "Add resource type",
                    createFormatHeaderText: "Add new resource type"
                };
            case "journal":
                return {
                    provider: this.props.provider,
                    optionsFactory: new TableOptionsFactory(),
                    columnsFactory: new TableColumnFactory(),
                    actionFactory: new ApiActionColumnFactory(this.journalRequestDataFactory, "Edit journal", "Some products are related with this item type"),
                    requestDataFactory: this.journalRequestDataFactory,
                    propertyDefinitions:
                        [
                            { id: "externalId", name: "External Id", width: "0%", hidden: true },
                            { id: "name", name: "Name", width: "49%" },
                            { id: "tier", name: "Tier", width: "1%" },
                            { id: "fameCapacity", name: "Fame Capacity", width: "5%" },
                            { id: "actions", name: "Actions", width: "1%" },
                            { id: "containsRelatedElements", name: "ContainsRelatedElements", width: "0%", hidden: true }
                        ],
                    createFormFields:
                        [
                            { id: "name", name: "name", type: "text", placeholder: "Name" },
                            { id: "fameCapacity", name: "FameCapacity", type: "range", placeholder: "Fame Capacity", defaultValue: 1200, min: 800, max: 50000, step: 100 },
                            { id: "tier", name: "tier", type: "range", placeholder: "Tier", defaultValue: 4, min: 1, max: 8, step: 1 }
                        ],
                    editFormFields: (item) => {
                        return {
                            fields: [
                                { id: "name", name: "name", type: "text", placeholder: "Name", defaultValue: item.name },
                                { id: "tier", name: "tier", type: "range", placeholder: "Tier", defaultValue: item.tier, min: 1, max: 8, step: 1 },
                                { id: "fameCapacity", name: "FameCapacity", type: "range", placeholder: "Fame Capacity", defaultValue: item.fameCapacity, min: 800, max: 50000, step: 100 },
                                { id: "externalId", name: "ExternalId", type: "hidden", placeholder: "External Id", defaultValue: item.externalId }
                            ]
                        }
                    },
                    deleteRelatedFields: (item) => {
                        return {
                            containsRelatedElements: item.containsRelatedElements
                        }
                    },
                    createBtnText: "Add journal",
                    createFormatHeaderText: "Add new journal"
                };
            case "material":
                return {
                    provider: this.props.provider,
                    optionsFactory: new TableOptionsFactory(),
                    columnsFactory: new TableColumnFactory(),
                    actionFactory: new ApiActionColumnFactory(this.materialRequestDataFactory, "Edit material", "Some product resources are related with this item type"),
                    requestDataFactory: this.materialRequestDataFactory,
                    propertyDefinitions:
                        [
                            { id: "externalId", name: "ExternalId", width: "0%", hidden: true },
                            { id: "name", name: "Name", width: "49%" },
                            { id: "tier", name: "Tier", width: "1%" },
                            { id: "enhancement", name: "Enhancement", width: "5%" },
                            { id: "actions", name: "Actions", width: "1%" },
                            { id: "type", name: "Type", width: "1%" },
                            { id: "resourceMaterials", name: "ResourceMaterials", width: "1%" },
                            { id: "containsRelatedElements", name: "ContainsRelatedElements", width: "0%", hidden: true }
                        ],
                    createFormFields:
                        [
                            { id: "name", name: "name", type: "text", placeholder: "Name" },
                            { id: "enhancement", name: "enhancement", type: "range", placeholder: "Enhancement", defaultValue: 0, min: 0, max: 3, step: 1 },
                            { id: "tier", name: "tier", type: "range", placeholder: "Tier", defaultValue: 4, min: 1, max: 8, step: 1 },
                            { id: "MaterialTypeId", name: "MaterialTypeId", type: "asyncRelatedDropdown", placeholder: "Material Type", dataFactory: this.materialTypeRequestDataFactory },
                            {
                                id: "resourceMaterials",
                                name: "ResourceMaterials",
                                sub_entries: [
                                    { id: "ResourceMaterials_resource_externalId", name: "ResourceExternalId", type: "asyncRelatedDropdown", placeholder: "Resource", dataFactory: this.resourceRequestDataFactory },
                                    { id: "ResourceMaterials_count", name: "Count", type: "text", placeholder: "Count" }
                                ],
                                type: "relatedMany",
                                placeholder: "Resources"
                            }
                        ],
                    editFormFields: (item) => {
                        return {
                            fields: [
                                { id: "name", name: "name", type: "text", placeholder: "Name", defaultValue: item.name },
                                { id: "tier", name: "tier", type: "range", placeholder: "Tier", defaultValue: item.tier, min: 1, max: 8, step: 1 },
                                { id: "enhancement", name: "enhancement", type: "range", placeholder: "Enhancement", defaultValue: item.enhancement, min: 0, max: 3, step: 1 },
                                { id: "MaterialTypeId", name: "MaterialTypeId", type: "asyncRelatedDropdown", placeholder: "Material Type", dataFactory: this.materialTypeRequestDataFactory, defaultValue: item.type },
                                { id: "externalId", name: "ExternalId", type: "hidden", placeholder: "External Id", defaultValue: item.externalId },
                                {
                                    id: "resourceMaterials",
                                    name: "ResourceMaterials",
                                    sub_entries: [
                                        { id: "ResourceMaterials_resource_externalId", name: "ResourceExternalId", type: "asyncRelatedDropdown", placeholder: "Resource", dataFactory: this.resourceRequestDataFactory },
                                        { id: "ResourceMaterials_count", name: "Count", type: "text", placeholder: "Count" }
                                    ],
                                    defaultValue: item.resourceMaterials,
                                    type: "relatedMany",
                                    placeholder: "Resources"
                                }
                            ]
                        }
                    },
                    deleteRelatedFields: (item) => {
                        return {
                            containsRelatedElements: item.containsRelatedElements
                        }
                    },
                    createBtnText: "Add material",
                    createFormatHeaderText: "Add new material"
                }
            case "resource":
                return {
                    provider: this.props.provider,
                    optionsFactory: new TableOptionsFactory(),
                    columnsFactory: new TableColumnFactory(),
                    actionFactory: new ApiActionColumnFactory(this.resourceRequestDataFactory, "Edit resource", "Some product resources are related with this item type"),
                    requestDataFactory: this.resourceRequestDataFactory,
                    propertyDefinitions:
                        [
                            { id: "externalId", name: "ExternalId", width: "0%", hidden: true },
                            { id: "name", name: "Name", width: "49%" },
                            { id: "tier", name: "Tier", width: "1%" },
                            { id: "enhancement", name: "Enhancement", width: "5%" },
                            { id: "actions", name: "Actions", width: "1%" },
                            { id: "type", name: "Type", width: "1%" },
                            { id: "containsRelatedElements", name: "ContainsRelatedElements", width: "0%", hidden: true }
                        ],
                    createFormFields:
                        [
                            { id: "name", name: "name", type: "text", placeholder: "Name" },
                            { id: "enhancement", name: "enhancement", type: "range", placeholder: "Enhancement", defaultValue: 0, min: 0, max: 3, step: 1 },
                            { id: "tier", name: "tier", type: "range", placeholder: "Tier", defaultValue: 4, min: 1, max: 8, step: 1 },
                            { id: "ResourceTypeId", name: "ResourceTypeId", type: "asyncRelatedDropdown", placeholder: "Resource Type", dataFactory: this.resourceTypeRequestDataFactory }
                        ],
                    editFormFields: (item) => {
                        return {
                            fields: [
                                { id: "name", name: "name", type: "text", placeholder: "Name", defaultValue: item.name },
                                { id: "tier", name: "tier", type: "range", placeholder: "Tier", defaultValue: item.tier, min: 1, max: 8, step: 1 },
                                { id: "enhancement", name: "enhancement", type: "range", placeholder: "Enhancement", defaultValue: item.enhancement, min: 0, max: 3, step: 1 },
                                { id: "ResourceTypeId", name: "ResourceTypeId", type: "asyncRelatedDropdown", placeholder: "Resource Type", dataFactory: this.resourceTypeRequestDataFactory, defaultValue: item.type },
                                { id: "externalId", name: "ExternalId", type: "hidden", placeholder: "External Id", defaultValue: item.externalId }
                            ]
                        }
                    },
                    deleteRelatedFields: (item) => {
                        return {
                            containsRelatedElements: item.containsRelatedElements
                        }
                    },
                    createBtnText: "Add resource",
                    createFormatHeaderText: "Add new resource"
                }
            case "product":
                return {
                    provider: this.props.provider,
                    optionsFactory: new TableOptionsFactory(),
                    columnsFactory: new TableColumnFactory(),
                    actionFactory: new ApiActionColumnFactory(this.productRequestDataFactory, "Edit product", "Some product resources are related with this item type"),
                    requestDataFactory: this.productRequestDataFactory,
                    propertyDefinitions:
                        [
                            { id: "externalId", name: "External Id", width: "0%", hidden: true },
                            { id: "name", name: "Name", width: "1%" },
                            { id: "artifact", name: "Artifact", width: "1%" },
                            { id: "journal", name: "Journal", width: "1%" },
                            { id: "type", name: "Type", width: "1%" },
                            { id: "tier", name: "Tier", width: "1%" },
                            { id: "enhancement", name: "Enhancement", width: "1%" },
                            { id: "craftFame", name: "Craft Fame", width: "1%" },
                            { id: "productMaterials", name: "Product Materials", width: "1%" },
                            { id: "productResources", name: "Product Resources", width: "1%" },
                            { id: "subProduct", name: "Sub Product", width: "1%" },
                            { id: "createdOn", name: "Created On", width: "1%" },
                            { id: "modifiedOn", name: "Modified On", width: "1%" },
                            { id: "actions", name: "Actions", width: "1%" },
                        ],
                    createFormFields:
                        [
                            { id: "name", name: "Name", type: "text", placeholder: "Name" },
                            { id: "tier", name: "Tier", type: "range", placeholder: "Tier", defaultValue: 4, min: 1, max: 8, step: 1 },
                            { id: "enhancement", name: "Enhancement", type: "range", placeholder: "Enhancement", defaultValue: 0, min: 0, max: 3, step: 1 },
                            { id: "craftFame", name: "CraftFame", type: "range", placeholder: "Fame", defaultValue: 1200, min: 800, max: 50000, step: 100 },
                            { id: "journalExternalId", name: "JournalExternalId", type: "asyncRelatedDropdown", placeholder: "Journal", dataFactory: this.journalRequestDataFactory },
                            { id: "productTypeExternalId", name: "ProductTypeExternalId", type: "asyncRelatedDropdown", placeholder: "Product Type", dataFactory: this.productTypeRequestDataFactory },
                            { id: "artifactExternalId", name: "ArtifactExternalId", type: "asyncRelatedDropdown", placeholder: "Artifact", dataFactory: this.artifactRequestDataFactory, optional: true },
                            { id: "subProductExternalId", name: "SubProductExternalId", type: "asyncRelatedDropdown", placeholder: "Sub Product", dataFactory: this.productRequestDataFactory, optional: true },
                            {
                                id: "productMaterials",
                                name: "ProductMaterials",
                                sub_entries: [
                                    { id: "ProductMaterials_material_externalId", name: "MaterialExternalId", type: "asyncRelatedDropdown", placeholder: "Material", dataFactory: this.materialRequestDataFactory },
                                    { id: "ProductMaterials_count", name: "Count", type: "text", placeholder: "Count" }
                                ],
                                type: "relatedMany",
                                placeholder: "Materials",
                                optional: true
                            },
                            {
                                id: "productResources",
                                name: "ProductResources",
                                sub_entries: [
                                    { id: "ProductResources_resource_externalId", name: "ResourceExternalId", type: "asyncRelatedDropdown", placeholder: "Resource", dataFactory: this.resourceRequestDataFactory },
                                    { id: "ProductResources_count", name: "Count", type: "text", placeholder: "Count" }
                                ],
                                type: "relatedMany",
                                placeholder: "Resources",
                                optional: true
                            }
                        ],
                    editFormFields: (item) => {
                        return {
                            fields: [
                                { id: "externalId", name: "ExternalId", type: "hidden", placeholder: "External Id", defaultValue: item.externalId },
                                { id: "name", name: "name", type: "Text", placeholder: "Name", defaultValue: item.name },
                                { id: "tier", name: "tier", type: "range", placeholder: "Tier", defaultValue: item.tier, min: 1, max: 8, step: 1 },
                                { id: "enhancement", name: "Enhancement", type: "range", placeholder: "Enhancement", defaultValue: item.enhancement, min: 0, max: 3, step: 1 },
                                { id: "craftFame", name: "CraftFame", type: "range", placeholder: "Fame", defaultValue: item.craftFame, min: 800, max: 50000, step: 100 },
                                { id: "journalExternalId", name: "JournalExternalId", type: "asyncRelatedDropdown", placeholder: "Journal", dataFactory: this.journalRequestDataFactory, defaultValue: item.journal },
                                { id: "productTypeExternalId", name: "ProductTypeExternalId", type: "asyncRelatedDropdown", placeholder: "Product Type", dataFactory: this.productTypeRequestDataFactory, defaultValue: item.type },
                                { id: "artifactExternalId", name: "ArtifactExternalId", type: "asyncRelatedDropdown", placeholder: "Artifact", dataFactory: this.artifactRequestDataFactory, defaultValue: item.artifact, optional: true },
                                { id: "subProductExternalId", name: "SubProductExternalId", type: "asyncRelatedDropdown", placeholder: "Sub Product", dataFactory: this.productRequestDataFactory, defaultValue: item.subProduct, optional: true },
                                {
                                    id: "productMaterials",
                                    name: "ProductMaterials",
                                    sub_entries: [
                                        { id: "ProductMaterials_material_externalId", name: "MaterialExternalId", type: "asyncRelatedDropdown", placeholder: "Material", dataFactory: this.materialRequestDataFactory },
                                        { id: "ProductMaterials_count", name: "Count", type: "text", placeholder: "Count" }
                                    ],
                                    defaultValue: item.productMaterials,
                                    type: "relatedMany",
                                    placeholder: "Materials",
                                    optional: true
                                },
                                {
                                    id: "productResources",
                                    name: "ProductResources",
                                    sub_entries: [
                                        { id: "ProductResources_resource_externalId", name: "ResourceExternalId", type: "asyncRelatedDropdown", placeholder: "Resource", dataFactory: this.resourceRequestDataFactory },
                                        { id: "ProductResources_count", name: "Count", type: "text", placeholder: "Count" }
                                    ],
                                    defaultValue: item.productResources,
                                    type: "relatedMany",
                                    placeholder: "Resources",
                                    optional: true
                                }
                            ]
                        }
                    },
                    deleteRelatedFields: (item) => {
                        return {
                            containsRelatedElements: false
                        }
                    },
                    createBtnText: "Add product",
                    createFormatHeaderText: "Add new product"
                }
            default:
                return {
                    provider: this.props.provider,
                    optionsFactory: new TableOptionsFactory(),
                    columnsFactory: new TableColumnFactory(),
                    actionFactory: new ApiActionColumnFactory(this.artifactRequestDataFactory, "Edit artifact", "Some products are related with this artifact"),
                    requestDataFactory: this.artifactRequestDataFactory,
                    propertyDefinitions:
                        [
                            { id: "externalId", name: "External Id", width: "0%", hidden: true },
                            { id: "name", name: "Name", width: "49%" },
                            { id: "tier", name: "Tier", width: "1%" },
                            { id: "actions", name: "Actions", width: "1%" },
                            { id: "containsRelatedElements", name: "ContainsRelatedElements", width: "0%", hidden: true }
                        ],
                    createFormFields:
                        [
                            { id: "name", name: "Name", type: "text", placeholder: "Name" },
                            { id: "tier", name: "Tier", type: "range", placeholder: "Tier", defaultValue: 4, min: 1, max: 8, step: 1 }
                        ],
                    editFormFields: (item) => {
                        return {
                            fields: [
                                { id: "name", name: "Name", type: "text", placeholder: "Name", defaultValue: item.name },
                                { id: "tier", name: "Tier", type: "range", placeholder: "Tier", defaultValue: item.tier, min: 1, max: 8, step: 1 },
                                { id: "externalId", name: "ExternalId", type: "hidden", placeholder: "External Id", defaultValue: item.externalId }
                            ]
                        }
                    },
                    deleteRelatedFields: (item) => {
                        return {
                            containsRelatedElements: item.containsRelatedElements
                        }
                    },
                    createBtnText: "Add artifact",
                    createFormatHeaderText: "Add new artifact"
                };
        }
    };

    render() {
        const { component } = this.state;
        return <Container fluid>
            <Row className="flex-nowrap">
                <Col className="col-auto bg-dark">
                    <div className="d-flex flex-column align-items-center px-3 pt-2 text-white min-vh-100">
                        <NavbarComponent
                            openArtifactsCrud={this.onArtifactSelected}
                            openProductTypesCrud={this.onProductTypeSelected}
                            openGatherResourceTypesCrud={this.onGatherResourcesTypeSelected}
                            openMaterialTypesCrud={this.onMaterialTypeSelected}
                            openJournalsCrud={this.onJournalSelected}
                            openMaterialsCrud={this.onMaterialSelected}
                            openProductsCrud={this.onProductSelected}
                            openResourcesCrud={this.onResourceSelected} />
                    </div>
                </Col>
                <Col className="align-self-center">
                    <CrudComponent {... this.showComponent(component)} />
                </Col>
            </Row >
        </Container >
    }
}

export default AlbionDataApp;