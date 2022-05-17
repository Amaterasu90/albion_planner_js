import React from "react";
import { Row, Col, Image, FormLabel, Button } from "react-bootstrap"

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
        return <Col md="auto" className="m-0 p-0 text-center d-flex justify-content-center" >
            <Row className="text-center text-dark m-0 p-0 fs-6" style={{ cursor: "pointer" }} onClick={() => this.selectRecipe(recipe)}>
                {recipe.materialStacks.map((element) => <Col md="auto" className="p-0 d-flex align-items-center">
                    <figure className="position-relative m-0">
                        <Image src={this.props.imageRetriever ? this.props.imageRetriever.get("thumbnails/small", element.material.itemImageIdentifier) : null} />
                        <figcaption className={`text-warning ${element.count < 10 ? "oneSign" : element.count < 100 ? "twoSign" : "treeSign"}`} style={{ "font-size": "0.55rem" }}>
                            {element.count}
                        </figcaption>
                    </figure>
                </Col>)}
                {recipe.resourceStacks.map((element) => <Col md="auto" className="p-0 d-flex align-items-center">
                    <figure className="position-relative m-0">
                        <Image src={this.props.imageRetriever ? this.props.imageRetriever.get("thumbnails/small", element.resource.itemImageIdentifier) : null} />
                        <figcaption className={`text-warning ${element.count < 10 ? "oneSign" : element.count < 100 ? "twoSign" : "treeSign"}`} style={{ "font-size": "0.55rem" }}>
                            {element.count}
                        </figcaption>
                    </figure>
                </Col>)}
            </Row>
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
                <Col className="m-0 p-0 text-center d-flex align-self-center justify-content-end" >
                    {<Button disabled={all.indexOf(all.find((item) => item.externalId === current.externalId)) === 0} size="sm" className="btn-block" variant="primary" onClick={() => this.movePrevious(all, all.indexOf(all.find((item) => item.externalId === current.externalId)))}>{"<"}</Button>}
                </Col>
                <Col md={8} className="m-0 p-0 text-center d-flex justify-content-center" >
                    {this.getRecipe(current)}
                </Col>
                <Col className="m-0 p-0 text-center d-flex align-self-center justify-content-start" >
                    {<Button disabled={all.indexOf(all.find((item) => item.externalId === current.externalId)) === all.length - 1} size="sm" className="btn-block" variant="primary" onClick={() => this.moveNext(all, all.indexOf(all.find((item) => item.externalId === current.externalId)))}>{">"}</Button>}
                </Col>
            </Row>
            : null
    }

    render = () => {
        var { all, current } = this.props;
        return !all || all === 0 ? null : <Row className="text-center text-dark m-0 p-0 pb-2 fs-6 d-flex justify-content-center">
            <Col md="auto" className="p-0 m-0">
                <Row className="text-center pb-2" >
                    <FormLabel className="mx-2 mb-0 mt-1 align-self-center">Select Recipe</FormLabel>
                    {this.getRecipes(all, current)}
                </Row>
            </Col>
        </Row>
    }
}

export default RecipeSelector;