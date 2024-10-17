function negsPerRow(arr: number[][], rowIdx: number): Promise<string> {
    return new Promise((resolve, reject) => {
        if(arr.length > rowIdx ) {
            arr[rowIdx].filter((e) => {
                return e < 0;
            }).length > 0 ? resolve(`Found Evidence : ${arr[rowIdx]}`) : reject('Not Found')
        }
        else {
            reject(`Row Index ${rowIdx} must be within 0 and ${arr.length}`);
        }
    });
}

const array2D_3 = [
    [1, 2, 3],
    [4, 5, -6],
    [7, 8, 9]
];

const negsPerRowPromises: Promise<string>[] = [];

for(let x = 0; x < array2D_3.length; x++) {
    negsPerRowPromises.push(negsPerRow(array2D_3, x));
}

Promise.any(negsPerRowPromises)
    .then((results) => {
        console.log(results);
    })
    .catch((error) => console.log(`Error Msg: ${error}`));