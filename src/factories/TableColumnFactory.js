class TableColumnFactory {
    createColumns = (items, propertyDefinitions) => {
        if (items != null && items.length !== 0) {
            const [jsonObject] = items;
            const propertyNames = Object.keys(jsonObject);
            const columns = propertyNames.map((propertyName) => {
                var founded = propertyDefinitions.find((definition) => {
                    return definition.name === propertyName;
                });
                return { dataField: propertyName, text: propertyName, headerStyle: { width: founded.width }, hidden: founded.hidden }
            })

            return columns;
        }

        return [];
    }
}

export default TableColumnFactory;