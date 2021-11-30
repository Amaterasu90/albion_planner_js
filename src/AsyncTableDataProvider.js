class AsyncTableDataProvider {
    getPaginableItems = (context, props) => {
        var requestData = props.requestDataFactory.createGet();
        fetch(requestData.url, requestData.requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    result = result.map((item) => {
                        const keys = Object.keys(item);
                        for (const key of keys) {
                            item[key] = item[key] !== null && item[key] !== 'undefined' && typeof item[key] === 'object' && !Array.isArray(item[key]) ? JSON.stringify(item[key]) : item[key];
                        }

                        return item;
                    });
                    let current = props.actionFactory.addActions(result, props.editFormFields, props.deleteRelatedFields, context.state.page, context.state.sizePerPage, context.handleOnTableChange);
                    const currentIndex = (context.state.page - 1) * context.state.sizePerPage;
                    if (context._isMounted) {
                        var sliceData = current.slice(currentIndex, currentIndex + context.state.sizePerPage);
                        context.setState(() => ({
                            items: current,
                            data: sliceData,
                            columns: props.columnsFactory.createColumns(sliceData, props.propertyDefinitions),
                            isLoaded: true,
                            loading: false,
                        }));
                    }
                },
                (error) => {
                    if (context._isMounted) {
                        context.setState({
                            isLoaded: true,
                            loading: false,
                            error
                        });
                    }
                }
            )
    }
}

export default AsyncTableDataProvider;