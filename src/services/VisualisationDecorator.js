class VisualisationDecorator {
    constructor(data) {
        this.data = data;
    }

    addAllowShowComplexData(definitions) {
        this.data = this.data.map((item) => {
            for (const definition of definitions) {
                item[definition.id] = item[definition.id] !== null && item[definition.id] !== 'undefined' && (typeof item[definition.id] === 'object' || Array.isArray(item[definition.id]))
                    ? JSON.stringify(item[definition.id])
                    : item[definition.id];

                if (definition.selectDescriptor != null) {
                    item[definition.id] = definition.selectDescriptor(JSON.parse(item[definition.id]));
                }

                if (definition.combineDescriptor != null) {
                    item[definition.id] = definition.combineDescriptor(item);
                }
            }

            return item;
        });
    }
}

export default VisualisationDecorator;