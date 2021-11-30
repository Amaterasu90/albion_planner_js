class TableColumnFactory {
    createColumns = (items, propertyDefinitions) => {
        if (items != null && items.length !== 0) {
            const [jsonObject] = items;
            const propertyNames = Object.keys(jsonObject);
            const columns = propertyNames.map((propertyName) => {
                var founded = propertyDefinitions.find((definition) => {
                    return definition.id === propertyName;
                });

                if (founded != null) {
                    return { dataField: propertyName, text: founded.name, headerStyle: { width: founded.width }, hidden: founded.hidden }
                }

                return null;
            })
            return columns;
        }

        return propertyDefinitions.map((definition) => { return { dataField: definition.id, text: definition.name, headerStyle: { width: definition.width }, hidden: definition.hidden } });
    }
}

export default TableColumnFactory;