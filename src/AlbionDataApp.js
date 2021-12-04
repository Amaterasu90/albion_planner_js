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
        this.itemTypeRequestDataFactory = new CrudRequestDataFactory("item/type",
            requestDataFactory);
        this.journalRequestDataFactory = new CrudRequestDataFactory("journal",
            requestDataFactory);
        this.resourceRequestDataFactory = new CrudRequestDataFactory("resource",
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

    onItemTypeSelected = (e) => {
        this.setState({
            component: "itemType"
        });
    }

    onJournalSelected = (e) => {
        this.setState({
            component: "journal"
        });
    }

    onResourceSelected = (e) => {
        this.setState({
            component: "resource"
        });
    }

    onProductSelected = (e) => {
        this.setState({
            component: "product"
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
                            { id: "products", name: "Product", width: "0%", hidden: true }
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
                            properties: [item.products]
                        }
                    },
                    createBtnText: "Add artifact",
                    createFormatHeaderText: "Add new artifact"
                };
            case "itemType":
                return {
                    provider: this.props.provider,
                    optionsFactory: new TableOptionsFactory(),
                    columnsFactory: new TableColumnFactory(),
                    actionFactory: new ApiActionColumnFactory(this.itemTypeRequestDataFactory, "Edit item type", "Some products or refine product are related with this item type"),
                    requestDataFactory: this.itemTypeRequestDataFactory,
                    propertyDefinitions: [
                        { id: "externalId", name: "External Id", width: "0%", hidden: true },
                        { id: "name", name: "Name", width: "49%" },
                        { id: "actions", name: "Actions", width: "1%" },
                        { id: "products", name: "Product", width: "0%", hidden: true },
                        { id: "refineProduct", name: "Refine Product", width: "0%", hidden: true }
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
                            properties: [item.products, item.refineProduct]
                        }
                    },
                    createBtnText: "Add item type",
                    createFormatHeaderText: "Add new item type"
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
                            { id: "products", name: "Product", width: "0%", hidden: true }
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
                                { id: "fameCapacity", name: "Fame Capacity", type: "range", placeholder: "Fame Capacity", defaultValue: item.fameCapacity, min: 800, max: 50000, step: 100 },
                                { id: "externalId", name: "ExternalId", type: "hidden", placeholder: "External Id", defaultValue: item.externalId }
                            ]
                        }
                    },
                    deleteRelatedFields: (item) => {
                        return {
                            properties: [item.products]
                        }
                    },
                    createBtnText: "Add journal",
                    createFormatHeaderText: "Add new journal"
                };
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
                            { id: "productResources", name: "Product Resources", width: "0%", hidden: true }
                        ],
                    createFormFields:
                        [
                            { id: "name", name: "name", type: "text", placeholder: "Name" },
                            { id: "enhancement", name: "enhancement", type: "range", placeholder: "Enhancement", defaultValue: 0, min: 0, max: 3, step: 1 },
                            { id: "tier", name: "tier", type: "range", placeholder: "Tier", defaultValue: 4, min: 1, max: 8, step: 1 }
                        ],
                    editFormFields: (item) => {
                        return {
                            fields: [
                                { id: "name", name: "name", type: "text", placeholder: "Name", defaultValue: item.name },
                                { id: "tier", name: "tier", type: "range", placeholder: "Tier", defaultValue: item.tier, min: 1, max: 8, step: 1 },
                                { id: "enhancement", name: "enhancement", type: "range", placeholder: "Enhancement", defaultValue: item.enhancement, min: 0, max: 3, step: 1 },
                                { id: "externalId", name: "ExternalId", type: "hidden", placeholder: "External Id", defaultValue: item.externalId }
                            ]
                        }
                    },
                    deleteRelatedFields: (item) => {
                        return {
                            properties: [item.productResources]
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
                            { id: "name", name: "Name", width: "49%" },
                            { id: "artifact", name: "Artifact", width: "1%" },
                            { id: "journal", name: "Journal", width: "5%" },
                            { id: "type", name: "Type", width: "1%" },
                            { id: "tier", name: "Tier", width: "1%" },
                            { id: "enhancement", name: "Enhancement", width: "1%" },
                            { id: "craftFame", name: "Craft Fame", width: "10%" },
                            { id: "productResources", name: "Product Resources", width: "1%" },
                            { id: "actions", name: "Actions", width: "1%" },
                        ],
                    createFormFields:
                        [
                            { id: "name", name: "Name", type: "text", placeholder: "Name" },
                            { id: "tier", name: "Tier", type: "range", placeholder: "Tier", defaultValue: 4, min: 1, max: 8, step: 1 },
                            { id: "enhancement", name: "Enhancement", type: "range", placeholder: "Enhancement", defaultValue: 0, min: 0, max: 3, step: 1 },
                            { id: "craftFame", name: "CraftFame", type: "range", placeholder: "Fame", defaultValue: 1200, min: 800, max: 50000, step: 100 },
                            { id: "artifactExternalId", name: "ArtifactExternalId", type: "asyncRelatedDropdown", placeholder: "Artifact", dataFactory: this.artifactRequestDataFactory },
                            { id: "journalExternalId", name: "JournalExternalId", type: "asyncRelatedDropdown", placeholder: "Journal", dataFactory: this.journalRequestDataFactory },
                            { id: "itemTypeExternalId", name: "ItemTypeExternalId", type: "asyncRelatedDropdown", placeholder: "Item Type", dataFactory: this.itemTypeRequestDataFactory },
                            {
                                id: "productResources",
                                name: "ProductResources",
                                sub_entries: [
                                    { id: "ProductResources_resource_externalId", name: "ResourceExternalId", type: "asyncRelatedDropdown", placeholder: "Resource", dataFactory: this.resourceRequestDataFactory },
                                    { id: "ProductResources_count", name: "Count", type: "text", placeholder: "Count" }
                                ],
                                type: "relatedMany",
                                placeholder: "Resources"
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
                                { id: "artifactExternalId", name: "ArtifactExternalId", type: "asyncRelatedDropdown", placeholder: "Artifact", dataFactory: this.artifactRequestDataFactory, defaultValue: item.artifact },
                                { id: "journalExternalId", name: "JournalExternalId", type: "asyncRelatedDropdown", placeholder: "Journal", dataFactory: this.journalRequestDataFactory, defaultValue: item.journal },
                                { id: "itemTypeExternalId", name: "ItemTypeExternalId", type: "asyncRelatedDropdown", placeholder: "Item Type", dataFactory: this.itemTypeRequestDataFactory, defaultValue: item.type },
                                {
                                    id: "productResources",
                                    name: "ProductResources",
                                    sub_entries: [
                                        { id: "ProductResources_resource_externalId", name: "ResourceExternalId", type: "asyncRelatedDropdown", placeholder: "Resource", dataFactory: this.resourceRequestDataFactory },
                                        { id: "ProductResources_count", name: "Count", type: "text", placeholder: "Count" }
                                    ],
                                    defaultValue: item.productResources,
                                    type: "relatedMany",
                                    placeholder: "Resources"
                                }
                            ]
                        }
                    },
                    deleteRelatedFields: (item) => {
                        return {
                            properties: []
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
                            { name: "externalId", width: "0%", hidden: true },
                            { name: "name", width: "49%" },
                            { name: "tier", width: "1%" },
                            { name: "actions", width: "1%" },
                            { name: "product", width: "0%", hidden: true }
                        ],
                    createFormFields:
                        [
                            { id: "name", name: "name", type: "text", placeholder: "Name" },
                            { id: "tier", name: "tier", type: "range", placeholder: "Tier", defaultValue: 4, min: 1, max: 8, step: 1 }
                        ],
                    editFormFields: (item) => {
                        return {
                            fields: [
                                { id: "name", name: "name", type: "text", placeholder: "Name", defaultValue: item.name },
                                { id: "tier", name: "tier", type: "range", placeholder: "Tier", defaultValue: item.tier, min: 1, max: 8, step: 1 },
                                { id: "externalId", name: "externalId", type: "hidden", placeholder: "externalId", defaultValue: item.externalId }
                            ]
                        }
                    },
                    deleteRelatedFields: (item) => {
                        return {
                            properties: [item.product]
                        }
                    },
                    createBtnText: "Add artifact",
                    createFormatHeaderText: "Add new artifact"
                };
        }
    }

    render() {
        const { component } = this.state;
        return <Container fluid>
            <Row className="flex-nowrap">
                <Col className="col-auto bg-dark">
                    <div className="d-flex flex-column align-items-center px-3 pt-2 text-white min-vh-100">
                        <NavbarComponent
                            openArtifactsCrud={this.onArtifactSelected}
                            openItemTypesCrud={this.onItemTypeSelected}
                            openJournalsCrud={this.onJournalSelected}
                            openResourcesCrud={this.onResourceSelected}
                            openProductsCrud={this.onProductSelected} />
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