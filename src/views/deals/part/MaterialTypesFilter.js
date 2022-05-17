import React from "react";
import { Row, Col, Button } from "react-bootstrap";

class MaterialTypesFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            all: [],
            current: null
        }
    }

    componentDidMount = () => {
        var requestData = this.props.materialTypeDataFactory.createListAll();
        fetch(requestData.url, requestData.requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    var types = [{ name: "all" }];
                    this.setState({current: types[0]});
                    types.push(...result);
                    this.setState({ all: types });
                },
                (error) => {
                }
            );
    }

    selectMaterialType = (current) => {
        this.setState({ current: current });
        this.props.onSelect(current);
    }

    getMaterialTypes = (all, current) => {
        return all ? all.map((element, index) => {
            return <Col md="auto" className="m-0 p-0 text-center d-flex justify-content-start" >
                <Button variant={element.externalId === current.externalId ? `danger` : `warning`} key={`materialType_${index}`} className="btn-block mx-1 btn-sm" onClick={() => this.selectMaterialType(element)}>{element.name}</Button>
            </Col >
        }) : "loading data"
    }

    render = () => {
        var { all, current } = this.state;
        return <Col md="auto">
            <Row className="text-center d-flex align-self-start pb-2" >
                {this.getMaterialTypes(all, current)}
            </Row>
        </Col>;
    }
}

export default MaterialTypesFilter;