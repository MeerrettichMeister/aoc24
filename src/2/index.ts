import fs from "fs"
const content = fs.readFileSync('input.txt', 'utf-8');
const reports: string[] = content.split("\r\n");
let safeAmount = 0;
reports.forEach(report => {
    const levels = report.split(" ").map(number => Number.parseInt(number))
    let safe = true;
    for (let i = 1; i < levels.length; i++) {
        const dist = levels[i] - levels[i - 1];
        if (dist > 3 || dist === 0 || dist < -3) {
            safe = false;
            break;
        }
    }
    for (let i = 1; i < levels.length - 1; i++) {
        if (levels[i - 1] < levels[i] && levels[i] > levels[i+1]){
            safe = false;
            break
        }
        if (levels[i - 1] > levels[i] && levels[i] < levels[i+1]){
            safe = false;
            break
        }
    }
    safe ? safeAmount += 1 : safeAmount +=0
})
console.log(safeAmount)
let dampendSafeAmount = 0;
reports.forEach(report => {
    const levels = report.split(" ").map(number => Number.parseInt(number))
    if (checkSafety(levels)) {
        dampendSafeAmount += 1;
    }else {
        for (let i = 0; i < levels.length; i++) {
            const spliced = levels.filter((value, index) => index !== i);
            if (checkSafety(spliced)){
                dampendSafeAmount += 1;
                break
            }
        }
    }
})
console.log(dampendSafeAmount);

function checkSafety(levels:number[]): boolean {
    let safe = true;
    for (let i = 1; i < levels.length; i++) {
        const dist = levels[i] - levels[i - 1];
        if (dist > 3 || dist === 0 || dist < -3) {
            safe = false;
            break;
        }
    }
    for (let i = 1; i < levels.length - 1; i++) {
        if (levels[i - 1] < levels[i] && levels[i] > levels[i + 1]) {
            safe = false;
            break
        }
        if (levels[i - 1] > levels[i] && levels[i] < levels[i + 1]) {
            safe = false;
            break
        }
    }
    return safe;
}

