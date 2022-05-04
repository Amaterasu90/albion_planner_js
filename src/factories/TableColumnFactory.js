class TableColumnFactory {
    createColumns = (propertyDefinitions) => {
        // if (items != null && items.length !== 0) {
        //     const [jsonObject] = items;
        //     const propertyNames = Object.keys(jsonObject);
        //     const columns = propertyNames.map((propertyName, index) => {
        //         var founded = propertyDefinitions.find((definition) => {
        //             return definition.id === propertyName;
        //         });

        //         if (founded != null) {
        //             return { dataField: propertyName, text: founded.name, headerStyle: { width: founded.width }, hidden: founded.hidden, key: `${propertyName}_${founded.name}_${index}`}
        //         }

        //         return null;
        //     })
        //     return columns;
        // }

        return propertyDefinitions.map((definition, index) => { return { dataField: definition.id, text: definition.name, headerStyle: definition.headerStyle, hidden: definition.hidden, key: `${definition.id}_${definition.name}_${index}` } });
    }
}

export default TableColumnFactory;