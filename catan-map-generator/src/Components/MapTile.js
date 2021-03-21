import React from 'react';
import styles from './MapTile.module.css';
import lightsImg from '../assets.lights.png';

const MapTile = props => {
    return(
        <ul className={styles.Honeycomb}>
            <li className={styles.HoneycombCell}>
                <img className={styles.HoneycombCellImh} src={lightsImg}/>
            </li>
        </ul>
    );
}

export default MapTile;