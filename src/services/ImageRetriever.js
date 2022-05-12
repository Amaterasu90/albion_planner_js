class ImageRetriever {
    constructor(baseUrl, images) {
        this.baseUrl = baseUrl;
        this.images = images;
    }

    getAll = (identifier) => {
        return this.images.filter((item) => item.includes(identifier)).map((item) => `${this.baseUrl}/${item}`);
    }

    get = (size, identifier) => {
        var image = this.images.find((item) => item.includes(identifier) && item.includes(size));
        return `${this.baseUrl}/${image}`;
    }
}

export default ImageRetriever;