import React from "react";

class ItemCountButton extends React.Component {
    render() {
        return <li key={this.props.text + " " + this.props.page} className="dropdown-item">
            <div role="menuitem" data-page={this.props.page} onMouseDown={(e) => { e.preventDefault(); this.props.onSizePerPageChange(this.props.page); }}>
                {this.propstext}
            </div>
        </li>
    }
}

export default ItemCountButton