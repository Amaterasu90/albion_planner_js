import React from "react";
import { Row, Col, Button } from "react-bootstrap";

class EnhancementFilter extends React.Component {
    selectEnhancement = (current) => {
        this.props.onSelect(current);
    }

    getEnhancements = (all, current) => {
        return all ? all.map((element, index) => {
            return <Col xs="auto" key={`col_filter_button_${index}`} className="m-0 p-0 text-center d-flex justify-content-start" >
                <Button variant={element === current ? `danger` : `warning`} key={`enhancement_filter_button_${index}`} className="btn-block mx-1 btn-sm" onClick={() => this.selectEnhancement(element)}>{element}</Button>
            </Col >
        }) : "loading data";
    }

    render = () => {
        var { all, current } = this.props;
        return <Col xs="auto">
            <Row className="text-center d-flex align-self-start pb-2" >
                {this.getEnhancements(all, current)}
            </Row>
        </Col>;
    }
}

export default EnhancementFilter;