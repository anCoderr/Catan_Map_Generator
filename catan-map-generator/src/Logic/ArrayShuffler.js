const arrayShuffler = (array) => {
    for(let i = array.length-1; i>0; i--) {
        var date = new Date();
        let j = randomNumberGenerator(date.getTime()*date.getTime(), 2, 0, 3);
        console.log("Rand Working" + j);
        // let j = Math.floor(Math.random()*(i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const randomNumberGenerator = (seed, a, b, m) => {
    return (a * seed + b) % m;
}

export default arrayShuffler;