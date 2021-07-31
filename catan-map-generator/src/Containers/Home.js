import React from 'react';
import mapGenerator from '../Logic/MapGenerator';
import Board from './Board';
import { connect } from 'react-redux';
import * as actions from '../store/actions/actions'
import Styles from './Home.module.css';

const Home = props => {
    const onGenerateClickHandler = () => {
        let mapData = mapGenerator();
        props.onAddMapObject(mapData);
    }
    
    return (
        <div className={Styles.totalBlock}>
            <div className={Styles.textBlock}>
                <h1>CATAN BOARD GENERATOR</h1>
                <h3>By anCoderr</h3>
                <a href="https://github.com/anCoderr" target="_blank">https://github.com/anCoderr</a>
                <br className={Styles.gap}/>
                <button onClick={onGenerateClickHandler}>Generate Map</button>
            </div>
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