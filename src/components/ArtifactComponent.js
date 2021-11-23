import React from "react";
import ApiModalForm from './modal/ApiModalForm'
import { Col, Container, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
    SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
import overlayFactory from 'react-bootstrap-table2-overlay';

const NoDataIndication = () => (
    <div class="d-flex justify-content-center text-dark">
        <div class="spinner-border" role="status" />
    </div>
);

class ArtifactComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            loading: true,
            items: [],
            show: false
        };
    }

    getItems = () => {
        var requestData = this.props.requestDataFactory.createGet();
        fetch(requestData.url, requestData.requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    let current = this.props.actionFactory.addActions(result, this.props.editFormFields, this.props.deleteRelatedFields, this.getItems);
                    this.setState({
                        isLoaded: true,
                        loading: false,
                        items: current
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        loading: false,
                        error
                    });
                }
            )
    }

    getPaginableItems = (page, sizePerPage) => {
        var requestData = this.props.requestDataFactory.createGet();
        fetch(requestData.url, requestData.requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    let current = this.props.actionFactory.addActions(result, this.props.editFormFields, this.props.deleteRelatedFields, page, sizePerPage, this.handleOnTableChange);
                    const currentIndex = (page - 1) * sizePerPage;
                    this.setState(() => ({
                        page,
                        items: current,
                        data: current.slice(currentIndex, currentIndex + sizePerPage),
                        sizePerPage,
                        isLoaded: true,
                        loading: false,
                    }));
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        loading: false,
                        error
                    });
                }
            )
    }

    componentDidMount = () => {
        this.setState(() => ({ data: [] }));
        this.getPaginableItems(1, 5);
    }

    handleOnTableChange = (type, { page, sizePerPage }) => {
        this.setState(() => ({ data: [] }));
        this.getPaginableItems(page, sizePerPage);
    }

    render() {
        const { error, isLoaded, items, data } = this.state;
        if (error) {
            return <div className="fs-6 align-middle text-dark">Błąd: {error.message}</div>;
        } else if (!isLoaded) {
            return <NoDataIndication />;
        } else {
            return <Container className="d-grid gap-3">
                <Row className="p-2 m-2">
                    <ApiModalForm
                        headerTitle="Add new artifact"
                        btnText="Add artifact"
                        requestData={this.props.requestDataFactory.createPost()}
                        show={this.state.show}
                        submit={this.handleOnTableChange}
                        page={this.state.page}
                        sizePerPage={this.state.sizePerPage}
                        fields={this.props.createFormFields} />
                    <Col md={7} />
                </Row>
                <Row className="p-2">
                    <PaginationProvider pagination={paginationFactory(this.props.optionsFactory.createOptions(items.length))}>
                        {
                            ({
                                paginationProps,
                                paginationTableProps
                            }) => (
                                <div>
                                    <Row>
                                        <Col md={2} />
                                        <Col md={9} >
                                            <BootstrapTable
                                                remote
                                                keyField='externalId'
                                                data={data}
                                                columns={this.props.columnsFactory.createColumns(data, this.props.propertyDefinitions)}
                                                headerClasses="fs-5 align-middle"
                                                sort={ { dataField: 'createdOn', order: 'asc' } }
                                                onTableChange={this.handleOnTableChange}
                                                rowClasses="fs-6 align-middle" {...paginationTableProps}
                                                noDataIndication={() => <NoDataIndication />}
                                                loading={ this.state.loading }
                                                overlay={ overlayFactory({ spinner: true, styles: { overlay: (base) => ({...base, background: 'rgba(255, 0, 0, 0.5)'}) } }) } />
                                        </Col>
                                        <Col md={1} />
                                    </Row>
                                    <Row>
                                        <Col md={{ span: 0, offset: 4 }}>
                                            <PaginationListStandalone
                                                {...paginationProps}
                                            />
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Col md={{ span: 1, offset: 0 }}>
                                                    <p className="text-dark text-nowrap fs-6 mt-2">Items per page:</p>
                                                </Col>
                                                <Col md={{ span: 1, offset: 3 }}>
                                                    <SizePerPageDropdownStandalone btnContextual="btn-light dropdown-toggle" {...paginationProps} />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            )
                        }
                    </PaginationProvider>
                </Row>
            </Container >

        }
    }
}

export default ArtifactComponent;