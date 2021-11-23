import { Row, Container } from "react-bootstrap";
import ApiActions from "../components/ApiActions";

class ApiActionColumnFactory {
    constructor(requestDataFactory, tooltipText) {
        this.requestDataFactory = requestDataFactory;
        this.tooltipText = tooltipText;
    }

    addActions = (items, formFields, relatedFields, page, sizePerPage, submit) => {
        return items.map(
            (item) => ({
                ...item, actions: (<Container fluid>
                    <Row>
                        <ApiActions
                            item={item}
                            tooltipText={this.tooltipText}
                            headerTitle="Edit artifact"
                            editBtnText="Edit"
                            deleteBtnText="Delete"
                            requestData={this.requestDataFactory.createPut()}
                            deleteRequestData={this.requestDataFactory.createDelete(item.externalId)}
                            externalId={item.externalId}
                            page={page}
                            sizePerPage={sizePerPage}
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