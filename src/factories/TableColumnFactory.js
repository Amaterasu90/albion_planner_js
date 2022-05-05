class TableColumnFactory {
    createColumns = (propertyDefinitions) => {
        return propertyDefinitions.map((definition, index) => { return { dataField: definition.id, text: definition.name, headerStyle: definition.headerStyle, hidden: definition.hidden, key: `${definition.id}_${definition.name}_${index}` } });
    }
}

export default TableColumnFactory;