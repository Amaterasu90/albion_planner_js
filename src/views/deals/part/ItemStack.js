import React from "react";
import Item from "./Item"

class ItemStack extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        const { imageRetriever, size, path, imageIdentifier, count } = this.props;
        return <figure className="position-relative m-0">
            <Item imageRetriever={imageRetriever} size={size} path={path} imageIdentifier={imageIdentifier} />
            <figcaption className={`text-warning ${count < 10 ? `oneSign-${size}` : count < 100 ? `twoSign-${size}` : `treeSign-${size}`}`}>
                {count}
            </figcaption>
        </figure>;
    }
}

export default ItemStack;