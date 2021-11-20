import FieldGroup from "../components/modal/form/FieldGroup"

class FormFieldsGroupsFactory {
    create(list){
        return list.map(({...field},index) => (<FieldGroup key={index} {...field}/>));
    }
}

export default FormFieldsGroupsFactory;