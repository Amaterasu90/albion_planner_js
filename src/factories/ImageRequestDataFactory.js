class ImageRequestDataFactory {
    constructor(requestDataFactory) {        
        this.requestDataFactory = requestDataFactory;
    }

    createGet() {
        return this.requestDataFactory.createGet(`https://localhost:44348/image/list`);
    }
}

export default ImageRequestDataFactory;