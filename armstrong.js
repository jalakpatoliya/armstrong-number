const digitCount = (num) => {
    if (num === 0) return 1;
    return Math.floor(Math.log10(num)) + 1;
}

const getSum = (num, numOfDigits) => {
    let sum = 0;

    for (let i = 0; i < numOfDigits; i++) {
        const digit = Math.floor(num / Math.pow(10, i)) % 10;
        const digitPoweredToNumOfDigits = Math.pow(digit, numOfDigits);
        sum += digitPoweredToNumOfDigits;
    }

    return sum;
}

const getClosestHighestArmstrongNumber = (num) => {
    num += 1;

    while (!checkArmstrong(num)) {
        num++;
    }

    return num;
}

const getClosestLowestArmstrongNumber = (num) => {
    num -= 1;

    while (!checkArmstrong(num)) {
        num--;
    }

    return num;
}


const checkArmstrong = (num) => {

    // get number of digits
    const numOfDigits = digitCount(num);

    // get sum of the digits
    const sum = getSum(num, numOfDigits);

    return sum === num;
}

const getMemoryUsage = () => {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    return Math.round(used * 100) / 100
}


const armstrongNumbers = async (num) => {

    // To calculate process time
    const hrstart = process.hrtime()

    const isArmstrong = checkArmstrong(num)
    if (isArmstrong) {
        return {
            num,
            isArmstrong: true,
            memory: getMemoryUsage(),
            time_in_ms: process.hrtime(hrstart)[0] * 1000 + process.hrtime(hrstart)[1] / 1000000
        }
    }

    // getting closest lowest and highest armstrong num
    const highest = getClosestHighestArmstrongNumber(num);
    const lowest = getClosestLowestArmstrongNumber(num);

    return {
        num,
        isArmstrong: false,
        closest_highest_armstrong: highest,
        closest_lowest_armstrong: lowest,
        memory_in_mb: getMemoryUsage(),
        time_in_ms: process.hrtime(hrstart)[0] * 1000 + process.hrtime(hrstart)[1] / 1000000
    }
}


module.exports = armstrongNumbers;

