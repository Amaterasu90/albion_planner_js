import React from "react";
import { Form, Row } from "react-bootstrap";

class ApiFormDetails extends React.Component {
    render() {
        const fields = this.props.fieldFactory.create(this.props.fields)
        return <Form method={this.props.method}>
            <Row className="text-center pb-2" >
                {fields}
            </Row>
        </Form >
    }
}

export default ApiFormDetails