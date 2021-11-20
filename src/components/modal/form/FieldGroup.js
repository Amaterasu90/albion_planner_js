import React from "react";
import { Row, Col } from "react-bootstrap";
import { FormLabel } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { FormGroup, FormControl } from "react-bootstrap";

class FieldGroup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current: props.defaultValue
        }
    }


    changeValue = (e) => {
        this.setState({ current: e.target.value });
    }

    render() {
        let input;
        if (this.props.type === "range") {
            input = (<div><Row className="pb-2">
                <Col md={1} />
                <Col md={10}>
                    <FormLabel>{this.props.placeholder} {this.state.current}</FormLabel>
                </Col>
                <Col md={1} />
            </Row>
                <Row>
                    <Col md={1} />
                    <Col md={10}>
                        <Form.Range {...this.props} defaultValue={this.state.current} onChange={this.changeValue} />
                    </Col>
                    <Col md={1} />
                </Row>
            </div >)
        } else {
            input = (<Row className="pb-2">
                <Col md={1} />
                <Col md={10}>
                    <FormControl {...this.props} />
                </Col>
                <Col md={1} />
            </Row>)
        }
        return <FormGroup>
            {input}
        </FormGroup>
    }
}

export default FieldGroup;