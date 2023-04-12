import React from "react";
import { Col, Row} from "react-bootstrap";
import './../css/custom.css'
import TotalProfitInfomations from "./TotalProfitInfomations";
import TableHeaders from "./TableHeaders";
import TableLine from "./TableLine";

class Table extends React.Component {
    render = () => {
        const { model, view } = this.props;
        return <Row className="text-dark m-0 p-0 fs-6">
            <Col xs={12} className="p-0 m-0">
                <Row className="p-0 m-0 d-flex align-self-start">
                    <TableHeaders headers={
                        [
                            { name: "Material", props: { xs: "auto", className: "p-0 m-0 px-1", style: { "width": "64px" } } },
                            { name: "Buy Price", props: { className: "p-0 m-0 px-1" } },
                            { name: "Buy Price", props: { className: "p-0 m-0 px-1" } },
                            { name: "Target amount", props: { className: "p-0 m-0 px-1" } },
                            { name: "Sell Price", props: { className: "text-left p-0 m-0 fs-5 px-1" } },
                            { name: "Profit", props: { xs: "auto", className: "text-left p-0 m-0 fs-5", style: { "width": "250px" } } },
                            { name: "", props: { xs: "auto", className: "p-0 m-0", style: { "width": "100px" } } }
                        ]
                    } />
                    {model.recipes.length === 0
                        ? <Col xs={12} className="fs-2 p-0 pt-2 m-0 d-flex justify-content-center">Add recipe to compare</Col>
                        : model.recipes.map((recipe, recipeIndex) =>
                            <TableLine
                                key={`table_line_${recipeIndex}`}
                                recipe={recipe}
                                imageRetriever={this.props.imageRetriever}
                                index={recipeIndex}
                                model={model}
                                view={view}
                                onChangeMaterialStackCost={this.props.onChangeMaterialStackCost}
                                onChangeResourceStackCost={this.props.onChangeResourceStackCost}
                                onChangeCount={this.props.onChangeCount}
                                onChangePrice={this.props.onChangePrice}
                                onRemoveRecipe={this.props.onRemoveRecipe}
                                onOpenRequirements={this.props.onOpenRequirements}               
                                inventoryCreator={this.props.inventoryCreator}
                                handleReady={this.props.handleReady}
                                handleClose={this.props.handleClose} />)}
                    {model.recipes.length === 0
                        ? null
                        : <Row className="p-0 m-0 d-flex justify-content-start">
                            <Col xs="auto" className="p-0 m-0" style={{ "width": "64px", "border": "1px", "borderRightStyle": "hidden" }} />
                            <Col className="p-0 m-0" />
                            <Col className="p-0 m-0 px-1" />
                            <Col className="p-0 m-0 px-1" />
                            <Col className="text-left p-0 m-0 fs-5 px-1" style={{ "border": "1px", "borderRightStyle": "solid" }}>
                            </Col>
                            <Col xs="auto" className="text-left p-0 m-0 fs-5" style={{ "width": "250px", "border": "1px", "borderBottomStyle": "solid", "borderRightStyle": "solid" }}  >
                                <TotalProfitInfomations model={model} />
                            </Col>
                            <Col xs="auto" className="p-0 m-0" style={{ "width": "100px" }} />
                        </Row>}
                </Row>
            </Col>
        </Row>
    }
}

export default Table;