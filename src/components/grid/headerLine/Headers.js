import React from "react";
import Header from "./header/Header";

class Headers extends React.Component {
    render() {
        var [first] = this.props.json;
        var headers = Object.keys(first);
        var result = headers.map((header, index) => <Header key={index} name={header}/>)
        return <tr>{result}</tr>;
    }
}

export default Headers;