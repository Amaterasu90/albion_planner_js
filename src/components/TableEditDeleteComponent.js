import React from "react";
import { Col, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
    SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
import overlayFactory from 'react-bootstrap-table2-overlay';
import LoadingOverlay from "react-loading-overlay"

const NoDataIndication = () => (
    <div className="d-flex justify-content-center text-dark" key={"spinner_container"}>
        <div className="spinner-border" role="status" key={"spinner"} />
    </div>
);

const EmptyTable = () => (
    <span>No data</span>
);

class TableEditDeleteComponent extends React.Component {
    constructor(props) {
        super(props);
        LoadingOverlay.propTypes = undefined;

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
            sizePerPage: 5,
            isMounted: false
        };
    }

    componentDidMount = () => {
        this.setState({ isMounted: true });
        this.loadDefaultData();
    }

    componentWillReceiveProps = (prevProps, prevState) => {
        if (prevProps.requestDataFactory.entityName !== this.props.requestDataFactory.entityName) {
            this.setState(() => ({ loading: true }));
            prevProps.provider.getPaginableItems(this, prevProps);
        }
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
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
            return <NoDataIndication key={"data_no_indicator"}/>;
        } else {
            return <Row>
                <PaginationProvider pagination={paginationFactory(this.props.optionsFactory.createOptions(items.length))}>
                    {
                        ({
                            paginationProps,
                            paginationTableProps
                        }) => (
                            <div>
                                <Row key="table_row">
                                    <Col md={12} key="table_col_2">
                                        <BootstrapTable
                                            key={"table"}
                                            remote
                                            condensed={true}
                                            componentWillUnmount={this.componentUnmount}
                                            keyField='externalId'
                                            data={data}
                                            columns={columns}
                                            headerClasses="fs-5 align-middle"
                                            onTableChange={this.handleOnTableChange}
                                            rowClasses="fs-6 align-middle" {...paginationTableProps}
                                            noDataIndication={() => <EmptyTable key={"empty_table"}/>}
                                            loading={this.state.loading}
                                            overlay={overlayFactory({
                                                spinner: <NoDataIndication key={"data_no_indicator"}/>,
                                                styles: {
                                                    overlay: (base) => (
                                                        {
                                                            ...base
                                                        })
                                                }
                                            })} />
                                    </Col>
                                </Row>
                                <Row key="pagination_row">
                                    <Col md={10} key="patination_col_1" className="d-flex justify-content-center">
                                        <PaginationListStandalone key="pagination_list_standalone"
                                            {...paginationProps}
                                        />
                                    </Col>
                                    <Col md={2} key="pagination_col_2" className="d-flex justify-content-end">
                                        <SizePerPageDropdownStandalone btnContextual="btn-light dropdown-toggle" {...paginationProps} />
                                    </Col>
                                </Row>
                            </div>
                        )
                    }
                </PaginationProvider>
            </Row>
        }
    }
}

export default TableEditDeleteComponent;