import React from "react";

class PageNumberButton extends React.Component {

    render() {
        const handleClick = (e) => {
            e.preventDefault();
            this.props.onPageChange(this.props.page, this.props.active);
        };
        
        return <li key={"pageNumberButton" + this.props.page} className="page-item">
            <button onClick={handleClick} className={`btn ${this.props.active === true ? "btn-primary" : "btn-light"}`}>{this.props.page}</button>
        </li>
    }
}

export default PageNumberButton;