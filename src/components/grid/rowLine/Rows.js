import React from "react";
import Row from "./row/Row";

class Rows extends React.Component {
    render() {
        var entries = this.props.json.reduce((acc, obj) => [...acc, Object.values(obj).map(y => y)], []);
        var result = entries.map((entry, index) => <tr key={index}><Row values={entry}/></tr>);
        return result;
    }
}

export default Rows;