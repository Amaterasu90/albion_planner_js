import ItemCountButton from "../components/table/pagination/ItemCountButton";
import ItemCountSelectorButtons from "../components/table/pagination/ItemCountSelectorButtons";
import PageNumberButton from "../components/table/pagination/PageNumberButton";
import PageNumberButonList from "../components/table/pagination/PageNumberButonList";

class TableOptionsFactory {
    createOptions = (count) => {
        return {
            custom: true,
            lastPageText: '>>',
            firsPageText: '<<',
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
            sizePerPageOptionRenderer: ({ ...args }) => (<ItemCountButton {...args} />),
            pageListRenderer: ({ ...args }) => (<PageNumberButonList { ...args } />),
            sizePerPageRenderer: ({ ...args }) => (<ItemCountSelectorButtons { ...args } />),
            pageButtonRenderer: ({ ...args }) => (<PageNumberButton { ...args } />)
        }
    }
}

export default TableOptionsFactory;