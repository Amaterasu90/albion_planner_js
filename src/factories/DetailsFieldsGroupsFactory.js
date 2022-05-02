import DetailsFieldGroup from "../components/modal/form/DetailsFieldGroup"

class DetailsFieldsGroupsFactory {
    create(list){
        return list.map(({...field},index) => (<DetailsFieldGroup key={index} {...field}/>));
    }
}

export default DetailsFieldsGroupsFactory;