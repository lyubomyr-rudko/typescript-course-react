export const sort = <T extends { position: number }>(arr: T[]): T[] => {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[0].position;
    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i].position < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...sort(right), arr[0], ...sort(left)];
};
