import React from 'react';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';

import OpenProjectButton from './OpenProjectButton.js';
import SettingsMenu from './settings_menu/SettingsMenu.js';


/**
 * Function that returns the top bar of the application
 * @param {Object} props received parameters
 */
function TopBar(props) {
    const { t } = useTranslation();

    return (
        <AppBar position="static">
            <Toolbar>
                <Box>
                    <Button variant="contained" color="primary">{t("TopBar.NewButton")}</Button>
                    
                    <OpenProjectButton changeSelectedProject={props.changeSelectedProject}/>
                    
                    <Button variant="contained" color="primary">{t("TopBar.PlayButton")}</Button>
                    
                    <SettingsMenu/>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;
