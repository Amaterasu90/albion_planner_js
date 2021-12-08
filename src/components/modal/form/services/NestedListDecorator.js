class NestedListRetriever {
    constructor(body, entries, listTag, fieldTag, objectTag){
        this.body = body;
        this.entries = entries;
        this.listTag = listTag;
        this.fieldTag = fieldTag
        this.objectTag = objectTag;
    }

    addNestedList = () => {
        var nestedEntries = this.entries.filter((entry) => {
            const [name] = entry;
            const condition = name.includes(this.objectTag);
            return condition;
        });

        if (nestedEntries.length !== 0) {
            var nested = nestedEntries.reduce((previousValue, currentValue, index, array) => {
                const [name, value] = currentValue;
                const [key, nested] = name.split(this.listTag);

                if (previousValue.length === 0) {
                    previousValue.push([key, [[nested, value]]]);
                    return previousValue;
                }

                const foundedElement = previousValue.find(x => {
                    const [pName] = x;
                    return pName === key;
                });

                if (foundedElement) {
                    const [, foundedValues] = foundedElement;
                    foundedValues.push([nested, value])
                }
                else {
                    previousValue.push([key, [[nested, value]]])
                }

                return previousValue;
            }, [])

            var [subElement] = nested;
            var [key, values] = subElement;
            var nestesdRawList = values.reduce((previousValue, currentValue) => {
                const [name, value] = currentValue;
                const [key, nested] = name.split(this.fieldTag);

                if (previousValue.length === 0) {
                    previousValue.push([nested, [[key, value]]]);
                    return previousValue;
                }

                const foundedElement = previousValue.find(x => {
                    const [pName] = x;
                    return pName === nested;
                });

                if (foundedElement) {
                    const [, foundedValues] = foundedElement;
                    foundedValues.push([key, value])
                }
                else {
                    previousValue.push([nested, [[key, value]]])
                }

                return previousValue;
            }, []);


            const list = nestesdRawList.map((item, index, array) => {
                const [, object] = array[index];
                return Object.fromEntries(object)
            });
            this.body[key] = list;

            nestedEntries.forEach((item) => {                
                const [key, ] = item;
                delete this.body[key];
            });
        }
    }
}

export default NestedListRetriever;