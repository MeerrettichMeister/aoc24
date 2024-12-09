import fs from "fs"
const content = fs.readFileSync('input.txt', 'utf-8');
const disk:string[] = [];
let fileId = 0;
for (let i = 0; i < content.length; i++) {
    const amount = Number(content[i]);
    if (i % 2 === 0) {
        for (let j = 0; j < amount; j++) {
            disk.push(fileId.toString(10))
        }
        fileId++;
    } else {
        for (let j = 0; j < amount; j++) {
            disk.push(".")
        }
    }
}
const orderedDisk = structuredClone(disk);
let backIndex = orderedDisk.length-1
for (let i = 0; i < backIndex; i++) {
    if (orderedDisk[i] === ".") {
        orderedDisk[i] = orderedDisk[backIndex]
        orderedDisk[backIndex] = "."
        while (orderedDisk[backIndex] === ".") {
            backIndex--
        }
    }
}
let checksum = 0;
for (let i = 0; i < orderedDisk.length; i++) {
    if (orderedDisk[i] !== ".") {
        checksum += i * Number(orderedDisk[i])
    }
}
console.log(checksum)
const fragmented = structuredClone(disk);
backIndex = fragmented.length-1
while (backIndex > 0) {
    let cursor = 0;
    let idCount = 1;
    while (fragmented[backIndex-idCount] === fragmented[backIndex]) {
        idCount++;
    }
    let dotCount = 0
    while (dotCount < idCount && cursor+idCount < backIndex){
        while (fragmented[cursor] !== ".") {
            cursor++;
        }
        dotCount = 1;
        while (fragmented[cursor+dotCount] === ".") {
            dotCount++;
        }
        if (dotCount < idCount) {
            cursor++
        }
    }
    if (dotCount >= idCount && cursor <backIndex) {
        for (let j = 0; j < idCount; j++) {
            fragmented[cursor+j] = fragmented[backIndex-j];
            fragmented[backIndex-j] = "."
        }
    } else {
        backIndex -= idCount;
    }
    while (fragmented[backIndex] === ".") {
        backIndex--
    }
}
checksum = 0;
for (let i = 0; i < fragmented.length; i++) {
    if (fragmented[i] !== ".") {
        checksum += i * Number(fragmented[i])
    }
}
console.log(checksum)