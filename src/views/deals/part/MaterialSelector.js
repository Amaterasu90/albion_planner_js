import React from "react";
import ItemLabeled from "./ItemLabeled";


class MaterialSelector extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        const { model, onSelect } = this.props;
        return <ItemLabeled tooltipText={`${model.name} ${model.tier}.${model.enhancement}`} imageIdentifier={model.itemImageIdentifier} onClick={onSelect} {...this.props}/>;
    }
}

export default MaterialSelector;