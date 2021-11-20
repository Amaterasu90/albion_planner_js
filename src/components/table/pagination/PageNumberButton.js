import React from "react";

class PageNumberButton extends React.Component {
    render() {
        return <li key={"pageNumberButton" + this.props.page} className="page-item">
            <button onClick={(e) => {
                e.preventDefault();
                this.props.onPageChange(this.props.page);
            }} className={`btn ${this.props.active === true ? "btn-primary" : "btn-light"}`}>{this.props.page}</button>
        </li>
    }
}

export default PageNumberButton;