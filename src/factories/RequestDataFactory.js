class RequestDataFactory {
    createPost(url) {
        return {
            url: url,
            requestOptions: {
                method: 'post',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            }
        }
    }

    createPut(url) {
        return {
            url: url,
            requestOptions: {
                method: 'put',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            }
        }
    }

    createDelete(url, externalId){
        return {
            url: `${url}/${externalId}`,
            requestOptions: {
                method: 'delete',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            }
        }
    }

    createGet(url){
        return {
            url: url,
            requestOptions: {
                method: 'get',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            }
        }
    }
}

export default RequestDataFactory;