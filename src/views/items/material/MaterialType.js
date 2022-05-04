import React from "react";
import FormRange from "../../../components/modal/form/FormRange";
import CrudRequestDataFactory from "../../../factories/CrudRequestDataFactory";
import RequestDataFactory from "../../../factories/RequestDataFactory";
import RelatedAsyncSelect from "../../../components/modal/form/RelatedAsyncSelect";
import ModalFrom from "../../../components/modal/form/ModalForm";
import { Row, Col, Button, FormControl, Form, Modal, FormLabel } from "react-bootstrap";
import TableEditDeleteComponent from "../../../components/TableEditDeleteComponent";
import TableColumnFactory from "../../../factories/TableColumnFactory";
import TableOptionsFactory from "../../../factories/TableOptionsFactory";
import AsyncTableDataProvider from "../../../AsyncTableDataProvider";
import ApiEditDeleteActionsColumnFactory from "../../../factories/ApiEditDeleteActionsColumnFactory";
import ActionEditDeleteGroup from "../../../components/ActionEditDeleteGroup";

class MaterialType extends React.Component {
    constructor(props) {
        super(props);

        this.defaultModelCreate = {
            name: ""
        }

        this.defaultModelEdit = {
            name: ""
        }

        this.state = {
            show: false,
            page: 1,
            sizePerPage: 5,
            modelCreate: JSON.parse(JSON.stringify(this.defaultModelCreate)),
            modelEdit: JSON.parse(JSON.stringify(this.defaultModelEdit))
        }

        this.materialTypeDataFactory = new CrudRequestDataFactory("material/type", new RequestDataFactory());

        this.createModalForm = React.createRef();
        this.table = React.createRef();

        this.propertyDefinitions = [
            { id: "externalId", name: "External Id", headerStyle: {width: "0%"}, hidden: true },
            { id: "name", name: "Name", headerStyle: {width: "49%" }},
            { id: "actions", name: "Actions", headerStyle: {width: "1%" }},
            { id: "containsRelatedElements", name: "ContainsRelatedElements", headerStyle: {width: "0%"}, hidden: true }
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
        var requestData = this.materialTypeDataFactory.createPost();
        const options = requestData.requestOptions;
        options.body = JSON.stringify(this.state.modelCreate);
        const response = fetch(requestData.url, options);
        response.then(this.createSubmitSuccess, this.createSubmitFailed);
    }

    editSubmit = (e) => {
        e.preventDefault();
        var model = this.state.modelEdit;
        var requestData = this.materialTypeDataFactory.createPut(model.externalId);
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
        var requestData = this.materialTypeDataFactory.createGetDetails(externalId);
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
        var requestData = this.materialTypeDataFactory.createDelete(externalId);
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
                    <Col md={11}>
                        <FormControl
                            id="name"
                            type="text"
                            placeholder="Name"
                            defaultValue={modelEdit.name}
                            onChange={(e) => { modelEdit.name = e.target.value; this.setState({ modelEdit: modelEdit }); }} />
                    </Col>
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
                <Modal.Title>Edit material type</Modal.Title>
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
                <ModalFrom btnText="Add material type" headerTitle="Add new material type" ref={this.createModalForm} content={
                    <Form method={this.props.method} onSubmit={this.createSubmit}>
                        <Row className="text-center pb-2" >
                            <Row className="pb-2 d-flex justify-content-center" >
                                <Col md={11}>
                                    <FormControl
                                        id="name"
                                        type="text"
                                        placeholder="Name"
                                        onChange={(e) => { modelCreate.name = e.target.value; this.setState({ modelCreate: modelCreate }); }} />
                                </Col>
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
                requestDataFactory={this.materialTypeDataFactory}
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
                        headerTitle="Edit material types" />
                } />
            {this.getEditModal(modelEdit)}
        </Col>
    }
}

export default MaterialType;