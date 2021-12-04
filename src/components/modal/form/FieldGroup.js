import React from "react";
import { FormGroup, FormControl } from "react-bootstrap";
import FormRange from "./FormRange";
import RelatedAsyncSelect from "./RelatedAsyncSelect";
import { Row, Col } from "react-bootstrap";
import MultiInputFormGroup from "./MultiInputFormGroup";

class FieldGroup extends React.Component {
    constructor(props) {
        super(props);
        
        this.columnFullSize = 12;
    }    

    getInputs = (props, addRow, countEmelentsInLine) => {
        let input;
        let size = this.columnFullSize / countEmelentsInLine;
        if (props.type === "range") {
            input = (<FormRange {...props} />)
        } else if (props.type === "asyncRelatedDropdown") {
            input = (<RelatedAsyncSelect size={size} {...props} />)
        } else if (props.type === "relatedMany") {
            input = (<MultiInputFormGroup getInputs={this.getInputs} {...props} />)
        } else {
            input = (<Col md={size}><FormControl {...props} /></Col>)
        }

        return addRow === true ? <Row className="pb-2 d-flex justify-content-center" > {input} </Row > : input;
    }

    render() {
        return <FormGroup>
            {this.getInputs(this.props, true, 1)}
        </FormGroup>
    }
}

export default FieldGroup;