import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { Col, Button } from 'react-bootstrap';
import ApiForm from './form/ApiForm';
import FormFieldsGroupsFactory from '../../factories/FormFieldsGroupsFactory';

class ApiModalForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    }

    handleClose = () => {
        this.setState({ show: false })
    }

    handleOpen = () => {
        this.setState({ show: true })
    }

    submitSuccess = (e) => {
        this.props.submit();
        this.props.handleClose();
    }

    submitFailed = (e) => {
    }

    render() {
        return <Col>
            <Button variant="success" onClick={this.handleOpen}>
                {this.props.btnText}
            </Button>
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
                        fields={this.props.fields} />
                </Modal.Body>
            </Modal>
        </Col >
    }
}

export default ApiModalForm;