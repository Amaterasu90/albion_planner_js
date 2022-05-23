import React from "react";
import { Row, Col } from "react-bootstrap";

class TableHeaders extends React.Component {
    render = () => {
        const { headers } = this.props;

        return <Row className="p-0 m-0 d-flex justify-content-center">
            {headers.map((header, index) => <Col className="p-0 m-0 fs-5" key={`col_header_${index}`} {...header.props}><p className="p-0 m-0 fs-6">{header.name}</p></Col>)}
        </Row>
    }
}

export default TableHeaders;