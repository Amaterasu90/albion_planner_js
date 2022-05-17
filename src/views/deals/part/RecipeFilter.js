import React from "react";
import { Row, Spinner, Col } from "react-bootstrap";
import MaterialFilter from "./MaterialFilter";
import RecipeSelector from "./RecipeSelector";

class RecipeFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        }
    }

    onInitialize = (all) => {
        this.props.onInitialize(all);
        this.setState({ loading: false });
    }

    onStartLoading = () => {
        this.setState({ loading: true });
    }

    onEndLoading = () => {
        this.setState({ loading: false });
    }


    render = () => {
        var { imageRetriever, all, current, materialDataFactory, materialTypeDataFactory } = this.props;
        var { loading } = this.state;
        return <Row className="m-0 p-0">
            <Row className={`m-0 p-0 d-flex justify-content-center ${loading ? "" : "visually-hidden"}`}>
                <Col>
                    <Spinner animation="border" variant="dark" />
                </Col>
            </Row>
            <Row className={`m-0 p-0 ${loading ? "visually-hidden" : ""}`}>
                <Row className="m-0 p-0" >
                    <MaterialFilter
                        materialDataFactory={materialDataFactory}
                        materialTypeDataFactory={materialTypeDataFactory}
                        imageRetriever={imageRetriever}
                        onSelect={(currentTier) => this.props.onSelectMaterial(currentTier)}
                        onInitialize={(all) => this.onInitialize(all)}
                        onStartLoading={() => this.onStartLoading()}
                        onEndLoading={() => this.onEndLoading()} />
                    <RecipeSelector
                        imageRetriever={imageRetriever}
                        all={all}
                        current={current}
                        moveNext={(current) => this.props.onMoveNext(current)}
                        movePrevious={(current) => this.props.onMovePrevious(current)}
                        onSelect={(recipe) => this.props.onAddRecipe(recipe)} />
                </Row>
            </Row>
        </Row >
    }
}

export default RecipeFilter;