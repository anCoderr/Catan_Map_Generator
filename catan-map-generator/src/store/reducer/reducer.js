import * as actionTypes from '../actions/actionTypes';

const initialState = {
    mapObject: null,
}

const addMapObject = (state, action) => {
    const updatedState = {
        mapObject: action.mapObject,
    }
    return updatedState;
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_MAP_OBJECT: 
            return addMapObject(state, action);
        default: 
            return state;
    }
}

export default reducer;