const padToTwo = (number) => (number <= 9 ? `0${number}` : number);

export const displayTime = (seconds) => {
    let minites = 0;

    if (seconds < 0) {
        seconds = 0;
    }

    if (seconds < 60) {
        return `00:${padToTwo(seconds)}`
    }

    let remainSeconds = seconds % 60;
    minites = seconds / 60;

    return `${padToTwo(minites)}:${padToTwo(remainSeconds)}`
}