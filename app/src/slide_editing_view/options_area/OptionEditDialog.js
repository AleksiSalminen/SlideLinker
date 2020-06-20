import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import SlidesTable from './slides_table/SlidesTable.js';


/**
 * Function that returns the option editing dialog
 * @param {Object} props received parameters
 */
function OptionEditDialog(props) {
    const [title, setTitle] = useState(null);
    const [endPoint, setEndPoint] = useState(null);

    const findSlide = (slideArray, endPointToFind) => {
        for(let i = 0; i < slideArray.length; i++) {
            if(slideArray[i]['id'] === endPointToFind) {
                return slideArray[i];
            }
        }
        return null;
    }

    if((title === null || endPoint === null) && props.option) {
        setTitle(props.option.title);

        const endPointSlide = findSlide(props.slides, props.option.endpoint_id);
        setEndPoint(endPointSlide);
    }

    const updateTitle = (event) => {
        setTitle(event.target.value);
    }

    return (
        <Dialog open={props.open} onClose={props.closeDialog} style={{ padding: "0.5rem" }}>
            <Box style={{ padding: "1rem" }}>
                <TextField label="Title" value={title} onChange={updateTitle} />

                <br/><br/>
                <Typography>{ "End point: " + (endPoint ? endPoint.heading : "") }</Typography>
                <SlidesTable slides={props.slides} setEndPoint={setEndPoint} />
            </Box>
        </Dialog>
    );
}

export default OptionEditDialog;
