import React from "react";
import RecipeRequirements from "./../part/RecipeRequirements";
import { Modal } from "react-bootstrap";

class RecipeRequirementsModal extends React.Component {
    render() {
        const { view } = this.props;
        const { recipe, retrunRate } = view.requirements;
        return <Modal key={"modal_window"} show={view.requirements.opened} onHide={() => this.props.handleClose(view)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Refine requirements</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RecipeRequirements retrunRate={retrunRate} recipe={recipe} />
            </Modal.Body>
        </Modal>
    }
}

export default RecipeRequirementsModal;