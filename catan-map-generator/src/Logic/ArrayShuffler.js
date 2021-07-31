const arrayShuffler = (array) => {
    for(let i = array.length-1; i>0; i--) {
        var date = new Date();
        let j = Math.floor(Math.random()*(i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export default arrayShuffler;