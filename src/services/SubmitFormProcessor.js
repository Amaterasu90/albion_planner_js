import NestedListRetriever from "./NestedListDecorator";

class SubmitFormProcessor {
    constructor(listSelector, memberSelector, elementSelector, context, successCallback, failedCallback, subElementSelector) {
        this.listSelector = listSelector;
        this.memberSelector = memberSelector;
        this.elementSelector = elementSelector;
        this.context = context;
        this.successCallback = successCallback;
        this.failedCallback = failedCallback;
        this.subElementSelector = subElementSelector;
    }

    process = (submitContext) => {
        const data = new FormData(submitContext.target);
        const body = Object.fromEntries(data.entries());
        let entries = Object.entries(body);
        const decorator = new NestedListRetriever(body, entries, this.listSelector, this.memberSelector, this.elementSelector, this.subElementSelector);
        decorator.addNestedList();
        const options = this.context.requestData.requestOptions;
        options.body = JSON.stringify(body);
        const response = fetch(this.context.requestData.url, options);
        response.then(this.successCallback, this.failedCallback);
    }
}

export default SubmitFormProcessor;