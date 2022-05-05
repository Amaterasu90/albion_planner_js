import React from "react";
import { Col, ToggleButtonGroup, ToggleButton, Modal, Tooltip, OverlayTrigger } from "react-bootstrap";
import ApiForm from "./modal/form/ApiForm";
import ApiFormDetails from "./modal/form/ApiFormDetails";
import FormFieldsGroupsFactory from "../factories/FormFieldsGroupsFactory";
import DetailsFieldsGroupsFactory from "../factories/DetailsFieldsGroupsFactory";

class ApiDetailsEditDeleteActions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            component: "edit",
            header: this.props.editHeaderTitle
        }
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleOpenUpdate = () => {
        this.setState({
            show: true,
            component: "edit",
            header: this.props.editHeaderTitle
        });
    }

    handleOpenDetails = (e) => {
        e.preventDefault();
        this.setState({
            show: true,
            component: "details",
        });
    }

    handleDelete = (e) => {
        e.preventDefault();
        var options = this.props.deleteRequestData.requestOptions;
        var response = fetch(this.props.deleteRequestData.url, options);
        response.then(this.submitSuccess, this.submitFailed);
    }

    submitSuccess = (e) => {
        this.props.submit(null, { page: this.props.page, sizePerPage: this.props.sizePerPage });
    }

    submitFailed = (e) => {
    }

    getComponent = (component) => {
        switch (component) {
            case "edit":
                return (<ApiForm
                    key={this.props.item.externalId}
                    requestData={this.props.updateRequestData}
                    handleClose={this.handleClose}
                    submit={this.props.submit}
                    fieldFactory={new FormFieldsGroupsFactory()}
                    fields={this.props.editFormFields.fields}
                    page={this.props.page}
                    sizePerPage={this.props.sizePerPage} />)
            case "details":
                return (<ApiFormDetails
                    key={this.props.item.externalId}
                    requestData={this.props.detailsRequestData}
                    fieldFactory={new DetailsFieldsGroupsFactory()}
                    fields={this.props.detailsFormFields.fields}
                    page={this.props.page}
                    sizePerPage={this.props.sizePerPage} />);
            default:
                return null;
        }
    }

    render() {
        const { component, header } = this.state;
        let group;
        if (this.props.related.containsRelatedElements) {
            group = (<OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={(props) => (<Tooltip key={"button-tooltip"} id="button-tooltip" {...props}>{this.props.tooltipText}</Tooltip>)}>
                <ToggleButtonGroup key={"checkbox"} type="checkbox" className="mb-2">
                    <ToggleButton key={"tbg-check-1"} id="tbg-check-1" className="btn-success" onClick={this.handleOpenUpdate}>
                        {this.props.editBtnText}
                    </ToggleButton>
                    <ToggleButton key={"tbg-check-2"} id="tbg-check-2" className="btn btn-info" onClick={this.handleOpenDetails}>
                        {this.props.detailsBtnText}
                    </ToggleButton>
                    <ToggleButton key={"tbg-check-3"} id="tbg-check-3" className="btn-secondary" disabled>
                        {this.props.deleteBtnText}
                    </ToggleButton>
                </ToggleButtonGroup>
            </OverlayTrigger>);
        } else {
            group = (
                <ToggleButtonGroup key={"checkbox"} type="checkbox" className="mb-2">
                    <ToggleButton key={"tbg-check-1"} id="tbg-check-1" className="btn-success" onClick={this.handleOpenUpdate}>
                        {this.props.editBtnText}
                    </ToggleButton>
                    <ToggleButton key={"tbg-check-2"} id="tbg-check-2" className="btn btn-info" onClick={this.handleOpenDetails}>
                        {this.props.detailsBtnText}
                    </ToggleButton>
                    <ToggleButton key={"tbg-check-3"} id="tbg-check-3" className="btn-danger" onClick={this.handleDelete}>
                        {this.props.deleteBtnText}
                    </ToggleButton>
                </ToggleButtonGroup>);
        }
        return <Col>
            {group}
            <Modal key={"modal_window"} show={this.state.show} onHide={this.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.getComponent(component)}
                </Modal.Body>
            </Modal>
        </Col >
    }
}

export default ApiDetailsEditDeleteActions;