import React from "react";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faSpinner } from '@fortawesome/fontawesome-free-solid';
import RecipeRequirements from "./RecipeRequirements";

class RequirementsInfoButton extends React.Component {
    render = () => {
        const { visible, model, index, view } = this.props;
        return visible
            ? window.innerHeight < 1300
                ? <Button size="lg" className="btn-block" style={{ "borderRadius": "0px 10px 10px 0px" }} onClick={() => { this.props.onOpenRequirements(view, model.recipes[index], model.returnRate); }}>
                    {view.requirements.loading ? <FontAwesomeIcon icon={faSpinner} /> : <FontAwesomeIcon icon={faClipboardList} />}
                </Button>
                : <OverlayTrigger
                    placement="left"
                    delay={{ show: 250, hide: 400 }}
                    overlay={(props) => {
                        return <Tooltip key={"requirements-action-tooltip"} id="requirements-action-tooltip" {...props} className="mytooltip d-flex align-items-center">
                            <figure className="position-relative m-0">
                                <figcaption style={{ "position": "absolute", "top": "-39rem", "left": "-27rem" }}>
                                    <RecipeRequirements inventoryCreator={this.inventoryCreator}
                                        handleReady={this.requirementsReady}
                                        imageRetriever={this.props.imageRetriever}
                                        returnRate={model.returnRate}
                                        recipe={model.recipes[index]}
                                        view={view} />
                                </figcaption>
                            </figure>
                        </Tooltip>
                    }}>
                    <Button size="lg" className="btn-block" style={{ "borderRadius": "0px 10px 10px 0px" }} onClick={() => { this.props.onOpenRequirements(view, model.recipes[index], model.returnRate); }}>
                        {view.requirements.loading ? <FontAwesomeIcon icon={faSpinner} /> : <FontAwesomeIcon icon={faClipboardList} />}
                    </Button>
                </OverlayTrigger>
            : null
    }
}

export default RequirementsInfoButton;