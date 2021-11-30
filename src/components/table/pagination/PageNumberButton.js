import React from "react";

class PageNumberButton extends React.Component {

    render() {
        const handleClick = (e) => {
            e.preventDefault();
            this.props.onPageChange(this.props.page, this.props.active);
        };

        return <button key={"pageNumberButton" + this.props.page} onClick={handleClick} className={`btn ${this.props.active === true ? "btn-primary" : "btn-light"} mt-3`}>{this.props.page}</button>
    }
}

export default PageNumberButton;