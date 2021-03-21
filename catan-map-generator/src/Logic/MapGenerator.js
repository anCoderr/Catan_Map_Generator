import arrayShuffler from './ArrayShuffler';

const mapGenerator = () => {
    let indexArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
    let resourceArray = ['H','H','H','H','P','P','P','P','F','F','F','F','S','S','S','C','C','C','D']; 
    let numberArray = [2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12];
    let mapData = [];
    for(let i = 0; i<19; i++) {        
        arrayShuffler(indexArray);
        arrayShuffler(resourceArray);
        arrayShuffler(numberArray);
        let indexIndex = getRandomIndex(indexArray.length);
        let resourceIndex = getRandomIndex(indexArray.length);
        let numberIndex = getRandomIndex(indexArray.length);
        mapData.push({
            index: indexArray[indexIndex],
            resource: resourceArray[resourceIndex],
            number: numberArray[numberIndex],
        });
        delete indexArray[indexIndex];
        delete resourceArray[resourceIndex];
        delete numberArray[numberIndex];
    }
    return mapData;
}

const getRandomIndex = (max) => {
    return Math.floor(Math.random()*(max+1));
}

export default mapGenerator;