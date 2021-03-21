import React, { useEffect} from 'react';
import mapGenerator from '../Logic/MapGenerator';
import MapTile from '../Components/MapTile';

const Home = props => {
    let mapData = mapGenerator();
    
    return (
        <div>
            <MapTile/>
            Hey it works;
            {mapData.map(object => {
                return (
                    <div>
                        <p>{object.index + ' ' +  object.resource + ' ' + object.number}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default Home;