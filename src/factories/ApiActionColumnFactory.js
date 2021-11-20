import { Row, Container } from "react-bootstrap";
import ApiActions from "../components/ApiActions";

class ApiActionColumnFactory {
    constructor(requestDataFactory, tooltipText) {
        this.requestDataFactory = requestDataFactory;
        this.tooltipText = tooltipText;
    }

    addActions = (items, formFields, relatedFields, submit) => {
        return items.map(
            (item) => ({
                ...item, actions: (<Container fluid>
                    <Row>
                        <ApiActions
                            item={item}
                            headerTitle="Edit artifact"
                            editBtnText="Edit"
                            deleteBtnText="Delete"
                            requestData={this.requestDataFactory.createPut()}
                            deleteRequestData={this.requestDataFactory.createDelete(item.externalId)}
                            externalId={item.externalId}
                            show={false}
                            formFields={formFields(item)}
                            related={relatedFields(item)}                            
                            submit={submit} />
                    </Row>
                </Container>)
            }));
    }
}

export default ApiActionColumnFactory;