import React from "react";

class ItemCountSelectorButtons extends React.Component {
    render() {
        return <span>
            <p className="text-dark text-nowrap fs-6 d-none d-lg-inline">Items per page:&nbsp;</p>
            <div className="btn-group" role="group">
                {
                    this.props.options.map((option, index) => {
                        return <button
                            key={`${option.text}_${index}`}
                            type="button"
                            onClick={() => this.props.onSizePerPageChange(option.page)}
                            className={`btn ${this.props.currSizePerPage === `${option.page}` ? 'btn-primary' : 'btn-light'} d-none d-lg-inline`}>
                            {option.text}
                        </button>
                    })
                }
            </div>
        </span>
    }
}

export default ItemCountSelectorButtons;