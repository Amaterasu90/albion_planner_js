import React from "react";
import { Col, ToggleButtonGroup, ToggleButton, Modal, Tooltip, OverlayTrigger } from "react-bootstrap";
import ApiForm from "./modal/form/ApiForm";
import FormFieldsGroupsFactory from "../factories/FormFieldsGroupsFactory";

class ApiActions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    handleClose = () => {
        this.setState({ show: false })
    }

    handleOpen = () => {
        this.setState({ show: true })
    }

    delete = (e) => {
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

    render() {
        let group;
        if (this.props.related.properties.some((item) => item !== null)) {
            group = (<OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={(props) => (<Tooltip id="button-tooltip" {...props}>{this.props.tooltipText}</Tooltip>)}>
                <ToggleButtonGroup type="checkbox" className="mb-2">
                    <ToggleButton id="tbg-check-1" className="btn-success" onClick={this.handleOpen}>
                        {this.props.editBtnText}
                    </ToggleButton>
                    <ToggleButton id="tbg-check-2" className="btn-secondary" disabled>
                        {this.props.deleteBtnText}
                    </ToggleButton>
                </ToggleButtonGroup>
            </OverlayTrigger>);
        } else {
            group = (
                <ToggleButtonGroup type="checkbox" className="mb-2">
                    <ToggleButton id="tbg-check-1" className="btn-success" onClick={this.handleOpen}>
                        {this.props.editBtnText}
                    </ToggleButton>
                    <ToggleButton id="tbg-check-2" className="btn-danger" onClick={this.delete}>
                        {this.props.deleteBtnText}
                    </ToggleButton>
                </ToggleButtonGroup>);
        }
        return <Col>
            {group}
            <Modal show={this.state.show} onHide={this.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.headerTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ApiForm
                        requestData={this.props.requestData}
                        handleClose={this.handleClose}
                        submit={this.props.submit}
                        fieldFactory={new FormFieldsGroupsFactory()}
                        fields={this.props.formFields.fields}
                        page={this.props.page}
                        sizePerPage={this.props.sizePerPage} />
                </Modal.Body>
            </Modal>
        </Col >
    }
}

export default ApiActions;