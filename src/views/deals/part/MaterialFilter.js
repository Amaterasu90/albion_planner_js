import React from "react";
import { Row, Col, FormLabel, Spinner } from "react-bootstrap";
import BaseFilter from "./BaseFilter";
import RecipeSelector from "./RecipeSelector";
import MaterialSelector from "./MaterialSelector";
import { Suspense } from 'react';

const MaterialGrid = React.lazy(() => import('./MaterialGrid'));

class MaterialFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            all: [],
            current: null,
            loading: true
        }
    }

    componentDidMount = () => {
        var requestData = this.props.materialDataFactory.createSelectList("externalId", "", "tier", "", "enhancement", "");
        fetch(requestData.url, requestData.requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({ current: result[0] });
                    this.setState({ all: result });
                    this.setState({ loading: false });
                    this.props.onInitialize(result)
                },
                (error) => {
                }
            );
    }

    setFoundedRecipe = (recipes) => {
        debugger;
        if(recipes.length === 1){
            this.selectMaterial(recipes[0]);
        } else {
            this.resetMaterial();
        }
    }

    recieveMaterials = (tier, enhancement, materialType) => {
        var requestData = this.props.materialDataFactory.createSelectList(
            "externalId", materialType == null || materialType.externalId == null ? "" : materialType.externalId,
            "tier", tier == null || tier === "all" ? "" : tier,
            "enhancement", enhancement == null || enhancement === "all" ? "" : enhancement);
        fetch(requestData.url, requestData.requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({ current: result[0] });
                    this.setState({ all: result });
                    this.setFoundedRecipe(result, result[0]);
                    this.props.onEndLoading();
                },
                (error) => {
                }
            );
    }

    selectTier = (tier) => {
        this.props.onStartLoading();
        this.setState({ tier: tier });

        this.recieveMaterials(tier, this.state.enhancement, this.state.materialType);
    }

    selectEnhancement = (enhancement) => {
        this.props.onStartLoading();
        this.setState({ enhancement: enhancement });

        this.recieveMaterials(this.state.tier, enhancement, this.state.materialType);
    }

    selectMaterialType = (materialType, tier, enhancement) => {
        this.props.onStartLoading();
        this.setState({ materialType: materialType });
        this.setState({ tier: tier });
        this.setState({ enhancement: enhancement });
        this.recieveMaterials(tier, enhancement, materialType);
    }

    selectMaterial = (current) => {
        this.setState({ current: current });
        this.props.onSelect(current);
    }

    resetMaterial = (current) => {
        this.setState({ current: current });
        this.props.onReset(current);
    }

    groupBy = (arr) => {
        var result = arr.reduce((previousValue, currentValue) => {

            var entry = previousValue.find((item) => item.key === currentValue.enhancement);
            if (!entry) {
                previousValue.push({ key: currentValue.enhancement, values: [] });
            }

            previousValue.find((item) => item.key === currentValue.enhancement).values.push(currentValue);

            return previousValue;

        }, []);

        this.getGrid(arr);

        return result;
    }

    getGrid = (all) => {
        if (!all.length) {
            return;
        }

        var enhancements = all.reduce((previousValue, currentValue) => {
            var enhancement = previousValue.find((item) => item === currentValue.enhancement);
            if (enhancement == null) {
                previousValue.push(currentValue.enhancement);
            }

            return previousValue;
        }, []);

        var lines = [];

        enhancements.forEach((element) => {
            lines.push(all.filter((item) => item.enhancement === element));
        })

        var longestLineLength = Math.max(...lines.map((item) => item.length));

        var longestLine = lines.find((item) => item.length === longestLineLength);

        var result = [];

        enhancements.forEach((enhancement) => {
            var line = [];
            for (var cell = 0; cell < longestLineLength; cell++) {
                line.push(this.getItem(all, longestLine[cell].tier, enhancement, longestLine[cell].type));
            }

            result.push(line);
        });

        return result;
    }

    getItem = (all, tier, enhancement, type) => {
        return all.find((item) => item.tier === tier && item.enhancement === enhancement && item.type.externalId === type.externalId)
    }

    getMaterials = (all) => {
        var materials = all ? this.getGrid(all) : null;
        return materials ? materials.map((line) => {
            return <Row className="p-0 m-0 d-flex justify-content-center">
                {line.map((item, index) => {
                    return !item
                        ? <Col xs="auto" className="p-0 d-flex align-items-center" style={{ "width": "32px", "height": "32px" }} />
                        : <Col xs="auto" className="m-0 p-0 text-center d-flex justify-content-center" >
                            <MaterialSelector imageRetriever={this.props.imageRetriever} model={item} index={index} size={"extra-small"} path={"thumbnails"} onSelect={() => this.selectMaterial(item)} style={{ "cursor": "pointer" }} />
                        </Col >
                })}
            </Row>
        }) : null;
    }

    render = () => {
        var { all, loading } = this.state;
        return <Row className="m-0 p-0 d-flex justify-content-start">
            <Row className={`m-0 p-0 d-flex justify-content-start`}>
                <BaseFilter
                    key="base_filter"
                    materialTypeDataFactory={this.props.materialTypeDataFactory}
                    materialDataFactory={this.props.materialDataFactory}
                    selectTier={(currentTier) => this.selectTier(currentTier)}
                    selectEnhancement={(currentEnhancement) => this.selectEnhancement(currentEnhancement)}
                    onSelect={(currentMaterialType, tier, enhancement) => this.selectMaterialType(currentMaterialType, tier, enhancement)} />
                <Col xs="auto" className="m-0 p-0 d-flex justify-content-start " >
                    <Col className={`m-0 p-0 d-flex justify-content-start ${loading ? "" : "visually-hidden"}`}>
                        <Spinner animation="border" variant="dark" />
                    </Col>
                    <Col className={`m-0 p-0 d-flex row justify-content-center ${loading ? "visually-hidden" : ""}`}>
                        <Col xs={12} className="m-0 p-0">
                            <FormLabel className="mx-2 mb-0">Select Material</FormLabel>
                        </Col>
                        <Col xs="auto" className="m-0 p-0">
                            <Suspense fallback={<div>Loading...</div>}>
                                <MaterialGrid imageRetriever={this.props.imageRetriever} items={all} onSelect={(item) => this.selectMaterial(item)} />
                            </Suspense>
                        </Col>
                    </Col>
                </Col>
                <Col xs="auto" className="m-0 p-0 d-flex justify-content-center align-self-start">
                    <RecipeSelector
                        imageRetriever={this.props.imageRetriever}
                        all={this.props.all}
                        current={this.props.current}
                        moveNext={(current) => this.props.onMoveNext(current)}
                        movePrevious={(current) => this.props.onMovePrevious(current)}
                        onSelect={(recipe) => this.props.onSelectRecipe(recipe)} />
                </Col>
            </Row>
        </Row>;
    }
}

export default MaterialFilter;