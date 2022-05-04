import React from "react";
import FormRange from "../../../components/modal/form/FormRange";
import CrudRequestDataFactory from "../../../factories/CrudRequestDataFactory";
import RequestDataFactory from "../../../factories/RequestDataFactory";
import RelatedAsyncSelect from "../../../components/modal/form/RelatedAsyncSelect";
import ModalFrom from "../../../components/modal/form/ModalForm";
import { Row, Col, Button, FormControl, Form, Modal, FormLabel, Container } from "react-bootstrap";
import TableEditDeleteComponent from "../../../components/TableEditDeleteComponent";
import TableColumnFactory from "../../../factories/TableColumnFactory";
import TableOptionsFactory from "../../../factories/TableOptionsFactory";
import AsyncTableDataProvider from "../../../AsyncTableDataProvider";
import ApiEditDeleteActionsColumnFactory from "../../../factories/ApiEditDeleteActionsColumnFactory";
import ActionEditDeleteGroup from "../../../components/ActionEditDeleteGroup";

class Recipe extends React.Component {
    constructor(props) {
        super(props);

        this.defaultModelCreate = {
            enhancement: 0,
            tier: 4,
            materialId: "",
            materialStacks: [{ count: 0, materialId: "" }],
            resourceStacks: [{ count: 0, resourceId: "" }]
        }

        this.defaultModelEdit = {
            externalId: "",
            enhancement: 0,
            tier: 0,
            materialId: "",
            materialStacks: [{ count: 0, externalId: "", materialId: "" }],
            resourceStacks: [{ count: 0, externalId: "", resourceId: "" }]
        }

        this.state = {
            show: false,
            page: 1,
            sizePerPage: 5,
            modelCreate: JSON.parse(JSON.stringify(this.defaultModelCreate)),
            modelEdit: JSON.parse(JSON.stringify(this.defaultModelEdit)),
        }


        this.materialDataFactory = new CrudRequestDataFactory("material", new RequestDataFactory());
        this.resourceDataFactory = new CrudRequestDataFactory("resource", new RequestDataFactory());
        this.refineDataFactory = new CrudRequestDataFactory("refine", new RequestDataFactory());
        this.createModalForm = React.createRef();
        this.table = React.createRef();
        this.propertyDefinitions = [
            { id: "externalId", name: "External Id", headerStyle: { width: "5%" }, hidden: true },
            { id: "name", name: "Name", headerStyle: { width: "15%" } },
            { id: "material", name: "Material", headerStyle: { width: "0%" }, hidden: true },
            { id: "enhancement", name: "Enhancement", headerStyle: { width: "1%" } },
            { id: "tier", name: "Tier", headerStyle: { width: "1%" } },
            {
                id: "requirements", name: "Requiremnets", headerStyle: { width: "5%" }, combineDescriptor: (item) => {
                    return <Container fluid>
                        <Row className="pb-2 d-flex align-self-center" >
                            <Col className="pb-2 d-flex align-self-center">
                                {item.materialStacks.map((item) => {
                                    return <Row className="pb-2 d-flex align-self-center">
                                        <Col>
                                            <Row>
                                                Material: {item.material.name}
                                            </Row>
                                            <Row>
                                                Count: {item.count}
                                            </Row>
                                        </Col>
                                    </Row>
                                })
                                }
                            </Col>
                            <Col>
                                {item.resourceStacks.map((item) => {
                                    return <Row className="pb-2 d-flex align-self-center">
                                        <Col>
                                            <Row>
                                                Resource: {item.resource.name}
                                            </Row>
                                            <Row>
                                                Count: {item.count}
                                            </Row>
                                        </Col>
                                    </Row>
                                })
                                }
                            </Col>
                        </Row>
                    </Container>;
                }
            },
            { id: "actions", name: "Actions", headerStyle: { width: "1%" } },
            { id: "containsRelatedElements", headerStyle: { width: "0%" }, name: "ContainsRelatedElements", hidden: true }
        ];
        this.columnsFactory = new TableColumnFactory();
        this.optionsFactory = new TableOptionsFactory();
        this.provider = new AsyncTableDataProvider();
        this.actionFactory = new ApiEditDeleteActionsColumnFactory();
    }

    handleClose = () => {
        this.setState({ show: false })
    }

    createSubmit = (e) => {
        e.preventDefault();
        var requestData = this.refineDataFactory.createPost();
        const options = requestData.requestOptions;
        options.body = JSON.stringify(this.state.modelCreate);
        const response = fetch(requestData.url, options);
        response.then(this.createSubmitSuccess, this.createSubmitFailed);
    }

    editSubmit = (e) => {
        e.preventDefault();
        var model = this.state.modelEdit;
        var requestData = this.refineDataFactory.createPut(model.externalId);
        const options = requestData.requestOptions;
        options.body = JSON.stringify(model);
        const response = fetch(requestData.url, options);
        response.then(this.editSubmitSuccess, this.editSubmitFailed);
    }

