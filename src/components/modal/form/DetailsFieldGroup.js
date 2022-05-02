import React from "react";
import { FormGroup, FormControl, FormLabel, FormSelect } from "react-bootstrap";
import FormRange from "./FormRange";
import RelatedAsyncSelect from "./RelatedAsyncSelect";
import { Row, Col } from "react-bootstrap";
import MultiInputFormGroup from "./MultiInputFormGroup";
import { Accordion } from "react-bootstrap";

class DetailsFieldGroup extends React.Component {
    constructor(props) {
        super(props);
        this.columnFullSize = 12;
        this.state = { value: props.defaultValue };
    }

    change = (event) => {
        this.setState({ value: event.target.value })
    }

    getInputs = (props, addRow, countEmelentsInLine, index, index_1) => {
        let input;
        let size = this.columnFullSize / countEmelentsInLine;

        if (props.type === "range") {
            input = (<FormRange key={`${props.id}_${index}_${index_1}`} {...props} />)
        } else if (props.type === "dropdown") {
            input = (<Col md={size}>
                <FormLabel>{this.props.placeholder}</FormLabel>
                <FormSelect name={props.name} as="select" id={props.id} key={`${props.id}_dropdown`} value={this.state.value} onChange={this.change}>
                    {props.options.map((x) => {
                        return (<option key={`${x.text}_${x.value}`} value={`${x.value}`}>{x.text}</option>);
                    })}
                </FormSelect>
            </Col>)
        } else if (props.type === "asyncRelatedDropdown") {
            input = (<RelatedAsyncSelect key={`${props.id}_${index}_${index_1}_related`} size={size} {...props} />)
        } else if (props.type === "asyncRelatedDropdownLabeled") {
            input = (<Col md={size}>
                <FormLabel>{this.props.placeholder}</FormLabel>
                <RelatedAsyncSelect key={`${props.id}_${index}_${index_1}_related`} size={size} {...props} />
            </Col>)
        } else if (props.type === "relatedMany") {
            input = (<MultiInputFormGroup key={`${props.id}_${index}_${index_1}_group`} getInputs={this.getInputs} {...props} disableButtons={true} />)
        } else {
            input = (<Col md={size}><FormControl key={`${props.id}_${index}_${index_1}_form`} {...props} /></Col>)
        }

        return addRow === true ? <Row className="pb-2 d-flex justify-content-center" > {input} </Row > : input;
    }

    render() {

        if (this.props.optional) {
            return <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey={this.props.placeholder}>
                    <Accordion.Header>{`${this.props.placeholder} (optional)`}</Accordion.Header>
                    <Accordion.Body className="px-0">
                        <FormGroup>
                            {this.getInputs(this.props, true, 1, 0, 0)}
                        </FormGroup>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        } else {
            return <FormGroup>
                {this.getInputs(this.props, true, 1, 0, 0)}
            </FormGroup>
        }
    }
}

export default DetailsFieldGroup;