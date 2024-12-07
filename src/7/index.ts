import fs from "fs"
const content = fs.readFileSync('input.txt', 'utf-8');
const rows = content.split("\r\n")
interface Calc {
    result: number,
    numbers: number[],
}

const calculations = rows.map(row => {
    const res = Number(row.split(":")[0]);
    const tail = row.split(":")[1].trim();
    const num = tail.split(" ").map(numStr => Number(numStr));
    return {result: res, numbers: num}
})
let calcualtable = 0;
calculations.forEach(calculation => {
    const operations = calculation.numbers.length-1;
    const table = []
    const max = Math.pow(2,operations)
    for (let i = 0; i < max ; i++) {
        let toPush = (max-(i+1)).toString(2)
        while (toPush.length < operations) toPush = "0" + toPush;
        table.push(toPush.split("").map(str => Number(str)));
    }
    for (let c = 0; c < table.length; c++) {
        const combination = table[c];
        const calcTable = structuredClone(calculation.numbers);
        for (let i = 0; i < calcTable.length-1; i++) {
            if (combination[i] === 0) {
                calcTable[i+1] = calcTable[i] + calcTable[i+1]
            } else {
                calcTable[i+1] = calcTable[i] * calcTable[i+1]
            }
        }
        if (calculation.result === calcTable[calcTable.length-1]) {
            calcualtable += calculation.result;
            break;
        }
    }
})
console.log(calcualtable)
calcualtable = 0;
calculations.forEach(calculation => {
    const operations = calculation.numbers.length-1;
    const table = []
    const max = Math.pow(3,operations)
    for (let i = 0; i < max ; i++) {
        let toPush = (max-(i+1)).toString(3)
        while (toPush.length < operations) toPush = "0" + toPush;
        table.push(toPush.split("").map(str => Number(str)));
    }
    for (let c = 0; c < table.length; c++) {
        const combination = table[c];
        const calcTable = structuredClone(calculation.numbers);
        for (let i = 0; i < calcTable.length-1; i++) {
            if (combination[i] === 0) {
                calcTable[i+1] = calcTable[i] + calcTable[i+1]
            } else if (combination[i] === 1) {
                calcTable[i+1] = calcTable[i] * calcTable[i+1]
            } else {
                calcTable[i+1] = Number("" + calcTable[i] + calcTable[i+1])
            }
        }
        if (calculation.result === calcTable[calcTable.length-1]) {
            calcualtable += calculation.result;
            break;
        }
    }
})
console.log(calcualtable)