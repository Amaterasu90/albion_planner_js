import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import React from 'react';

const NoDataIndication = () => (
    <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status" />
    </div>
);

const Table = ({ data, columns, page, sizePerPage, onTableChange, totalSize }) => (
    <div>
        <BootstrapTable
            remote
            keyField="externalId"
            data={data}
            columns={columns}
            pagination={paginationFactory({ page, sizePerPage, totalSize })}
            onTableChange={onTableChange}
            noDataIndication={() => <NoDataIndication />}
        />
    </div>
);

class EmptyTableOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            data: props.data.slice(0, 10),
            sizePerPage: 10
        };
    }

    getPaginableItems = (page, sizePerPage) => {
        var requestData = this.props.requestDataFactory.createGet();
        fetch(requestData.url, requestData.requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    let current = this.props.actionFactory.addActions(result, this.props.editFormFields, this.props.deleteRelatedFields, this.getPaginableItems);

                    const currentIndex = (page - 1) * sizePerPage;
                    this.setState(() => ({
                        page,
                        data: current.slice(currentIndex, currentIndex + sizePerPage),
                        sizePerPage
                    }));
                },
                (error) => {
                    this.setState({ error });
                }
            )
    }

    handleTableChange = (type, { page, sizePerPage }) => {
        this.getPaginableItems(page, sizePerPage);
        this.setState(() => ({ data: [] }));
    }

    render() {
        const { data, sizePerPage, page } = this.state;
        return (
            <Table
                data={data}
                page={page}
                columns={this.props.columns}
                sizePerPage={sizePerPage}
                totalSize={this.props.data.length}
                onTableChange={this.handleTableChange}
            />
        );
    }
}

export default EmptyTableOverlay;