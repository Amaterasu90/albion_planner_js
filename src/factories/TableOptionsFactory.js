import ItemCountSelectorButtons from "../components/table/pagination/ItemCountSelectorButtons";
import PageNumberButton from "../components/table/pagination/PageNumberButton";

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
            
            sizePerPageRenderer: ({ ...args }) => (<ItemCountSelectorButtons key={"item_count_selector_buttons"} {...args} />),
            pageButtonRenderer: ({ ...args }) => (<PageNumberButton key={"page_number_button"} {...args} />)
        }
    }
}

export default TableOptionsFactory;