    editSubmitSuccess = (e) => {
        this.setState({ modelEdit: this.defaultModelEdit });
        this.createModalForm.current.handleClose();
        this.table.current.handleOnTableChange(null, { page: this.table.current.state.page, sizePerPage: this.table.current.state.sizePerPage });
    }

    editSubmitFailed = (e) => {

    }

    createSubmitSuccess = (e) => {
        this.setState({ modelCreate: this.defaultModelCreate });
        this.createModalForm.current.handleClose();
        this.table.current.handleOnTableChange(null, { page: this.table.current.state.page, sizePerPage: this.table.current.state.sizePerPage });
    }

    createSubmitFailed = (e) => {
    }

    editSubmitSuccess = (e) => {
        this.setState({ modelCreate: this.defaultModelEdit });
        this.setState({ show: false })
        this.table.current.handleOnTableChange(null, { page: this.table.current.state.page, sizePerPage: this.table.current.state.sizePerPage });
    }

    editSubmitFailed = (e) => {

    }

    openEditForm = (externalId) => {
        var requestData = this.refineDataFactory.createGetDetails(externalId);
        fetch(requestData.url, requestData.requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    const { containsRelatedElements, ...data } = result;
                    this.setState({ modelEdit: data });
                    this.setState({ show: true })
                },
                (error) => {
                }
            )
    }


    handleDelete = (externalId) => {
        var requestData = this.refineDataFactory.createDelete(externalId);
        const options = requestData.requestOptions;
        const response = fetch(requestData.url, options);
        response.then(this.deleteSubmitSuccess, this.deleteSubmitFailed);
    }

    deleteSubmitSuccess = () => {
        this.table.current.handleOnTableChange(null, { page: this.table.current.state.page, sizePerPage: this.table.current.state.sizePerPage });
    }

    deleteSubmitFailed = () => {

    }

    getEditForm = (modelEdit) => {
        return <Form method={this.props.method} onSubmit={this.editSubmit}>
            <Row className="text-center pb-2" >
                <Row className="pb-2 d-flex justify-content-center" >
                    <FormRange
                        id="enhancement"
                        type="range"
                        placeholder="Enhancement"
                        defaultValue={modelEdit.enhancement}
                        min={0} max={3} step={1} onChange={(value) => { modelEdit.enhancement = value; this.setState({ modelEdit: modelEdit }); }} />
                </Row>
                <Row className="pb-2 d-flex justify-content-center" >
                    <FormRange
                        id="tier"
                        type="range"
                        placeholder="Tier"
                        defaultValue={modelEdit.tier} min={0} max={8} step={1} onChange={(value) => { modelEdit.tier = value; this.setState({ modelEdit: modelEdit }); }} />
                </Row>
                <Row className="pb-2 d-flex justify-content-center" >
                    <FormLabel>Material</FormLabel>
                    <RelatedAsyncSelect
                        id="materialId"
                        placeholder="Material"
                        defaultValue={modelEdit.material}
                        dataFactory={this.materialDataFactory}
                        size={11} onChangeCustom={(value) => { modelEdit.materialId = value; this.setState({ modelEdit: modelEdit }); }} />
                </Row>
                <Row className="pb-2 d-flex justify-content-center">
                    <FormLabel>Material Stacks</FormLabel>
                    <>
                        {
                            modelEdit.materialStacks.map((materialStack, index) =>
                                <Row className="pb-2">
                                    <Col md={6}>
                                        <RelatedAsyncSelect
                                            id={`MaterialStacks_${index}`}
                                            key={`MaterialStacks_${index}`}
                                            defaultValue={materialStack.material}
                                            placeholder="Material"
                                            dataFactory={this.materialDataFactory} size={12} onChangeCustom={(value) => { modelEdit.materialStacks[index].material.externalId = value; this.setState({ modelEdit: modelEdit }); }} />
                                    </Col>
                                    <Col md={6}>
                                        <FormControl
                                            id={`MaterialStacks_count_${index}`}
                                            key={`MaterialStacks_count${index}`}
                                            defaultValue={materialStack.count}
                                            type="text"
                                            placeholder="Count"
                                            onChange={(event) => { modelEdit.materialStacks[index].count = event.target.value; this.setState({ modelEdit: modelEdit }); }} />
                                    </Col>
                                </Row>
                            )
                        }

                        <Row key={`container_inputs_more_recipe_stack`} className="d-flex justify-content-center">
                            <Col md={6}>
                                <Button
                                    key={`button_more_recipe_stack`}
                                    variant="success"
                                    className="btn-lg btn-block"
                                    style={{ "width": "100%" }} onClick={() => { modelEdit.materialStacks.push({ count: null, material: { externalId: null } }); this.setState({ modelEdit: modelEdit }); }} >Add</Button>
                            </Col>
                            <Col key={"button_actions_container_recipe_stack"} md={6}>
                                {modelEdit.materialStacks.length <= 1 ?
                                    <Button
                                        key={`button_secondary_recipe_stack`}
                                        variant="secondary" className="btn-lg btn-block"
                                        style={{ "width": "100%" }} disabled>Delete</Button> :
                                    <Button
                                        key={`button_danger`}
                                        variant="danger"
                                        className="btn-lg btn-block"
                                        style={{ "width": "100%" }}
                                        onClick={() => { modelEdit.materialStacks.pop(); this.setState({ modelEdit: modelEdit }); }}>Delete</Button>}
                            </Col>
                        </Row>
                    </>
                </Row>
                <Row className="pb-2 d-flex justify-content-center">
                    <FormLabel>Resource Stacks</FormLabel>
                    <>
                        {
                            modelEdit.resourceStacks.map((resourceStack, index) =>
                                <Row className="pb-2">
                                    <Col md={6}>
                                        <RelatedAsyncSelect
                                            id={`ResourceStacks_${index}`}
                                            key={`ResourceStacks_${index}`}
                                            placeholder="Resource"
                                            defaultValue={resourceStack.resource}
                                            dataFactory={this.resourceDataFactory}
                                            size={12} onChangeCustom={(value) => { modelEdit.resourceStacks[index].resource.externalId = value; this.setState({ modelEdit: modelEdit }); }} />
                                    </Col>
                                    <Col md={6}>
                                        <FormControl
                                            id={`ResourceStacks_count_${index}`}
                                            key={`ResourceStacks_count${index}`}
                                            defaultValue={resourceStack.count}
                                            type="text" placeholder="Count"
                                            onChange={(event) => { modelEdit.resourceStacks[index].count = event.target.value; this.setState({ modelEdit: modelEdit }); }} />
                                    </Col>
                                </Row>
                            )
                        }

                        <Row key={`container_inputs_more`} className="d-flex justify-content-center">
                            <Col md={6}>
                                <Button
                                    key={`button_more`}
                                    variant="success"
                                    className="btn-lg btn-block"
                                    style={{ "width": "100%" }}
                                    onClick={() => { modelEdit.resourceStacks.push({ count: null, resource: { externalId: null } }); this.setState({ modelEdit: modelEdit }); }} >Add</Button>
                            </Col>
                            <Col key={"button_actions_container"} md={6}>
                                {modelEdit.resourceStacks.length <= 1 ?
                                    <Button key={`button_secondary`}
                                        variant="secondary"
                                        className="btn-lg btn-block"
                                        style={{ "width": "100%" }}
                                        disabled>Delete</Button> :
                                    <Button
                                        key={`button_danger`}
                                        variant="danger"
                                        className="btn-lg btn-block"
                                        style={{ "width": "100%" }}
                                        onClick={() => { modelEdit.resourceStacks.pop(); this.setState({ modelEdit: modelEdit }); }}>Delete</Button>}
                            </Col>
                        </Row>
                    </>
                </Row>
            </Row>
            <Row className="pb-2">
                <Col md={{ span: 1, offset: 5 }}>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Col>
            </Row>
        </ Form >
    }

    getEditModal = (modelEdit) => {
        return <Modal show={this.state.show} onHide={this.handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.getEditForm(modelEdit)}
            </Modal.Body>
        </Modal>;
    }

    render() {
        const { modelCreate, modelEdit } = this.state;

        return <Col className="align-self-center">
            <Row className="pb-2">
                <ModalFrom btnText="Add recipe" headerTitle="Add new recipe" ref={this.createModalForm} content={
                    <Form method={this.props.method} onSubmit={this.createSubmit}>
                        <Row className="text-center pb-2" >
                            <Row className="pb-2 d-flex justify-content-center" >
                                <FormRange id="enhancement" type="range" placeholder="Enhancement" defaultValue={modelCreate.enhancement} min={0} max={3} step={1} onChange={(value) => { modelCreate.enhancement = value; this.setState({ modelCreate: modelCreate }); }} />
                            </Row>
                            <Row className="pb-2 d-flex justify-content-center" >
                                <FormRange id="tier" type="range" placeholder="Tier" defaultValue={modelCreate.tier} min={0} max={8} step={1} onChange={(value) => { modelCreate.tier = value; this.setState({ modelCreate: modelCreate }); }} />
                            </Row>
                            <Row className="pb-2 d-flex justify-content-center" >
                                <RelatedAsyncSelect id="materialId" placeholder="Material" dataFactory={this.materialDataFactory} size={11} onChangeCustom={(value) => { modelCreate.materialId = value; this.setState({ modelCreate: modelCreate }); }} />
                            </Row>
                            <Row className="pb-2 d-flex justify-content-center">
                                <>
                                    {
                                        modelCreate.materialStacks.map((materialStack, index) =>
                                            <Row className="pb-2">
                                                <Col md={6}>
                                                    <RelatedAsyncSelect id={`MaterialStacks_${index}`} key={`MaterialStacks_${index}`} placeholder="Material" dataFactory={this.materialDataFactory} size={12} onChangeCustom={(value) => { materialStack.materialId = value; this.setState({ modelCreate: modelCreate }); }} />
                                                </Col>
                                                <Col md={6}>
                                                    <FormControl id={`MaterialStacks_count_${index}`} key={`MaterialStacks_count${index}`} type="text" placeholder="Count" onChange={(event) => { materialStack.count = event.target.value; this.setState({ modelCreate: modelCreate }); }} />
                                                </Col>
                                            </Row>
                                        )
                                    }

                                    <Row key={`container_inputs_more_recipe_stack`} className="d-flex justify-content-center">
                                        <Col md={6}>
                                            <Button key={`button_more_recipe_stack`} variant="success" className="btn-lg btn-block" style={{ "width": "100%" }} onClick={() => { modelCreate.materialStacks.push({ count: 0, materialId: "" }); this.setState({ modelCreate: modelCreate }); }} >Add</Button>
                                        </Col>
                                        <Col key={"button_actions_container_recipe_stack"} md={6}>
                                            {modelCreate.materialStacks.length <= 1 ? <Button key={`button_secondary_recipe_stack`} variant="secondary" className="btn-lg btn-block" style={{ "width": "100%" }} disabled>Delete</Button> : <Button key={`button_danger`} variant="danger" className="btn-lg btn-block" style={{ "width": "100%" }} onClick={() => { modelCreate.materialStacks.pop(); this.setState({ modelCreate: modelCreate }); }}>Delete</Button>}
                                        </Col>
                                    </Row>
                                </>
                            </Row>
                            <Row className="pb-2 d-flex justify-content-center">
                                <>
                                    {
                                        modelCreate.resourceStacks.map((resourceStack, index) =>
                                            <Row className="pb-2">
                                                <Col md={6}>
                                                    <RelatedAsyncSelect id={`ResourceStacks_${index}`} key={`ResourceStacks_${index}`} placeholder="Resource" dataFactory={this.resourceDataFactory} size={12} onChangeCustom={(value) => { resourceStack.resourceId = value; this.setState({ modelCreate: modelCreate }); }} />
                                                </Col>
                                                <Col md={6}>
                                                    <FormControl id={`ResourceStacks_count_${index}`} key={`ResourceStacks_count${index}`} type="text" placeholder="Count" onChange={(event) => { resourceStack.count = event.target.value; this.setState({ modelCreate: modelCreate }); this.setState({ modelCreate: modelCreate }); }} />
                                                </Col>
                                            </Row>
                                        )
                                    }

                                    <Row key={`container_inputs_more`} className="d-flex justify-content-center">
                                        <Col md={6}>
                                            <Button key={`button_more`} variant="success" className="btn-lg btn-block" style={{ "width": "100%" }} onClick={() => { modelCreate.resourceStacks.push({ count: 0, resourceId: "" }); this.setState({ modelCreate: modelCreate }); }} >Add</Button>
                                        </Col>
                                        <Col key={"button_actions_container"} md={6}>
                                            {modelCreate.resourceStacks.length <= 1 ? <Button key={`button_secondary`} variant="secondary" className="btn-lg btn-block" style={{ "width": "100%" }} disabled>Delete</Button> : <Button key={`button_danger`} variant="danger" className="btn-lg btn-block" style={{ "width": "100%" }} onClick={() => { modelCreate.resourceStacks.pop(); this.setState({ modelCreate: modelCreate }); }}>Delete</Button>}
                                        </Col>
                                    </Row>
                                </>
                            </Row>
                        </Row>
                        <Row className="pb-2">
                            <Col md={{ span: 1, offset: 5 }}>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </ Form >} />
            </Row>
            <TableEditDeleteComponent
                ref={this.table}
                optionsFactory={this.optionsFactory}
                requestDataFactory={this.refineDataFactory}
                columnsFactory={this.columnsFactory}
                propertyDefinitions={this.propertyDefinitions}
                provider={this.provider}
                actionFactory={this.actionFactory}
                actionsContent={
                    (item) => <ActionEditDeleteGroup
                        tooltipText="Some entities are related with this item type"
                        editBtnText="Edit"
                        deleteBtnText="Delete"
                        handleEdit={this.openEditForm}
                        externalId={item.externalId}
                        handleDelete={this.handleDelete}
                        actual={item.containsRelatedElements}
                        headerTitle="Edit recipes" />
                } />
            {this.getEditModal(modelEdit)}
        </Col>
    }
}

export default Recipe;