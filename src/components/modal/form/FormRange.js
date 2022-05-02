import React from "react";
import { FormLabel, Form, Row, Col } from "react-bootstrap";

class FormRange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: props.defaultValue,
        }
    }

    changeValue = (e) => {
        this.props.onChange(e.target.value);
        this.setState({ current: e.target.value });
    }

    render() {
        return <>
            <Row>
                <Col>
                    <FormLabel>{this.props.placeholder} {this.state.current}</FormLabel>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Range {...this.props} defaultValue={this.state.current} onChange={this.changeValue} />
                </Col>
            </Row>
        </>;
    }
}

export default FormRange;