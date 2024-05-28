export default function calcScore(arrScoreTable) {
    return arrScoreTable.reduce((count, value) => value === true ? count + 1 : count, 0);
}

// // Example usage:
// let scoreTable = [false, true, false, true, false, false];
// let countTrue = countTrueInArray(scoreTable);
// console.log(countTrue); // Output: 2