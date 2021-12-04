class VisualisationDecorator {
    constructor(data){
        this.data = data;
    }

    addAllowShowComplexData(){
        this.data = this.data.map((item) => {
            const keys = Object.keys(item);
            for (const key of keys) {
                item[key] = item[key] !== null && item[key] !== 'undefined' && (typeof item[key] === 'object' || Array.isArray(item[key])) ? JSON.stringify(item[key]) : item[key];
            }

            return item;
        });
    }
}

export default VisualisationDecorator;