import fs from "fs"

const content = fs.readFileSync('input.txt', 'utf-8');
const wordGrid = content.split("\r\n").map(word => word.split(''));
const xmas = "XMAS";
const samx = "SAMX";
let count = 0;
for (let i = 0; i < wordGrid.length; i++) {
    for (let j = 0; j < wordGrid[i].length; j++) {
        if (wordGrid[i].length - j > 3) {
            const hor = wordGrid[i][j] + wordGrid[i][j + 1] + wordGrid[i][j + 2] + wordGrid[i][j + 3]
            if (hor === xmas || hor === samx) {
                count++;
            }
        }
        if (wordGrid.length - i > 3) {
            const vert = wordGrid[i][j] + wordGrid[i + 1][j] + wordGrid[i + 2][j] + wordGrid[i + 3][j]
            if (vert === xmas || vert === samx) {
                count++;
            }
        }
        if (wordGrid.length - i > 3 && wordGrid[i].length - j > 3) {
            const diag = wordGrid[i][j] + wordGrid[i + 1][j + 1] + wordGrid[i + 2][j + 2] + wordGrid[i + 3][j + 3]
            const antiDiag = wordGrid[i][j + 3] + wordGrid[i + 1][j + 2] + wordGrid[i + 2][j + 1] + wordGrid[i + 3][j]
            if (diag === xmas || diag === samx) {
                count++;
            }
            if (antiDiag === xmas || antiDiag === samx) {
                count++;
            }
        }

    }
}
console.log(count);

const mas = "MAS"
const sam = "SAM"
let count2 = 0;
for (let i = 0; i < wordGrid.length - 2; i++) {
    for (let j = 0; j < wordGrid[i].length - 2; j++) {
        const diag = wordGrid[i][j] + wordGrid[i + 1][j + 1] + wordGrid[i + 2][j + 2]
        const antiDiag = wordGrid[i + 2][j] + wordGrid[i + 1][j + 1] + wordGrid[i][j + 2]
        if ((diag === mas || diag === sam) && (antiDiag === mas || antiDiag === sam)) {
            count2++;
        }
    }
}
console.log(count2)