class CrudRequestDataFactory {
    constructor(entityName, requestDataFactory) {
        this.entityName = entityName;
        this.requestDataFactory = requestDataFactory;
    }

    createPost() {
        return this.requestDataFactory.createPost(`https://localhost:44348/${this.entityName}/create`);
    }

    createPut() {
        return this.requestDataFactory.createPut(`https://localhost:44348/${this.entityName}/edit`);
    }

    createDelete(externalId) {
        return this.requestDataFactory.createDelete(`https://localhost:44348/${this.entityName}/delete`, externalId);
    }

    createGet() {
        return this.requestDataFactory.createGet(`https://localhost:44348/${this.entityName}/list`);
    }
}

export default CrudRequestDataFactory;