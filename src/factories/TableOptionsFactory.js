import ItemCountSelectorButtons from "../components/table/pagination/ItemCountSelectorButtons";
import PageNumberButton from "../components/table/pagination/PageNumberButton";

class TableOptionsFactory {
    createOptions = (count) => {
        return {
            custom: true,
            lastPageText: '>>',
            firstPageText: '<<',
            withFirstAndLast: true,
            totalSize: count,
            disablePageTitle: false,
            sizePerPageList: [{
                text: '5', value: 5
            },
            {
                text: '10', value: 10
            },
            {
                text: '15', value: 15
            }],
            
            sizePerPageRenderer: ({ ...args }) => (<ItemCountSelectorButtons {...args} />),
            pageButtonRenderer: ({ ...args }) => (<PageNumberButton {...args} />)
        }
    }
}

export default TableOptionsFactory;