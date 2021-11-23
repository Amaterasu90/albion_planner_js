import React from "react";

class PageNumberButonList extends React.Component {
    render(){
        debugger;
        const pageListRenderer = ({
            pages,
            onPageChange
          }) => {
            const pageWithoutIndication = pages.filter(p => typeof p.page !== 'string');
            return (
              <div>
                {
                  pageWithoutIndication.map(p => (
                    <button className="btn btn-success" onClick={ () => onPageChange(p.page) }>{ p.page }</button>
                  ))
                }
              </div>
            );
          };

        return pageListRenderer;
    }
}

export default PageNumberButonList;