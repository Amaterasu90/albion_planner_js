import React from "react";
import { Col, Row, FormLabel, FormControl, Form } from "react-bootstrap"

class FinancialInput extends React.Component {
    render = () => {
        const { model } = this.props;
        return <Row className="text-center text-dark pb-2 m-0 p-0 fs-6 d-flex justify-content-start">
            <Col xs={12}>
                <Row className="text-center d-flex align-self-start pb-2" >
                    <Col xs="auto" className="d-flex align-self-start text-nowrap">
                        <FormLabel className="mx-2 mb-0 align-self-center">Return rate</FormLabel>
                        <FormControl placeholder="Return Rate" value={model.returnRate} onChange={(e) => { this.props.onChangeReturnRate(model, e); }} />
                        <FormLabel className="mx-2 mb-0 align-self-center">%</FormLabel>
                    </Col>
                    <Col xs="auto" className="d-flex align-self-start text-nowrap">
                        <FormLabel className="mx-2 mb-0 align-self-center">Cost per 100 food unit</FormLabel>
                        <FormControl placeholder="Cost per 100 food unit" value={model.costPer100} onChange={(e) => { this.props.onChangeFoodCost(model, e); }} />
                    </Col>
                    <Col xs="auto" className="d-flex align-self-start text-nowrap">
                        <FormLabel className="mx-2 mb-0 align-self-center">Tax</FormLabel>
                        <Form.Select placeholder="Tax" onChange={(e) => { this.props.onChangeTax(model, e); }} >
                            <option value="0.03">Premium (3%)</option>
                            <option value="0.06">Non-Premium (6%)</option>
                        </Form.Select>
                    </Col>
                    <Col xs="auto" className="d-flex align-self-start text-nowrap">
                        <FormLabel className="mx-2 mb-0 align-self-center">Profit rate</FormLabel>
                        <FormControl placeholder="Return Rate" value={model.profitRate} onChange={(e) => { this.props.onChangeProfitRate(model, e); }} />
                        <FormLabel className="mx-2 mb-0 align-self-center">%</FormLabel>
                    </Col>
                </Row>
            </Col>
        </Row>
    }
}

export default FinancialInput;