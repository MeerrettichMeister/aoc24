import fs from "fs"

const content = fs.readFileSync('input.txt', 'utf-8');
const multiplies = content.match(/mul[\(]\d+,\d+[\)]/gm)
let sum = 0;
multiplies?.forEach(mult => {
    const numbers = mult.match(/\d+/gm);
    if (numbers) {
        const x = Number(numbers.at(0));
        const y = Number(numbers.at(1));
        sum += (x*y);
    }
})
console.log(sum)

const filtered = content.replace(/don't[(][)].*?do[(][)]/gsm,"")
const filteredMultiplies = filtered.match(/mul[\(]\d+,\d+[\)]/gm)
let filteredSum = 0;
filteredMultiplies?.forEach(mult => {
    const numbers = mult.match(/\d+/gm);
    if (numbers) {
        const x = Number(numbers.at(0));
        const y = Number(numbers.at(1));
        filteredSum += (x*y);
    }
})
console.log(filteredSum)
