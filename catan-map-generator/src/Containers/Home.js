import React, { useEffect} from 'react';
import mapGenerator from '../Logic/MapGenerator';

const Home = props => {
    let mapData = mapGenerator();
    useEffect(() => {
        console.log("map generated" + mapData);
    }, [mapData]);
    
    return (
        <div>
            Hey it works;
            {mapData.map(object => {
                
            })}
        </div>
    );
}

export default Home;