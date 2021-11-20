import React from "react";

class PageNumberButonList extends React.Component {
    render(){
        const pageWithoutIndication = this.props.pages.filter(p => typeof p.page !== 'string');
        return (
            <div className="bg-light">
                {
                    pageWithoutIndication.map(p => (
                        <button className="btn btn-light" onClick={() => this.props.onPageChange(p.page)}>{p.page}</button>
                    ))
                }
            </div>
        );
    }
}

export default PageNumberButonList;