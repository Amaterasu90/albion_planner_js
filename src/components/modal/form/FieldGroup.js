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

    getInputs = (props, addRow, countEmelentsInLine, index, index_1) => {
        let input;
        let size = this.columnFullSize / countEmelentsInLine;
        if (props.type === "range") {
            input = (<FormRange key={`${props.id}_${index}_${index_1}`} {...props} />)
        } else if (props.type === "asyncRelatedDropdown") {
            input = (<RelatedAsyncSelect key={`${props.id}_${index}_${index_1}`} size={size} {...props} />)
        } else if (props.type === "relatedMany") {
            input = (<MultiInputFormGroup key={`${props.id}_${index}_${index_1}`} getInputs={this.getInputs} {...props} />)
        } else {
            input = (<Col md={size}><FormControl key={`${props.id}_${index}_${index_1}`} {...props} /></Col>)
        }

        return addRow === true ? <Row className="pb-2 d-flex justify-content-center" > {input} </Row > : input;
    }

    render() {
        return <FormGroup>
            {this.getInputs(this.props, true, 1, 0, 0)}
        </FormGroup>
    }
}

export default FieldGroup;