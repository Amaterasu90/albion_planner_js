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
        else {
            this.addEntry([...this.props.sub_entries]);
        }
    }

    addEntry = (entry, defaultValue) => {
        let currentEntry = entry;
        let currentEntries = this.state.entries;
        currentEntry = currentEntry.map((input) => {
            let currrent = Object.assign({}, input);
            if (defaultValue) {
                const entity = input.id.split('_');
                const [listName, entityName, entityField] = entity;
                if (!entityField) {
                    const entityField = entityName;
                    const value = defaultValue[entityField];
                    currrent.defaultValue = value;
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

    render() {
        var inputs = this.state.entries.map((entry) => <Row className="pb-2">{entry.map((input) => {
            return this.props.getInputs(input, false, entry.length)
        })}</Row>);
        let button = inputs.length === 1 ? <Button variant="secondary" className="btn-lg btn-block" style={{ "width": "100%" }} disabled>Delete</Button> : <Button variant="danger" className="btn-lg btn-block" style={{ "width": "100%" }} onClick={() => this.removeEntry()}>Delete</Button>
        return <>
            <Row>
                <FormLabel>{this.props.placeholder}</FormLabel>
            </Row>
            <Row className="pb-2 d-flex justify-content-center">
                {inputs}
            </Row>
            <Row className="d-flex justify-content-center">
                <Col md={6}>
                    <Button variant="success" className="btn-lg btn-block" style={{ "width": "100%" }} onClick={() => this.addEntry([...this.props.sub_entries])} >Add</Button>
                </Col>
                <Col md={6}>
                    {button}
                </Col>
            </Row>
        </>;
    }
}

export default MultiInputFormGroup;