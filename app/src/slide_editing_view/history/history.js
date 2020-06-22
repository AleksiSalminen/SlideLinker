import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

import store from '../../state/reducers/mainReducers.js';
import * as actions from '../../state/actions/historyActions.js';


const history = store.getState().operationsHistory;

let undoStack = history.pastOperations.undoStack;
let redoStack = history.futureOperations.redoStack;
let lastOperation = history.lastOperation.operation;

export const addOperation = (operation, newValue, oldValue) => {
    undoStack.push({operation: operation, value: oldValue});
    store.dispatch(actions.updateUndoStack(undoStack));
    lastOperation = {operation: operation, value: newValue};
    store.dispatch(actions.updateLastOperation(lastOperation));
    store.dispatch(actions.updateRedoStack([]));
}

export const emptyHistory = () => {
    store.dispatch(actions.updateUndoStack([]));
    store.dispatch(actions.updateRedoStack([]));
    store.dispatch(actions.updateLastOperation({operation: null, value: null}));
}


/**
 * Function that returns the undo button component
 * @param {Object} props received parameters
 */
export function UndoButton(props) {
    const [disabled, setDisabled] = useState(undoStack.length === 0);

    const undo = () => {
        if(undoStack.length > 0) {
            redoStack.push(lastOperation);
            store.dispatch(actions.updateRedoStack(redoStack));
            lastOperation = undoStack.pop();
            store.dispatch(actions.updateLastOperation(lastOperation));
            lastOperation.operation(lastOperation.value);
        }
    }

    return (
        <Button variant="outlined" disabled={false} style={{ margin:"0.25rem" }} onClick={undo}>
            Undo
        </Button>
    );
}

/**
 * Function that returns the redo button component
 * @param {Object} props received parameters
 */
export function RedoButton(props) {

    const redo = () => {
        if(redoStack.length > 0) {
            undoStack.push(lastOperation);
            store.dispatch(actions.updateUndoStack(undoStack));
            lastOperation = redoStack.pop();
            store.dispatch(actions.updateLastOperation(lastOperation));
            lastOperation.operation(lastOperation.value);
        }
    }

    return (
        <Button variant="outlined" style={{ margin:"0.25rem" }} onClick={redo}>
            Redo
        </Button>
    );
}
