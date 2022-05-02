import { Row, Container } from "react-bootstrap";
import ApiDetailsEditDeleteActions from "../components/ApiDetailsEditDeleteActions";

class ApiDetailsEditDeleteActionsColumnFactory {
    constructor(requestDataFactory, editHeaderText, detailsHeaderText, tooltipText) {
        this.requestDataFactory = requestDataFactory;
        this.editHeaderText = editHeaderText;
        this.detailsHeaderText = detailsHeaderText;
        this.tooltipText = tooltipText;
    }

    addActions = (items, editFormFields, detailsFormFields, relatedFields, page, sizePerPage, submit) => {
        return items.map(
            (item) => ({
                ...item, actions: (<Container key={`container_${item.externalId}`} fluid>
                    <Row key={`row_${item.externalId}`}>
                        <ApiDetailsEditDeleteActions
                            key={`apiAction_${item.externalId}`}
                            item={item}
                            tooltipText={this.tooltipText}
                            editHeaderTitle={this.editHeaderText}
                            detailsHeaderTitle={this.detailsHeaderText}
                            editBtnText="Edit"
                            deleteBtnText="Delete"
                            detailsBtnText="Details"
                            updateRequestData={this.requestDataFactory.createPut()}
                            detailsRequestData={this.requestDataFactory.createGetDetails(item.externalId)}
                            deleteRequestData={this.requestDataFactory.createDelete(item.externalId)}
                            externalId={item.externalId}
                            page={page}
                            sizePerPage={sizePerPage}
                            show={false}
                            editFormFields={editFormFields(item)}
                            detailsFormFields={detailsFormFields(item)}
                            related={relatedFields(item)}
                            submit={submit}/>
                    </Row>
                </Container>)
            }));
    }
}

export default ApiDetailsEditDeleteActionsColumnFactory;