import React from "react";
import { Col, ButtonGroup } from "react-bootstrap";
import DeleteButton from "./DeleteButton";
import RequirementsInfoButton from "./RequirementsInfoButton";

class ActionButtons extends React.Component {

    render = () => {
        const { model, view, index } = this.props;
        const isOverLimit = this.props.inventoryCreator.tabsIsOverLimit(model.returnRate, model.recipes[index]);
        return <ButtonGroup className="p-0 m-0 text-center d-flex align-items-stretch">
            <Col xs="auto" className="p-0 m-0 d-flex align-items-stretch">{
                <DeleteButton
                    visible={model.recipes.length > 1}
                    rounded={model.recipes[index].count}
                    model={model}
                    index={index}
                    onRemoveRecipe={() => this.props.onRemoveRecipe(index)}
                    onTransitionEnterDelete={() => this.props.onTransitionEnterDelete(index)}
                    onTransitionExitDelete={() => this.props.onTransitionExitDelete()} />}</Col>
            <Col xs={6} className="p-0 m-0 d-flex align-items-stretch">
                <RequirementsInfoButton
                    visible={model.recipes[index].count && model.recipes[index].count !== 0 && !isOverLimit}
                    model={model}
                    index={index}
                    view={view}
                    onOpenRequirements={this.props.onOpenRequirements}
                    inventoryCreator={this.props.inventoryCreator}
                    handleReady={this.props.handleReady}
                    handleClose={this.props.handleClose} />
            </Col>
        </ButtonGroup >
    }
}

export default ActionButtons;