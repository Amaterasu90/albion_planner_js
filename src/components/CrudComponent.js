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
    _isMounted = false;

    constructor(props) {
        super(props);
        let data = [];
        this.state = {
            error: null,
            isLoaded: false,
            loading: true,
            items: [],
            show: false,
            data: data,
            columns: this.props.columnsFactory.createColumns(data, this.props.propertyDefinitions),
            page: 1,
            sizePerPage: 5
        };
    }

    componentDidMount = () => {
        this._isMounted = true;
        this.loadDefaultData();
    }

    componentWillReceiveProps = (prevProps, prevState) => {
        if (prevProps.requestDataFactory.entityName !== this.props.requestDataFactory.entityName) {
            this.setState(() => ({ loading: true }));
            prevProps.provider.getPaginableItems(this, prevProps);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
      }

    loadDefaultData = () => {
        this.setState(() => ({ loading: true, page: 1, sizePerPage: 5 }));
        this.props.provider.getPaginableItems(this, this.props);
    }

    handleOnTableChange = (type, { page, sizePerPage }) => {
        this.setState(() => ({ loading: true, page: page, sizePerPage: sizePerPage }));
        this.props.provider.getPaginableItems(this, this.props);
    }

    render() {
        const { error, isLoaded, items, data, columns } = this.state;
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
                                        <Col md={2} key="table_col_1" />
                                        <Col md={9} key="table_col_2">
                                            <BootstrapTable
                                                remote
                                                componentWillUnmount={this.componentUnmount}
                                                keyField='externalId'
                                                data={data}
                                                columns={columns}
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
                                        <Col md={1} key="table_col_3" />
                                    </Row>
                                    <Row key="pagination_row">
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