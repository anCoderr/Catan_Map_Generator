import React from 'react';
import mapGenerator from '../Logic/MapGenerator';
import Board from './Board';
import { connect } from 'react-redux';
import * as actions from '../store/actions/actions'

const Home = props => {
    const onGenerateClickHandler = () => {
        let mapData = mapGenerator();
        props.onAddMapObject(mapData);
    }
    
    return (
        <div>
            <button onClick={onGenerateClickHandler}>Generate Map</button>
            {props.mapObject ? props.mapObject.map(object => {
                return (
                    <div key={object.index}>
                        <p>{object.index + ' ' +  object.resource + ' ' + object.number}</p>
                    </div>
                );
            }) : null}
            <Board/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        mapObject: state.mapObject,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddMapObject: (mapObject) => dispatch(actions.addMapObject(mapObject))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);