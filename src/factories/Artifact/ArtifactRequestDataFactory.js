class ArtifactRequestDataFactory {
    constructor(listUrl, createUrl, deleteUrl, editUrl, requestDataFactory) {
        this.listUrl = listUrl;
        this.createUrl = createUrl;
        this.deleteUrl = deleteUrl;
        this.editUrl = editUrl;
        this.requestDataFactory = requestDataFactory;
    }

    createPost() {
        return this.requestDataFactory.createPost(this.createUrl);
    }

    createPut() {
        return this.requestDataFactory.createPut(this.editUrl);
    }

    createDelete(externalId) {
        return this.requestDataFactory.createDelete(this.deleteUrl, externalId);
    }

    createGet() {
        return this.requestDataFactory.createGet(this.listUrl);
    }
}

export default ArtifactRequestDataFactory;