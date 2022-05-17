class CrudRequestDataFactory {
    constructor(entityName, requestDataFactory) {
        this.entityName = entityName;
        this.requestDataFactory = requestDataFactory;
    }

    createPost = () => {
        return this.requestDataFactory.createPost(`https://localhost:44348/${this.entityName}/create`);
    }

    createPut = () => {
        return this.requestDataFactory.createPut(`https://localhost:44348/${this.entityName}/edit`);
    }

    createDelete = (externalId) => {
        return this.requestDataFactory.createDelete(`https://localhost:44348/${this.entityName}/delete`, externalId);
    }

    createListAll = (entity, externalId) => {
        return !entity || !externalId
            ? this.requestDataFactory.createGet(`https://localhost:44348/${this.entityName}/list`)
            : this.requestDataFactory.createGet(`https://localhost:44348/${this.entityName}/list/${entity}/${externalId}`);
    }

    createSelectList = (selectorName, selector, selectorName1, selector1, selectorName2, selector2) => {
        return this.requestDataFactory.createGet(`https://localhost:44348/${this.entityName}/list/filter?${selectorName}=${selector}&${selectorName1}=${selector1}&${selectorName2}=${selector2}`);
    }

    createListGroup = (entityName, groupName, fieldName, value, fieldName1, value1) => {
        return !entityName
            ? this.requestDataFactory.createGet(`https://localhost:44348/${this.entityName}/list/${groupName}?${fieldName}=${value}&${fieldName1}=${value1}`)
            : this.requestDataFactory.createGet(`https://localhost:44348/${this.entityName}/list/${groupName}/${entityName}?${fieldName}=${value}&${fieldName1}=${value1}`);
    }

    createGetDetails = (externalId) => {
        return this.requestDataFactory.createGet(`https://localhost:44348/${this.entityName}/details/${externalId}`);
    }
}

export default CrudRequestDataFactory;