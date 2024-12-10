import fs from "fs"
const content = fs.readFileSync('input.txt', 'utf-8');

interface Point {
    x: number
    y: number
}

const heightMap = content.split("\r\n").map(row => row.split("").map(char => Number(char)))
const height = heightMap.length
const width = heightMap[0].length
const peakSet = new Set();
function walk(point: Point) {
    const pos = heightMap[point.y][point.x]
    if (pos === 9) {
        peakSet.add("" + point.x + point.y)
    } else {
        const walkable:Point[] = []
        if (point.y-1 >=0 && (heightMap[point.y-1][point.x]-pos ===1)) {
            walkable.push({x:point.x, y: point.y-1})
        }
        if (point.y+1 < height && (heightMap[point.y+1][point.x]-pos ===1)) {
            walkable.push({x:point.x, y: point.y+1})
        }
        if (point.x-1 >=0 && (heightMap[point.y][point.x-1]-pos ===1)) {
            walkable.push({x:point.x-1, y: point.y})
        }
        if (point.x+1 < width && (heightMap[point.y][point.x+1]-pos === 1)) {
            walkable.push({x:point.x+1, y: point.y})
        }
        if (walkable.length > 0){
            for (let i = 0; i < walkable.length; i++) {
                walk(walkable[i])
            }
        }
    }
}
function walk2(point: Point) {
    const pos = heightMap[point.y][point.x]
    if (pos === 9) {
        peakSet.add({x: point.x, y:point.y})
    } else {
        const walkable:Point[] = []
        if (point.y-1 >=0 && (heightMap[point.y-1][point.x]-pos ===1)) {
            walkable.push({x:point.x, y: point.y-1})
        }
        if (point.y+1 < height && (heightMap[point.y+1][point.x]-pos ===1)) {
            walkable.push({x:point.x, y: point.y+1})
        }
        if (point.x-1 >=0 && (heightMap[point.y][point.x-1]-pos ===1)) {
            walkable.push({x:point.x-1, y: point.y})
        }
        if (point.x+1 < width && (heightMap[point.y][point.x+1]-pos === 1)) {
            walkable.push({x:point.x+1, y: point.y})
        }
        if (walkable.length > 0){
            for (let i = 0; i < walkable.length; i++) {
                walk2(walkable[i])
            }
        }
    }
}

let pathcount = 0;
for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        const pos = heightMap[y][x]
        if (pos === 0) {
            peakSet.clear();
            walk({x:x,y:y})
            pathcount += peakSet.size;
        }
    }
}
console.log(pathcount)
pathcount = 0;
for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        const pos = heightMap[y][x]
        if (pos === 0) {
            peakSet.clear();
            walk2({x:x,y:y})
            pathcount += peakSet.size;
        }
    }
}
console.log(pathcount)
