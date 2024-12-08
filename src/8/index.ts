import fs from "fs"

const content = fs.readFileSync('input.txt', 'utf-8');
const rows = content.split("\r\n")
const field = rows.map(row => row.split(""))
const antinodes = structuredClone(field);
for (let y = 0; y < field.length; y++) {
    for (let x = 0; x < field[y].length; x++) {
        function inBounds(v1:number,v2:number) {
            return ((v1 >= 0 && v1 < field[y].length) && (v2 >=0 && v2 < field.length))
        }
        if (field[y][x] === ".") {
            continue;
        } else {
            const antennaA = field[y][x]
            for (let y2 = 0; y2 < field.length; y2++) {
                for (let x2 = 0; x2 < field[y2].length; x2++) {
                    if (field[y2][x2] !== antennaA) {
                        continue;
                    }
                    if (y !== y2 && x !== x2) {
                        const antennaB = field[y2][x2]
                        const posA = {x: x-x2,y: y-y2}
                        const posB = {x: x2-x, y: y2-y}
                        const placeA = {x:x + posA.x, y: y + posA.y}
                        const placeB = {x:x2 + posB.x, y: y2 + posB.y}
                        if (inBounds(placeA.x,placeA.y)) {
                            antinodes[placeA.y][placeA.x] = '#'
                        }
                        if (inBounds(placeB.x,placeB.y)) {
                            antinodes[placeB.y][placeB.x] = '#'
                        }
                    }
                }
            }
        }
    }
}
let count = 0;
antinodes.forEach(row => row.forEach(char => char === '#' ? count++ : count))
console.log(count)
for (let y = 0; y < field.length; y++) {
    for (let x = 0; x < field[y].length; x++) {
        function inBounds(v1:number,v2:number) {
            return ((v1 >= 0 && v1 < field[y].length) && (v2 >=0 && v2 < field.length))
        }
        if (field[y][x] === ".") {
            continue;
        } else {
            const antennaA = field[y][x]
            for (let y2 = 0; y2 < field.length; y2++) {
                for (let x2 = 0; x2 < field[y2].length; x2++) {
                    if (field[y2][x2] !== antennaA) {
                        continue;
                    }
                    if (y !== y2 && x !== x2) {
                        const antennaB = field[y2][x2]
                        const posA = {x: x-x2,y: y-y2}
                        const posB = {x: x2-x, y: y2-y}
                        let placeA = {x:x + posA.x, y: y + posA.y}
                        let placeB = {x:x2 + posB.x, y: y2 + posB.y}
                        antinodes[y][x] = '#'
                        antinodes[y2][x2] = '#'
                        while (inBounds(placeA.x,placeA.y)) {
                            antinodes[placeA.y][placeA.x] = '#'
                            placeA = {x:placeA.x + posA.x, y: placeA.y + posA.y}
                        }
                        if (inBounds(placeB.x,placeB.y)) {
                            antinodes[placeB.y][placeB.x] = '#'
                            placeB = {x:placeB.x + posB.x, y: placeB.y + posB.y}
                        }
                    }
                }
            }
        }
    }
}
count = 0;
antinodes.forEach(row => row.forEach(char => char === '#' ? count++ : count))
console.log(count)