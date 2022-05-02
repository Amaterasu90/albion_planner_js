import FormFieldGroup from "../components/modal/form/FormFieldGroup"

class FormFieldsGroupsFactory {
    create(list){
        return list.map(({...field},index) => (<FormFieldGroup key={index} {...field}/>));
    }
}

export default FormFieldsGroupsFactory;