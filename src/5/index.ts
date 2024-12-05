import fs from "fs"

const content = fs.readFileSync('input.txt', 'utf-8');

interface Rule {
    before: number,
    after: number,
}

const rules = content.split("\r\n").filter(word => word.indexOf("|") > -1)
const updates = content.split("\r\n").filter(word => word.indexOf(",") > -1)

const ruleList: Rule[] = rules.map(str => {
    return {before: Number(str.split("|")[0]), after: Number(str.split("|")[1])}
})
const updateList: number[][] = updates.map(values => values.split(",").map(value => Number(value)));
const toFilter: number[][] = Object.assign([], updateList);
for (let i = 0; i < updateList.length; i++) {
    const update = updateList[i];
    let invalid = false;
    for (let j = 0; j < update.length-1; j++) {
        const preCondition = update[j];
        for (let k = j + 1; k < update.length; k++) {
            const postCondition = update[k]
            invalid = ruleList.find(rule => rule.before === postCondition && rule.after === preCondition) !== undefined;
            if (invalid) {
                break;
            }
        }
        if (invalid) {
            break;
        }
    }
    if (invalid) {
        const index = toFilter.indexOf(update);
        toFilter.splice(index, 1);
    }
}
let middelsum = 0;
for (let i = 0; i < toFilter.length; i++) {
    const update = toFilter[i];
    middelsum += update[Math.round((update.length - 1) / 2)];

}
console.log(middelsum);

const incorrect:number[][] = updateList.filter(update => toFilter.indexOf(update) < 0);
for (let i = 0; i < incorrect.length; i++) {
    const incorrectUpdate = incorrect[i];
    for (let j = 0; j < incorrectUpdate.length-1; j++) {
        const preCondition = incorrectUpdate[j];
        for (let k = j+1; k < incorrectUpdate.length; k++) {
            const postCondition = incorrectUpdate[k]
            const invalid = ruleList.find(rule => rule.before === postCondition && rule.after === preCondition)
            if (invalid) {
                const temp = incorrectUpdate[j]
                incorrectUpdate[j] = incorrectUpdate[k]
                incorrectUpdate[k] = temp;
                j = 0;
            }
        }
    }
}
middelsum = 0;
for (let i = 0; i < incorrect.length; i++) {
    const update = incorrect[i];
    middelsum += update[Math.round((update.length - 1) / 2)];

}
console.log(middelsum);