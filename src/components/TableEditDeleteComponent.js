import React from "react";
import { Button, Col, Row, ButtonGroup } from "react-bootstrap";

class TableEditDeleteComponent extends React.Component {
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

    getNextNumberPage = () => {
        return this.state.page + 1;
    }

    getTotalPages = () => {
        return Math.ceil(this.state.items.length / this.state.sizePerPage);
    }

    isOnEnd = () => {
        const totalPages = this.getTotalPages();
        const nextNumber = this.getNextNumberPage();
        return nextNumber > totalPages;
    }

    goToNextPage = (e) => {
        if (!this.isOnEnd()) {
            this.goToPage((this.getNextNumberPage()));
        }
    }

    goToPage = (page) => {
        this.setState(() => ({ page: page }));
        this.props.provider.getPaginableItems(this, this.props);
    }

    getPreviousNumberPage = () => {
        return this.state.page - 1;
    }

    isOnStart = () => {
        const nextNumber = this.getPreviousNumberPage();
        return nextNumber <= 0;
    }

    goToPreviousPage = (e) => {
        if (!this.isOnStart()) {
            this.goToPage((this.getPreviousNumberPage()));
        }
    }

    handleOnTableChange = (type, { page, sizePerPage }) => {
        this.setState(() => ({ loading: true, page: page, sizePerPage: sizePerPage }));
        this.props.provider.getPaginableItems(this, this.props);
    }

    render() {
        const { error, isLoaded, items, data, columns, page } = this.state;
        const [first, ...range] = Array(this.getTotalPages() + 1).keys();
        
        if (error) {
            return <div className="fs-6 align-middle text-dark">Błąd: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="d-flex justify-content-center text-dark" key={"spinner_container"}>
                <div className="spinner-border" role="status" key={"spinner"} />
            </div>;
        } else {
            return <Row>
                <table>
                    <thead>
                        <tr>
                            {columns.filter(column => !column.hidden).map(column => {
                                return <th style={column.style}>{column.name}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(row => {
                            return <tr>{columns.filter(column => !column.hidden).map(column => { return <td style={column.style}>{row[column.id]}</td> })}</tr>
                        })}
                    </tbody>
                </table>
                {this.getTotalPages() === 1 ?
                    null : <Row>
                        <Col md={{ span: 6, offset: 2 }}>
                            <ButtonGroup>
                                <Button disabled={this.isOnStart()} onClick={this.goToPreviousPage}>{"<<"}</Button>
                                {range.map((id) => <Button key={id} onClick={() => this.goToPage(id)} variant={page === id ? "warning" : "secondary"}>{id}</Button>)}
                                <Button disabled={this.isOnEnd()} onClick={this.goToNextPage}>{">>"}</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>}
            </Row >
        }
    }
}

export default TableEditDeleteComponent;