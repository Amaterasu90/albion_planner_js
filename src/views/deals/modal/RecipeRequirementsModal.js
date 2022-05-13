import React from "react";
import RecipeRequirements from "./../part/RecipeRequirements";
import { Modal } from "react-bootstrap";
import "./../css/modal.css"

class RecipeRequirementsModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            component: null,
        };
    }

    render() {
        const { view, inventoryCreator, handleReady, imageRetriever } = this.props;
        const { recipe, returnRate } = view.requirements;
        return <Modal key={"modal_window"}
            show={view.requirements.opened}
            onShow={this.handleOpen}
            onHide={() => this.props.handleClose(view)} centered dialogClassName={inventoryCreator.tabsCount(returnRate, recipe) === 1 ? "modal-short" : "modal-long"} >
            <Modal.Header closeButton>
                <Modal.Title>Transport plan</Modal.Title>
            </Modal.Header>
            <Modal.Body className="m-0 p-0">
                <RecipeRequirements
                    inventoryCreator={inventoryCreator}
                    handleReady={handleReady}
                    imageRetriever={imageRetriever}
                    returnRate={returnRate}
                    recipe={recipe}
                    view={view} />
            </Modal.Body>
        </Modal >
    }
}

export default RecipeRequirementsModal;