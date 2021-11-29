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
    <div className="d-flex justify-content-center text-dark">
        <div className="spinner-border" role="status" />
    </div>
);

const EmptyTable = () => (
    <p>No data</p>
);

class CrudComponent extends React.Component {
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
        this.setState(() => ({ loading: true }))
        this.getPaginableItems(1, 5);
    }

    handleOnTableChange = (type, { page, sizePerPage }) => {
        this.setState(() => ({ loading: true }))
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
                        headerTitle={this.props.createFormatHeaderText}
                        btnText={this.props.createBtnText}
                        disabled={this.state.loading}
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
                                    <Row key="table_row">
                                        <Col md={2} key="table_col_1"/>
                                        <Col md={9} key="table_col_2">
                                            <BootstrapTable
                                                remote
                                                keyField='externalId'
                                                data={data}
                                                columns={this.props.columnsFactory.createColumns(data, this.props.propertyDefinitions)}
                                                headerClasses="fs-5 align-middle"
                                                onTableChange={this.handleOnTableChange}
                                                rowClasses="fs-6 align-middle" {...paginationTableProps}
                                                noDataIndication={() => <EmptyTable />}
                                                loading={this.state.loading}
                                                overlay={overlayFactory({
                                                    spinner: <NoDataIndication />,
                                                    styles: {
                                                        overlay: (base) => (
                                                            {
                                                                ...base
                                                            })
                                                    }
                                                })} />
                                        </Col>
                                        <Col md={1} key="table_col_3"/>
                                    </Row>
                                    <Row  key="pagination_row">
                                        <Col md={{ span: 3, offset: 4 }} key="patination_col_1">
                                            <PaginationListStandalone key="pagination_list_standalone"
                                                {...paginationProps}
                                            />
                                        </Col>
                                        <Col key="pagination_col_2">
                                            <p className="text-dark text-nowrap fs-6 mt-3 d-none d-xl-inline">Items per page: </p>
                                            <SizePerPageDropdownStandalone btnContextual="btn-light dropdown-toggle" {...paginationProps} />
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

export default CrudComponent;