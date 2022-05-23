import React from "react";
import { Col, Row, Button, FormLabel } from "react-bootstrap";
import TierFilter from "./TierFilter";
import EnhancementFilter from "./EnhancementFilter";

class BaseFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            all: [],
            current: null,
            tiers: [],
            currentTier: null,
            enhancements: [],
            currentEnhancement: null
        }
    }

    componentDidMount = () => {
        var requestData = this.props.materialTypeDataFactory.createListAll();
        fetch(requestData.url, requestData.requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    var types = [{ name: "all" }];
                    this.setState({ current: types[0] });
                    types.push(...result);
                    this.setState({ all: types });

                    var requestData = this.props.materialDataFactory.createListGroup("material/type", "tiers", "externalId", types[0].name === "all" ? "" : types[0].externalId);
                    fetch(requestData.url, requestData.requestOptions)
                        .then(res => res.json())
                        .then(
                            (result) => {
                                var tiers = ["all"];
                                this.setState({ currentTier: tiers[0] });
                                tiers.push(...result);
                                this.setState({ tiers: tiers });
                            },
                            (error) => {
                            }
                        );

                    var requestData = this.props.materialDataFactory.createListGroup("", "enhancements", "externalId", types[0].name === "all" ? "" : types[0].externalId);
                    fetch(requestData.url, requestData.requestOptions)
                        .then(res => res.json())
                        .then(
                            (result) => {
                                var enhancements = ["all"];
                                this.setState({ currentEnhancement: enhancements[0] });
                                enhancements.push(...result);
                                this.setState({ enhancements: enhancements });
                            },
                            (error) => {
                            }
                        );
                },
                (error) => {
                }
            );
    }

    selectMaterialType = (current, tier) => {
        this.setState({ current: current });

        var requestData = this.props.materialDataFactory.createListGroup("material/type", "tiers", "externalId", current.name === "all" ? "" : current.externalId);
        fetch(requestData.url, requestData.requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    var tiers = ["all"];
                    if (result.length > 1) {
                        tiers.push(...result);
                    }
                    this.setState({ tiers: tiers });
                },
                (error) => {
                }
            );

        var requestData = this.props.materialDataFactory.createListGroup("", "enhancements", "externalId", current.name === "all" ? "" : current.externalId, "tier", tier === "all" ? "" : tier);
        fetch(requestData.url, requestData.requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.length > 1) {
                        var enhancements = ["all"];
                        enhancements.push(...result);
                        this.setState({ enhancements: enhancements });
                    } else {
                        var enhancements = ["all"];
                        this.setState({ currentEnhancement: enhancements[0] })
                        this.setState({ enhancements: enhancements });
                    }

                    this.props.onSelect(current, this.state.currentTier, this.state.currentEnhancement);
                },
                (error) => {
                }
            );
    }

    selectTier = (tier, current) => {
        this.setState({ currentTier: tier });

        var requestData = this.props.materialDataFactory.createListGroup("", "enhancements", "externalId", current.name === "all" ? "" : current.externalId, "tier", tier === "all" ? "" : tier);
        fetch(requestData.url, requestData.requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.length > 1) {
                        var enhancements = ["all"];
                        enhancements.push(...result);
                        this.setState({ enhancements: enhancements });
                    } else {
                        var enhancements = ["all"];
                        this.setState({ currentEnhancement: enhancements[0] })
                        this.setState({ enhancements: enhancements });
                    }

                    this.props.onSelect(current, this.state.currentTier, this.state.currentEnhancement);
                },
                (error) => {
                }
            );

        this.props.selectTier(tier);
    }

    selectEnhancement = (enhancement) => {
        this.setState({ currentEnhancement: enhancement });
        this.props.selectEnhancement(enhancement);
    }

    getMaterialTypes = (all, current, tier) => {
        return all ? all.map((element, index) => {
            return <Col xs="auto" className="m-0 p-0 text-center d-flex justify-content-start" >
                <Button variant={element.externalId === current.externalId ? `danger` : `warning`} key={`materialType_${index}`} className="btn-block mx-1 btn-sm" onClick={() => this.selectMaterialType(element, tier)}>{element.name}</Button>
            </Col >
        }) : "loading data"
    }

    render = () => {
        var { all, current, tiers, currentTier, enhancements, currentEnhancement } = this.state;
        return current == null
            ? null
            : <Col xs="auto" className="m-0 p-0 d-flex justify-content-start" >
                <Col xs="auto" className="m-0 p-0 d-flex row justify-content-center">
                    <Col xs={2} className="m-0 p-0 d-flex justiy-content-center">
                        <FormLabel className="mx-2 mb-0">Filer</FormLabel>
                    </Col>
                    <Col xs="auto" className="m-0 p-0">
                        <Row className="text-center text-dark m-0 p-0 pb-2 fs-6" >
                            <TierFilter key="tier_filter" current={currentTier} all={tiers} materialDataFactory={this.props.materialDataFactory} onSelect={(currentTier) => this.selectTier(currentTier, current)} />
                        </Row >
                        <Row className="text-center text-dark m-0 p-0 pb-2 fs-6">
                            {enhancements.length <= 1 ? null : <EnhancementFilter key="enhancement_filter" current={currentEnhancement} all={enhancements} materialTypeExternalId={current.name === "all" ? "" : current.externalId} materialDataFactory={this.props.materialDataFactory} onSelect={(currentEnhancement) => this.selectEnhancement(currentEnhancement)} />}
                        </Row>
                        <Row className="text-center text-dark m-0 p-0 pb-2 fs-6">
                            <Col xs="auto">
                                <Row className="text-center d-flex align-self-start pb-2" >
                                    {this.getMaterialTypes(all, current, currentTier)}
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Col>
            </Col>;
    }
}

export default BaseFilter;