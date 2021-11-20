class TableColumnFactory {
    createColumns = (items, propertyDefinitions) => {
        var [jsonObject] = items;
        var propertyNames = Object.keys(jsonObject);
        return propertyNames.map((propertyName) => {
            var founded = propertyDefinitions.find((definition) => {
                return definition.name === propertyName;
            });
            return { dataField: propertyName, text: propertyName, headerStyle: { width: founded.width }, hidden: founded.hidden }
        })
    }
}

export default TableColumnFactory;