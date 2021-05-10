import * as actionTypes from './actionTypes';

export const addMapObject = (mapObject) => {
    return {
        type: actionTypes.ADD_MAP_OBJECT,
        mapObject: mapObject,
    }
}