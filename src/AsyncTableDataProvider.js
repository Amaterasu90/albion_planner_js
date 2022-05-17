import VisualisationDecorator from "./services/VisualisationDecorator";

class AsyncTableDataProvider {
    getPaginableItems = (context, props) => {
        var requestData = props.requestDataFactory.createListAll();
        fetch(requestData.url, requestData.requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    var decorator = new VisualisationDecorator(result);
                    decorator.addAllowShowComplexData(props.propertyDefinitions);
                    let current = props.actionFactory.addActionsWithContent(result, props.actionsContent);
                    const currentIndex = (context.state.page - 1) * context.state.sizePerPage;
                    if (context.state.isMounted) {
                        var sliceData = current.slice(currentIndex, currentIndex + context.state.sizePerPage);
                        var columns = props.columnsFactory.createColumns(props.propertyDefinitions)
                        context.setState(() => ({
                            items: current,
                            data: sliceData,
                            columns: columns,
                            isLoaded: true,
                            loading: false,
                        }));
                    }
                },
                (error) => {
                    if (context.state.isMounted) {
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