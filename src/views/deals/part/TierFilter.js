import React from "react";
import { Row, Col, Button } from "react-bootstrap";

class TierFilter extends React.Component {
    constructor(props) {
        super(props);
    }

    selectTier = (current) => {
        this.props.onSelect(current);
    }

    getTiers = (all, current) => {
        return all ? all.map((element, index) => {
            return <Col xs="auto" className="m-0 p-0 text-center d-flex justify-content-start" >
                <Button variant={element === current ? `danger` : `warning`} key={`tier_${index}`} className="btn-block mx-1 btn-sm" onClick={() => this.selectTier(element)}>{element}</Button>
            </Col >
        }) : "loading data"
    }

    render = () => {
        var { all, current } = this.props;
        return <Col xs="auto">
            <Row className="text-center d-flex align-self-start pb-2" >
                {this.getTiers(all, current)}
            </Row>
        </Col>;
    }
}

export default TierFilter;