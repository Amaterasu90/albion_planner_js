class TableColumnFactory {
    createColumns = (propertyDefinitions) => {
        return propertyDefinitions.map((definition, index) => { return { id: definition.id, name: definition.name, hidden: definition.hidden, style: definition.headerStyle, key: `${definition.id}_${definition.name}_${index}` } });
    }
}

export default TableColumnFactory;