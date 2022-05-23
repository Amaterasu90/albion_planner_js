import React from "react";
import MaterialSelector from "./MaterialSelector";
import { Col } from "react-bootstrap"

class MaterialGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            grid: []
        }
    }

    componentDidMount = () => {
        this.setState({ grid: this.getGrid(this.props.items) });
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        var externalIds = this.props.items.map((item) => item.externalId);
        var previousExternalIds = prevProps.items.map((item) => item.externalId);
        if (this.props.items.length !== prevProps.items.length || JSON.stringify(externalIds) !== JSON.stringify(previousExternalIds)) {
            this.setState({ grid: this.getGrid(this.props.items) });
        }
    }

    getGrid = (all) => {
        if (!all.length) {
            return;
        }

        var enhancements = all.reduce((previousValue, currentValue) => {
            var enhancement = previousValue.find((item) => item === currentValue.enhancement);
            if (enhancement == null) {
                previousValue.push(currentValue.enhancement);
            }

            return previousValue;
        }, []);

        var lines = [];

        enhancements.forEach((element) => {
            lines.push(all.filter((item) => item.enhancement === element));
        })

        var longestLineLength = Math.max(...lines.map((item) => item.length));

        var longestLine = lines.find((item) => item.length === longestLineLength);

        var result = [];

        enhancements.forEach((enhancement) => {
            var line = [];
            for (var cell = 0; cell < longestLineLength; cell++) {
                line.push(this.getItem(all, longestLine[cell].tier, enhancement, longestLine[cell].type));
            }

            result.push(line);
        });

        return result;
    }

    getItem = (all, tier, enhancement, type) => {
        return all.find((item) => item.tier === tier && item.enhancement === enhancement && item.type.externalId === type.externalId)
    }

    render = () => {
        const { imageRetriever, onSelect } = this.props;
        var { grid } = this.state;
        return grid ? grid.length !== 0 ? grid.map((line, lineNumber) => {
            return <Col xs="auto" key={`col_material_line_${lineNumber}`} className="p-0 m-0 d-flex justify-content-start">
                {
                    line.map((item, index) => {
                        return !item
                            ? <Col xs="auto" key={`col_material_cell_${index}`} className="p-0 d-flex align-items-center" style={{ "width": "32px", "height": "32px" }} />
                            : <Col xs="auto" key={`col_material_cell_${index}`} className="m-0 p-0 text-center d-flex justify-content-center" >
                                <MaterialSelector imageRetriever={imageRetriever} model={item} index={index} key={`material_cell_${index}`} size="extra-small" path={"thumbnails"} onSelect={() => onSelect(item)} style={{ "cursor": "pointer" }} />
                            </Col >

                    })
                }
            </Col>
        }) : null : null;
    }
}

export default MaterialGrid;