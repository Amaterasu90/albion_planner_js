import React from "react";
import { Row, Col, Button, FormLabel } from "react-bootstrap";

class MultiInputFormGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: []
        };
    }

    componentDidMount() {
        const defaultValuesJson = this.props.defaultValue;
        let defaultValues;
        if (defaultValuesJson) {
            defaultValues = JSON.parse(defaultValuesJson);
            defaultValues.forEach((defaultValue) => this.addEntry([...this.props.sub_entries], defaultValue));
        }
        else if (!this.props.optional) {
            this.addEntry([...this.props.sub_entries]);
        }
    }

    addEntry = (entry, defaultValue) => {
        let currentEntry = entry;
        let currentEntries = this.state.entries;
        currentEntry = currentEntry.map((input, index) => {
            let currrent = Object.assign({}, input);
            if (defaultValue) {
                const entity = input.id.split('_');
                const [, entityName, entityField] = entity;
                if (!entityField) {
                    const entityField = entityName;
                    const value = defaultValue[entityField];
                    if (input.type === 'asyncRelatedDropdown') {
                        const arrayObject = [[entityField, defaultValue[entityField]], ["name", defaultValue["name"]]];
                        const obj = Object.fromEntries(arrayObject);
                        currrent.defaultValue = JSON.stringify(obj);
                    } else {
                        currrent.defaultValue = value;
                    }
                } else {
                    const value = defaultValue[entityName][entityField];
                    const label = defaultValue[entityName]["name"]
                    const arrayObject = [[entityField, value], ["name", label]];
                    const obj = Object.fromEntries(arrayObject);
                    currrent.defaultValue = JSON.stringify(obj);
                }

            }
            currrent.id = `${this.props.name}.list.${currrent.id}_${currentEntries.length}`
            currrent.name = `${this.props.name}.list.${currrent.name}_${currentEntries.length}`
            currrent.key = `${this.props.name}_${index}`
            return currrent;
        })
        currentEntries.push(currentEntry);
        this.setState({ entries: currentEntries });
    }

    removeEntry = () => {
        var entries = this.state.entries;
        entries.pop();
        this.setState({ entries: entries });
    }

    getButtons = (button) => {
        return this.props.disableButtons ? null :
            <Row key={"container_inputs_more"} className="d-flex justify-content-center">
                <Col md={6}>
                    <Button key={"button_more"} variant="success" className="btn-lg btn-block" style={{ "width": "100%" }} onClick={() => this.addEntry([...this.props.sub_entries])} >Add</Button>
                </Col>
                <Col key={"button_actions_container"} md={6}>
                    {button}
                </Col>
            </Row>;
    }

    getGroups = (inputs, button) => {
        return this.props.disableButtons && inputs.length < 1 ? <>
            <Row key={"container_inputs"} className="pb-2 d-flex justify-content-center">
                {inputs}
            </Row>
            {this.getButtons(button)}
        </> : <>
            <Row>
                <FormLabel key={"label_for_multiple"}>{this.props.placeholder}</FormLabel>
            </Row>
            <Row key={"container_inputs"} className="pb-2 d-flex justify-content-center">
                {inputs}
            </Row>
            {this.getButtons(button)}
        </>
    }

    render() {
        var inputs = this.state.entries.map((entry, index) => <Row key={`input_set_${index}`} className="pb-2">{entry.map((input, index_1) => {
            return this.props.getInputs(input, false, entry.length, index, index_1)
        })}</Row>);
        let button = inputs.length <= 1 ? <Button key={"button_secondary"} variant="secondary" className="btn-lg btn-block" style={{ "width": "100%" }} disabled>Delete</Button> : <Button key={"button_danger"} variant="danger" className="btn-lg btn-block" style={{ "width": "100%" }} onClick={() => this.removeEntry()}>Delete</Button>
        return this.getGroups(inputs, button);
    }
}

export default MultiInputFormGroup;