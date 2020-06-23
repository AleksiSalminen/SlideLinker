import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';


/**
 * Function that returns the button for switching to presentation view
 * @param {Object} props received parameters
 */
function PlayProjectButton(props) {
    const { t } = useTranslation();
    
    const [disabled, setDisabled] = useState(props.selectedProject == undefined);

    if(disabled && props.selectedProject !== undefined) {
        setDisabled(false);
    }
    else if(!disabled && props.selectedProject === undefined) {
        setDisabled(true);
    }

    const playPresentation = () => {
        if(props.selectedProject !== undefined) {
            props.setActiveView(props.PRESENTATION_VIEW);
        }
    }

    return (
        <Button
            disabled={disabled}
            variant="contained"
            color="primary"
            style={{margin:"0.25rem"}}
            onClick={playPresentation}
        >
            {t("TopBar.PlayButton")}
        </Button>
    );
}

export default PlayProjectButton;