import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faSpinner } from '@fortawesome/fontawesome-free-solid';

class RequirementsInfoButton extends React.Component {
    render = () => {
        const { visible, model, index, view } = this.props;
        return visible
            ? <Button size="lg" className="btn-block" style={{ "borderRadius": "0px 10px 10px 0px" }} onClick={() => { this.props.onOpenRequirements(view, model.recipes[index], model.returnRate); }}>
                {view.requirements.loading ? <FontAwesomeIcon icon={faSpinner} /> : <FontAwesomeIcon icon={faClipboardList} />}
            </Button>
            : null
    }
}

export default RequirementsInfoButton;