import { Row, Container } from "react-bootstrap";
import ApiActions from "../components/ApiActions";

class ApiActionColumnFactory {
    constructor(requestDataFactory, editHeaderText, tooltipText) {
        this.requestDataFactory = requestDataFactory;
        this.editHeaderText = editHeaderText;
        this.tooltipText = tooltipText;
    }

    addActions = (items, formFields, relatedFields, page, sizePerPage, submit) => {
        return items.map(
            (item) => ({
                ...item, actions: (<Container key={`container_${item.externalId}`} fluid>
                    <Row key={`row_${item.externalId}`}>
                        <ApiActions
                            key={`apiAction_${item.externalId}`}
                            item={item}
                            tooltipText={this.tooltipText}
                            headerTitle={this.editHeaderText}
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