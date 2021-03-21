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
        
        let indexIndex = getRandomIndex(indexArray.length-1);
        let resourceIndex = getRandomIndex(resourceArray.length-1);
        let numberIndex = getRandomIndex(numberArray.length-1);
        
        if(resourceArray[resourceIndex] === 'D') {
            mapData.push({
                index: indexArray[indexIndex],
                resource: resourceArray[resourceIndex],
                number: 7,
            });
            indexArray.splice(indexIndex, 1);
            resourceArray.splice(resourceIndex, 1);
        } else {
            mapData.push({
                index: indexArray[indexIndex],
                resource: resourceArray[resourceIndex],
                number: numberArray[numberIndex],
            });
            indexArray.splice(indexIndex, 1);
            resourceArray.splice(resourceIndex, 1);
            numberArray.splice(numberIndex, 1);
        }
    }
    return mapData;
}

const getRandomIndex = (max) => {
    return Math.floor(Math.random()*(max+1));
}

export default mapGenerator;