import React from "react";

class ItemCountSelectorButtons extends React.Component {
    render() {
        return <div className="btn-group" role="group">
            {
                this.props.options.map((option, index) => {
                    return <button
                        key={option.text + " " + index}
                        type="button"
                        onClick={() => this.props.onSizePerPageChange(option.page)}
                        className={`btn ${this.props.currSizePerPage === `${option.page}` ? 'btn-primary' : 'btn-light'}`}
                    >
                        {option.text}
                    </button>
                })
            }
        </div>
    }
}

export default ItemCountSelectorButtons;