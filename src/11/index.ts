import fs from "fs"

const content = fs.readFileSync('input.txt', 'utf-8');
const numbers = content.split(" ").map(str => Number(str))
interface Stone {
    value: number;
    count: number;
}

function blink(numArr: number[]) {
    for (let i = 0; i < numArr.length; i++) {
        if (numArr[i] === 0) {
            numArr[i] = 1
        } else if (numArr[i].toString(10).length % 2 === 0) {
            const str = "" + numArr[i].toString(10)
            const left = str.substring(0, str.length / 2)
            const right = str.substring(str.length / 2, str.length)
            numArr[i] = Number(left);
            i++;
            numArr.splice(i, 0, Number(right))

        } else {
            numArr[i] = numArr[i] * 2024
        }
    }
}
const a1 = structuredClone(numbers)
for (let i = 0; i < 25; i++) {
    blink(a1)
}
console.log(a1.length)
let a2: Map<number,number> = new Map;
numbers.forEach(num => a2.set(num,1));
for (let i = 0; i < 75; i++) {
    const newMap:Map<number,number> = new Map;
    a2.forEach((value, number, map) => {
        if (number === 0) {
            newMap.set(1, (newMap.get(1) ?? +0) + (value))
        } else if (number.toString(10).length % 2 === 0) {
            const str = "" + number.toString(10)
            const left = Number(str.substring(0, str.length / 2))
            const right = Number(str.substring(str.length / 2, str.length))
            newMap.set(left, (newMap.get(left) ?? +0) + value)
            newMap.set(right, (newMap.get(right) ?? +0) + value)

        } else {
            newMap.set(number*2024,value);
        }
    })
    a2 = newMap;
}
let stoneSum = 0;
a2.forEach((value, key, map) => {
    stoneSum += value
})
console.log(stoneSum)
