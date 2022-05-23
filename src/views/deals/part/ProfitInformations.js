import React from "react";
import {Row, Col, OverlayTrigger, Tooltip} from "react-bootstrap";
import Calculator from "../utils/Calculator";
const numberformat = require('swarm-numberformat')

class ProfitInformations extends React.Component {
    render = () => {
        const { returnRate, recipe, costPer100, tax, profitRate } = this.props;
        var profit = Calculator.calculateProfit(returnRate, recipe, costPer100, tax);
        if (!profit) {
            return null;
        }

        var allCosts = Calculator.getAllCosts(returnRate, recipe, costPer100, tax);
        var profitRateFactor = (profit / allCosts) * 100;

        return <Row className="p-0 m-0 d-flex align-self-center">
            <Col className="p-0 m-0 mt-3 align-self-center">
                <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={(props) => (
                        <Tooltip key={"price-tooltip"} id="price-tooltip" {...props}>
                            {this.getToalProfit(returnRate, recipe, costPer100, tax)}
                        </Tooltip>)}>
                    <p className={`m-0 p-0 ${parseInt(profitRateFactor) === profitRate ? "text-dark" : parseInt(profitRateFactor) > profitRate ? "text-success" : "text-danger"}`}>{numberformat.format(profit, { suffixes: ['', ' k', ' m', ' b', ' t'] })} ({parseInt(profitRateFactor)} %)</p>
                </OverlayTrigger>
            </Col>
        </Row>;
    }
}

export default ProfitInformations;