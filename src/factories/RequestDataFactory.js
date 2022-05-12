class RequestDataFactory {
    constructor(headers, mode){
        this.headers = headers || {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        };
        this.mode = mode || 'cors'
    }

    createPost(url) {
        return {
            url: url,
            requestOptions: {
                method: 'post',
                mode: this.mode,
                headers: this.headers
            }
        }
    }

    createPut(url) {
        return {
            url: url,
            requestOptions: {
                method: 'put',
                mode: this.mode,
                headers: this.headers
            }
        }
    }

    createDelete(url, externalId) {
        return {
            url: `${url}/${externalId}`,
            requestOptions: {
                method: 'delete',
                mode: this.mode,
                headers: this.headers
            }
        }
    }

    createGet(url) {
        return {
            url: url,
            requestOptions: {
                method: 'get',
                mode: this.mode,
                headers: this.headers
            }
        }
    }
}

export default RequestDataFactory;