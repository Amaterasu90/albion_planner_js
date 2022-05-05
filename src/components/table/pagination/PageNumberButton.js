import React from "react";

class PageNumberButton extends React.Component {

    handleClick = (e) => {
        e.preventDefault();
        this.props.onPageChange(this.props.page, this.props.active);
    };

    render() {        
        return <button key={`pageNumberButton_${this.props.page}`} onClick={this.handleClick} className={`btn ${this.props.active === true ? "btn-primary" : "btn-light"} mt-3`}>{this.props.page}</button>
    }
}

export default PageNumberButton;