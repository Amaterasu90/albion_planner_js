import React from "react";
import { OverlayTrigger, Tooltip, Col } from "react-bootstrap";
import Item from "./Item";

class ItemLabeled extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        const { tooltipText, index, imageIdentifier } = this.props;
        return <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={
                <Tooltip>
                    {tooltipText}
                </Tooltip>}>
            <div className="m-0 p-0">
                <Item key={`item-image-${index}`} size="extra-small" path={"thumbnails"} imageIdentifier={imageIdentifier} {...this.props} />
            </div>
        </OverlayTrigger>
    }
}

export default ItemLabeled;