import { Row, Container } from "react-bootstrap";

class ApiEditDeleteActionsColumnFactory {
    addActionsWithContent = (items, content) => {
        return items.map(
            (item) => ({
                ...item, actions: (<Container key={`container_${item.externalId}`} fluid>
                    <Row key={`row_${item.externalId}`}>
                        {content(item)}
                    </Row>
                </Container>)
            }));
    }
}

export default ApiEditDeleteActionsColumnFactory;