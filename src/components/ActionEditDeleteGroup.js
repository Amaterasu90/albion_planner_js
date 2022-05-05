import React from "react";
import { Col, ToggleButtonGroup, ToggleButton, Tooltip, OverlayTrigger } from "react-bootstrap";

class ActionEditDeleteGroup extends React.Component {
    handleDelete = () => {
        if (this.props.handleDelete) {
            this.props.handleDelete(this.props.externalId);
        }
    }

    handleOpen = () => {
        if (this.props.handleEdit) {
            this.props.handleEdit(this.props.externalId);
        }
    }

    render() {
        let group;
        if (this.props.actual) {
            group = (<OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={(props) => (<Tooltip key={"button-tooltip"} id="button-tooltip" {...props}>{this.props.tooltipText}</Tooltip>)}>
                <ToggleButtonGroup key={"checkbox"} type="checkbox" className="mb-2">
                    <ToggleButton key={"tbg-check-1"} id="tbg-check-1" className="btn-success" onClick={this.handleOpen}>
                        {this.props.editBtnText}
                    </ToggleButton>
                    <ToggleButton key={"tbg-check-3"} id="tbg-check-3" className="btn-secondary" disabled>
                        {this.props.deleteBtnText}
                    </ToggleButton>
                </ToggleButtonGroup>
            </OverlayTrigger>);
        } else {
            group = (
                <ToggleButtonGroup key={"checkbox"} type="checkbox" className="mb-2">
                    <ToggleButton key={"tbg-check-1"} id="tbg-check-1" className="btn-success" onClick={this.handleOpen}>
                        {this.props.editBtnText}
                    </ToggleButton>
                    <ToggleButton key={"tbg-check-3"} id="tbg-check-3" className="btn-danger" onClick={this.handleDelete}>
                        {this.props.deleteBtnText}
                    </ToggleButton>
                </ToggleButtonGroup>);
        }
        return <Col>
            {group}
        </Col >
    }
}

export default ActionEditDeleteGroup;