import React from "react";
import { Row, Spinner, Col } from "react-bootstrap";
import MaterialFilter from "./MaterialFilter";

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
        return <Row className="m-0 p-0 d-flex justify-content-start align-self-start">
            <Row className={`m-0 p-0 d-flex justify-content-center ${loading ? "" : "visually-hidden"}`}>
                <Col>
                    <Spinner animation="border" variant="dark" />
                </Col>
            </Row>
            <Row className={`m-0 p-0 ${loading ? "visually-hidden" : ""}`}>
                <Row className="m-0 p-0 d-flex justify-content-start align-self-start" >
                    <MaterialFilter
                        materialDataFactory={materialDataFactory}
                        materialTypeDataFactory={materialTypeDataFactory}
                        imageRetriever={imageRetriever}
                        onSelect={(currentTier) => this.props.onSelectRecipe(currentTier)}
                        onReset={() => this.props.onResetRecipe()}
                        onInitialize={(all) => this.onInitialize(all)}
                        onStartLoading={() => this.onStartLoading()}
                        onEndLoading={() => this.onEndLoading()}
                        all={all}
                        current={current}
                        onMoveNext={(current) => this.props.onMoveNext(current)}
                        onMovePrevious={(current) => this.props.onMovePrevious(current)}
                        onSelectRecipe={(recipe) => this.props.onAddRecipe(recipe)} />
                </Row>
            </Row>
        </Row >
    }
}

export default RecipeFilter;