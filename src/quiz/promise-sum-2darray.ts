function sumRow(arr: number[][], rowIdx: number): Promise<number> {
    return new Promise((resolve, reject) => {
        if (arr.length > rowIdx) {
            setTimeout(() => {
                let sum = 0;
                for (let i = 0; i < arr[rowIdx].length; i++) {
                    sum += arr[rowIdx][i];
                }
                resolve(sum);
            }, 0);
        } else {
            reject(`Row Index ${rowIdx} must be within 0 and ${arr.length}`);
        }
    });
}

async function calculateSum(numArr: number[][]) {
    if (numArr.length === 0) {
        throw 'Cannot calculate sum of an empty array';
    }
    const rowSumPromises = [];
    for (let x = 0; x < numArr.length; x++) {
        rowSumPromises.push(sumRow(numArr, x));
    }
    try {
        const rowSums = await Promise.all(rowSumPromises);
        let sum = 0;
        rowSums.forEach(rowSum => {
            sum += rowSum;
        });
        console.log(`Sum = ${sum}`);
        return 'done';
    } catch (error) {
        console.log(`Error Msg: ${error}`);
        return 'failed';
    }
}

const array2D_1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
calculateSum(array2D_1).then((status) => console.log(status));
calculateSum([]).catch((error) => console.log(error));