import React from "react";
import { Row, Col, Image, FormLabel, Button } from "react-bootstrap"
import Item from "./Item";
import ItemStack from "./ItemStack";

class RecipeSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: [],
            currentRecipe: null
        }
    }

    selectRecipe = (current) => {
        this.props.onSelect(current);
    }

    componentDidMount = () => {
        this.setState({ recipes: this.props.all });
        this.setState({ currentRecipe: this.props.current });
    }

    getRecipe = (recipe) => {
        return <Col xs={12} className="m-0 p-0 text-center d-flex justify-content-center align-self-start" >
            <Col xs="auto" className="text-center text-dark m-0 p-0 fs-6 d-flex align-self-center" style={{ cursor: "pointer" }} onClick={() => this.selectRecipe(recipe)}>
                <Row className="m-0 p-0 d-flex align-self-center">
                    {recipe.materialStacks.map((element) => <Col className="p-0 d-flex align-self-center">
                        <ItemStack imageRetriever={this.props.imageRetriever} size="medium" path={"thumbnails"} imageIdentifier={element.material.itemImageIdentifier} count={element.count} />
                    </Col>)}
                    {recipe.resourceStacks.map((element) => <Col className="p-0 d-flex align-items-center">
                        <ItemStack imageRetriever={this.props.imageRetriever} size="medium" path={"thumbnails"} imageIdentifier={element.resource.itemImageIdentifier} count={element.count} />
                    </Col>)}
                </Row>
            </Col>
        </Col >;
    }

    moveNext = (all, index) => {
        var actual = all[index + 1];;
        this.props.moveNext(actual);
    }

    movePrevious = (all, index) => {
        var actual = all[index - 1];
        this.props.movePrevious(actual);
    }

    getRecipes = (all, current) => {
        return all
            ? <Row className="text-center text-dark m-0 p-0 pb-2 fs-6 d-flex justify-content-center">
                <Col xs={1} className="m-0 p-0 text-center d-flex align-self-center justify-content-end" >
                    {<Button disabled={all.indexOf(all.find((item) => item.externalId === current.externalId)) === 0} size="sm" className="btn-block" variant="primary" onClick={() => this.movePrevious(all, all.indexOf(all.find((item) => item.externalId === current.externalId)))}>{"<"}</Button>}
                </Col>
                <Col xs={10} className="m-0 p-0 text-center d-flex justify-content-center align-self-center" style={{ "width": "384px" }} >
                    {this.getRecipe(current)}
                </Col>
                <Col xs={1} className="m-0 p-0 text-center d-flex align-self-center justify-content-start" >
                    {<Button disabled={all.indexOf(all.find((item) => item.externalId === current.externalId)) === all.length - 1} size="sm" className="btn-block" variant="primary" onClick={() => this.moveNext(all, all.indexOf(all.find((item) => item.externalId === current.externalId)))}>{">"}</Button>}
                </Col>
            </Row>
            : null
    }

    render = () => {
        var { all, current } = this.props;
        return !all || all === 0 ? null : <Row className="text-center text-dark m-0 p-0 pb-2 fs-6 d-flex justify-content-center">
            <Col xs={12} className="p-0 m-0 d-flex justify-content-center">
                <Row className="text-center pb-2 d-flex justify-content-center" >
                    <FormLabel className="mx-2 mb-0 mt-1 align-self-center">Select Recipe</FormLabel>
                    {this.getRecipes(all, current)}
                </Row>
            </Col>
        </Row>
    }
}

export default RecipeSelector;