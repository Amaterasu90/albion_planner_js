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
        this.journalTypeRequestDataFactory = new CrudRequestDataFactory("journal",
            requestDataFactory);
        this.resourceTypeRequestDataFactory = new CrudRequestDataFactory("resource",
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
            case "itemType":
                return {
                    provider: this.props.provider,
                    optionsFactory: new TableOptionsFactory(),
                    columnsFactory: new TableColumnFactory(),
                    actionFactory: new ApiActionColumnFactory(this.itemTypeRequestDataFactory, "Edit item type", "Some products or refine product are related with this item type"),
                    requestDataFactory: this.itemTypeRequestDataFactory,
                    propertyDefinitions: [
                        { name: "externalId", width: "0%", hidden: true },
                        { name: "name", width: "49%" },
                        { name: "actions", width: "1%" },
                        { name: "product", width: "0%", hidden: true },
                        { name: "refineProduct", width: "0%", hidden: true }
                    ],
                    createFormFields:
                        [
                            { id: "name", name: "name", type: "text", placeholder: "Name" }
                        ],
                    editFormFields: (item) => {
                        return {
                            fields: [
                                { id: "name", name: "name", type: "text", placeholder: "Name", defaultValue: item.name },
                                { id: "externalId", name: "externalId", type: "hidden", placeholder: "externalId", defaultValue: item.externalId }
                            ]
                        }
                    },
                    deleteRelatedFields: (item) => {
                        return {
                            properties: [item.product, item.refineProduct]
                            ,
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
                    actionFactory: new ApiActionColumnFactory(this.journalTypeRequestDataFactory, "Edit journal", "Some products are related with this item type"),
                    requestDataFactory: this.journalTypeRequestDataFactory,
                    propertyDefinitions:
                        [
                            { name: "externalId", width: "0%", hidden: true },
                            { name: "name", width: "49%" },
                            { name: "tier", width: "1%" },
                            { name: "fameCapacity", width: "5%" },
                            { name: "actions", width: "1%" },
                            { name: "product", width: "0%", hidden: true }
                        ],
                    createFormFields:
                        [
                            { id: "name", name: "name", type: "text", placeholder: "Name"},
                            { id: "fameCapacity", name: "fameCapacity", type: "range", placeholder: "Fame Capacity", defaultValue: 1200, min: 800, max: 50000, step: 100 },
                            { id: "tier", name: "tier", type: "range", placeholder: "Tier", defaultValue: 4, min: 1, max: 8, step: 1 }
                        ],
                    editFormFields: (item) => {
                        return {
                            fields: [
                                { id: "name", name: "name", type: "text", placeholder: "Name", defaultValue: item.name },
                                { id: "tier", name: "tier", type: "range", placeholder: "Tier", defaultValue: item.tier, min: 1, max: 8, step: 1 },
                                { id: "fameCapacity", name: "fameCapacity", type: "range", placeholder: "Fame Capacity", defaultValue: item.fameCapacity, min: 800, max: 50000, step: 100 },
                                { id: "externalId", name: "externalId", type: "hidden", placeholder: "externalId", defaultValue: item.externalId }
                            ]
                        }
                    },
                    deleteRelatedFields: (item) => {
                        return {
                            properties: [item.product]
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
                    actionFactory: new ApiActionColumnFactory(this.resourceTypeRequestDataFactory, "Edit resource", "Some product resources are related with this item type"),
                    requestDataFactory: this.resourceTypeRequestDataFactory,
                    propertyDefinitions:
                        [
                            { name: "externalId", width: "0%", hidden: true },
                            { name: "name", width: "49%" },
                            { name: "tier", width: "1%" },
                            { name: "enhancement", width: "5%" },
                            { name: "actions", width: "1%" },
                            { name: "productResources", width: "0%", hidden: true }
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
                                { id: "name", name: "name", type: "text", placeholder: "Name", defaultValue: item.name},
                                { id: "tier", name: "tier", type: "range", placeholder: "Tier", defaultValue: item.tier, min: 1, max: 8, step: 1},
                                { id: "enhancement", name: "enhancement", type: "range", placeholder: "Enhancement", defaultValue: 0, min: 0, max: 3, step: 1},
                                { id: "externalId", name: "externalId", type: "hidden", placeholder: "externalId", defaultValue: item.externalId}
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
            < Row className="flex-nowrap" >
                <Col md={3} xl={2} className="col-auto px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <NavbarComponent
                            openArtifactCrud={this.onArtifactSelected}
                            openItemTypeCrud={this.onItemTypeSelected}
                            openJournalCrud={this.onJournalSelected}
                            openResourcesCrud={this.onResourceSelected} />
                    </div>
                </Col>
                <Col md={9} xl={10}>
                    <CrudComponent {... this.showComponent(component)} />
                </Col>
            </Row >
        </Container >
    }
}

export default AlbionDataApp;