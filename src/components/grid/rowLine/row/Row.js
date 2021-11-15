import React from "react";

class Row extends React.Component {
    render() {
        var result = this.props.values.map((value, index) => <td key={index}>{value}</td>);
        return result;
    }
}

export default Row;