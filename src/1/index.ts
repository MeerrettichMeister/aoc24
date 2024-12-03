import fs from "fs"
const content = fs.readFileSync('input.txt', 'utf-8');
let l:number[] = []
let r: number[] = []
content.split('\r\n').forEach(pair => {
    const x = Number(pair.split("   ")[0].trim());
    const y = Number(pair.split("   ")[1].trim());
    l.push(x);
    r.push(y);
})
l = l.sort();
r = r.sort();
//a
let distance = 0;
for (let i = 0; i < l.length; i++) {
    distance += Math.abs(l[i] - r[i]);
}

//b
let similarity = 0;
for (let i = 0; i < l.length; i++) {
    similarity += l[i] * r.filter(r => r === l[i]).length
}
console.log(distance)
console.log(similarity)