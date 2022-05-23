import React from "react";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/fontawesome-free-solid'

class DeleteButton extends React.Component {
    render = () => {
        const { rounded, visible, index } = this.props;
        return visible
            ? rounded
                ? <OverlayTrigger
                    placement="left"
                    delay={{ show: 250, hide: 400 }}
                    overlay={(props) => {
                        return <Tooltip key={"delete-action-tooltip"} id="delete-action-tooltip" {...props}>
                            Delete
                        </Tooltip>
                    }}>
                    <Button
                        variant="danger"
                        size="lg"
                        style={{ "borderRadius": "0px 0px 0px 0px" }}
                        className="btn-block"
                        onClick={() => { this.props.onRemoveRecipe(index); }}
                        onMouseEnter={() => this.props.onTransitionEnterDelete(index)}
                        onMouseLeave={() => this.props.onTransitionExitDelete()}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </OverlayTrigger>
                : <OverlayTrigger
                    placement="left"
                    delay={{ show: 250, hide: 400 }}
                    overlay={(props) => (
                        <Tooltip key={"delete-action-tooltip"} id="delete-action-tooltip" {...props}>
                            Delete
                        </Tooltip>)}>
                    <Button
                        variant="danger"
                        size="lg"
                        style={{ "borderRadius": "0px 10px 10px 0px" }}
                        className="btn-block"
                        onClick={() => { this.props.onRemoveRecipe(index); }}
                        onMouseEnter={() => this.props.onTransitionEnterDelete(index)}
                        onMouseLeave={() => this.props.onTransitionExitDelete()}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </OverlayTrigger>
            : null
    }
}

export default DeleteButton;