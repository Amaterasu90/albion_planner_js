import React from "react";

class Header extends React.Component {
    render() {
        return <th>{this.props.name}</th>;
    }
}

export default Header;