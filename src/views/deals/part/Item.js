import React from "react";
import { Image } from "react-bootstrap";

class Item extends React.Component {
    render = () => {
        const { imageRetriever, path, size, imageIdentifier, style, onClick } = this.props;
        return <Image src={imageRetriever ? imageRetriever.get(`${path}/${size}`, imageIdentifier) : null} style={style} onClick={onClick} />;
    }
}

export default Item;