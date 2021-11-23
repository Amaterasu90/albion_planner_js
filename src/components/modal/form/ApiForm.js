import React from "react";
import { Form, Row, Button, Col } from "react-bootstrap";

class ApiForm extends React.Component {
    submit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const body = Object.fromEntries(data.entries());
        var options = this.props.requestData.requestOptions;
        options.body = JSON.stringify(body);
        var response = fetch(this.props.requestData.url, options);
        response.then(this.submitSuccess, this.submitFailed);
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