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

    componentDidMount = () => {
        this.getItems()
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Błąd: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Ładowanie...</div>;
        } else {
            return <Container fluid>
                <Row>
                    <ApiModalForm
                        headerTitle="Add new artifact"
                        btnText="Add artifact"
                        requestData={this.props.requestDataFactory.createPost()}
                        show={this.state.show}
                        submit={this.getItems}
                        fields={this.props.createFormFields} />
                    <Col md={7} />
                </Row>
                <Row>
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
                                                keyField='externalId'
                                                data={items}
                                                columns={this.props.columnsFactory.createColumns(items, this.props.propertyDefinitions)}
                                                headerClasses="fs-5 align-middle"
                                                rowClasses="fs-6 align-middle" {...paginationTableProps}
                                                loading={this.state.loading}
                                                overlay={overlayFactory({
                                                    spinner: true,
                                                    background: 'rgba(192,192,192,0.3)',
                                                })} />
                                        </Col>
                                        <Col md={1} />
                                    </Row>
                                    <Row>
                                        <Col md={{ span: 1, offset: 6 }}>
                                            <PaginationListStandalone
                                                {...paginationProps}
                                            />
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Col md={{ span: 1, offset: 4 }}>
                                                    <p className="text-dark text-nowrap fs-4 mt-2">Items per page:</p>
                                                </Col>
                                                <Col md={{ span: 1, offset: 2 }}>
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