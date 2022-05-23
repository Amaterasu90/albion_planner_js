import React from "react";
import {Row, Col, OverlayTrigger, Tooltip} from "react-bootstrap"
import Calculator from "../utils/Calculator";
const numberformat = require('swarm-numberformat')

class TotalProfitInfomations extends React.Component {
    getAllProfits = (model) => {
        var profits = model.recipes.map((element) => Calculator.calculateProfit(model.returnRate, element, model.costPer100, model.tax))
        var result = profits.reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
        }, 0);

        return result;
    }

    generateAllProfits = (model) => {
        var value = this.getAllProfits(model);
        if (!value) {
            return null;
        }

        return new Intl.NumberFormat('en-us', { maximumFractionDigits: 0 }).format(value);
    }

    getAverageProfitRate = (model) => {
        var returnRates = model.recipes.map((recipe) => {
            var profit = Calculator.calculateProfit(model.returnRate, recipe, model.costPer100, model.tax);
            var allCosts = Calculator.getAllCosts(model.returnRate, recipe, model.costPer100, model.tax);
            return allCosts === 0 ? 0 : (profit / allCosts) * 100;
        });

        return returnRates.reduce((prev, next) => (prev + next)) / returnRates.length;
    }

    generateAllProfitsShort = (model) => {
        var value = this.getAllProfits(model);
        return numberformat.format(value, { suffixes: ['', ' k', ' m', ' b', ' t'] });
    }

    generateAverageProfitRate = (model) => {
        var profitRate = this.getAverageProfitRate(model);
        return <p className={`m-0 p-0 ${parseInt(profitRate) === model.profitRate ? "text-dark" : parseInt(profitRate) > model.profitRate ? "text-success" : "text-danger"}`}>{this.generateAllProfitsShort(model)} ({parseInt(profitRate)} %)</p>
    }

    render = () => {
        const { model } = this.props;
        return <Row className="p-0 m-0 d-flex">
            <Col className="p-0 m-0 mt-3 align-self-center">
                <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={(props) => (
                        <Tooltip key={"price-tooltip"} id="price-tooltip" {...props}>
                            {this.generateAllProfits(model)}
                        </Tooltip>)}>
                    <Col>{this.generateAverageProfitRate(model)}</Col>
                </OverlayTrigger>
            </Col>
        </Row>;
    }
}

export default TotalProfitInfomations;