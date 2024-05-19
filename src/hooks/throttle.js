export const throttle = (callback, delay) => {
    let shouldWait = false;
    let lastArgs = null;

    return (...args) => {
        if (shouldWait) {
            lastArgs = args;

            return;
        }
        callback(...args);
        shouldWait = true;

        setTimeout(() => {
            if (lastArgs === null) {
                shouldWait = false;
            } else {
                shouldWait = false;
                callback(lastArgs);
                lastArgs = null;
            }
        }, delay);
    }
}