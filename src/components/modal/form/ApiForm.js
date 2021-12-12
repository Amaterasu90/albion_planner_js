import React from "react";
import { Form, Row, Button, Col } from "react-bootstrap";
import SubmitFormProcessor from "../../../services/SubmitFormProcessor";

class ApiForm extends React.Component {
    submit = (e) => {
        e.preventDefault();        
        const processor = new SubmitFormProcessor(".list.", "_", '.', this.props, this.submitSuccess, this.submitFailed);
        processor.process(e);
    }

    submitSuccess = (e) => {
        this.props.submit(null, { page: this.props.page, sizePerPage: this.props.sizePerPage });
        this.props.handleClose();
    }

    submitFailed = (e) => {
    }

    render() {
        const fields = this.props.fieldFactory.create(this.props.fields)
        return <Form method={this.props.method} onSubmit={this.submit}>
            <Row className="text-center pb-2" >
                {fields}
            </Row>
            <Row className="pb-2">
                <Col md={{ span: 1, offset: 5 }}>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Col>
            </Row>
        </Form >
    }
}

export default ApiForm