import React from "react";
import { Col } from "react-bootstrap";
import AsyncSelect from 'react-select/async';

class RelatedAsyncSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: '',
            selectedOption: null
        }
    }

    handleInputChange = (newValue) => {
        const inputValue = newValue;
        this.setState({ inputValue });
        return inputValue;
    };

    mapOptionsToValues = (entities) => {
        return entities.map((entity, index) => this.mapOptionToValue(entity, index));
    };

    mapOptionToValue = (entity, index) => ({
        value: entity.externalId,
        label: entity.name,
        key: index
    });

    getOptions = (inputValue, callback) => {
        var requestData = this.props.dataFactory.createGet();
        fetch(requestData.url, requestData.requestOptions)
            .then(response => {
                response.json()
                    .then(data => {
                        if (inputValue.length >= 3) {
                            data = data.filter(entity => entity.name.match(inputValue));
                        }
                        callback(this.mapOptionsToValues(data));
                    });
            });
    }

    handleChange = (option) => {
        if (this.props.onChangeCustom) {
            this.props.onChangeCustom(option.value);
        }
        this.setState({ selectedOption: option });
    }

    render() {
        let input;
        if (this.props.defaultValue) {
            const { name, externalId } = this.props.defaultValue;
            input = (<AsyncSelect
                cacheOptions
                loadOptions={this.getOptions}
                defaultOptions
                value={this.state.selectedOption == null && name && externalId ? { label: name, value: externalId } : this.state.selectedOption}
                onInputChange={this.handleInputChange}
                onChange={this.handleChange}
                {...this.props}
            />)
        } else {
            input = (<AsyncSelect
                cacheOptions
                loadOptions={this.getOptions}
                defaultOptions
                onInputChange={this.handleInputChange}
                onChange={this.handleChange}
                {...this.props}
            />)
        }

        return <>
            <Col md={this.props.size}>
                {input}
            </Col>
        </>
    }
}

export default RelatedAsyncSelect;