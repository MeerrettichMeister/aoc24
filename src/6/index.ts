import fs from "fs"
import {writeFileSync} from "node:fs";

interface Point {
    x: number,
    y: number,
}

interface Helper {
    visited: boolean
    direction: string
}

enum Direction {
    UP,
    RIGHT,
    DOWN,
    LEFT,
}

class Board {
    public posisiton: Point = {x: 0, y: 0};
    public board: string[][];
    public visited: string[][];
    public dir = Direction[0];
    public sizeX = 0;
    public sizeY = 0;

    constructor(input: string) {
        this.board = input.split("\r\n").map(row => row.split(''))
        this.sizeX = this.board[0].length - 1;
        this.sizeY = this.board.length - 1
        for (let i = 0; i < this.sizeY; i++) {
            for (let j = 0; j < this.sizeX; j++) {
                if (this.board[i][j] === "\^") {
                    this.posisiton = {x: j, y: i}
                    this.board[i][j] = ".";
                }
            }
        }
        this.visited = structuredClone(this.board)
        this.visited[this.posisiton.y][this.posisiton.x] = '?';
    }

    public move() {
        switch (this.dir) {
            case "UP": {
                this.posisiton.y--
                break;
            }
            case "RIGHT": {
                this.posisiton.x++
                break;
            }
            case "DOWN": {
                this.posisiton.y++
                break;
            }
            case "LEFT": {
                this.posisiton.x--
                break;
            }
        }
    }

    public nextDir() {
        switch (this.dir) {
            case "UP": {
                this.dir = Direction[1]
                break;
            }
            case "RIGHT": {
                this.dir = Direction[2]
                break;
            }
            case "DOWN": {
                this.dir = Direction[3]
                break;
            }
            case "LEFT": {
                this.dir = Direction[0]
                break;
            }
        }
    }
}

const content = fs.readFileSync('input.txt', 'utf-8');
const board1 = new Board(content);
let outOfBounds = false;
let path: Point[] = []
while (!outOfBounds) {
    let free = false
    while (!free) {
        switch (board1.dir) {
            case "UP": {
                if (board1.posisiton.y - 1 < 0 || board1.board[board1.posisiton.y - 1][board1.posisiton.x] === '#') {
                    board1.nextDir();
                } else {
                    free = true;
                }
                break;
            }
            case "RIGHT": {
                if (board1.posisiton.x + 1 > board1.sizeX || board1.board[board1.posisiton.y][board1.posisiton.x + 1] === '#') {
                    board1.nextDir();
                } else {
                    free = true;
                }
                break;
            }
            case "DOWN": {
                if (board1.posisiton.y + 1 > board1.sizeY || board1.board[board1.posisiton.y + 1][board1.posisiton.x] === '#') {
                    board1.nextDir();
                } else {
                    free = true;
                }
                break;
            }
            case "LEFT": {
                if (board1.posisiton.x - 1 < 0 || board1.board[board1.posisiton.y][board1.posisiton.x - 1] === '#') {
                    board1.nextDir();
                } else {
                    free = true;
                }
                break;
            }
        }
    }
    path.push({x: board1.posisiton.x, y: board1.posisiton.y})
    board1.move();
    board1.visited[board1.posisiton.y][board1.posisiton.x] = '?';
    if (!(board1.posisiton.x < board1.sizeX && board1.posisiton.x > 0 && board1.posisiton.y < board1.sizeY && board1.posisiton.y > 0)) {
        outOfBounds = true;
    }

}
let count = 0;
board1.visited.forEach(row => row.forEach(stop => stop === '?' ? count++ : count))
console.log(count)
//Bruteforce
const board2 = new Board(content);
let obsCounter = 0;
for (let i = 0; i < board2.sizeY + 1; i++) {
    for (let j = 0; j < board2.sizeX + 1; j++) {
        const field = new Board(content)
        if ((i === field.posisiton.y && j === field.posisiton.x)) {
            continue;
        }
        if (field.board[i][j] === '#') {
            continue;
        }
        field.board[i][j] = '#'
        field.visited[i][j] = '#'
        const visited: Helper[][] = Array(field.sizeY+1).fill(undefined).map(() => Array(field.sizeX+1).fill({
            visited: false,
            direction: undefined
        }))
        let limit = false;
        let outOfBounds = false;
        while (!outOfBounds) {
            let free = false;
            while (!free) {
                switch (field.dir) {
                    case "UP": {
                        if (field.posisiton.y - 1 < 0) {
                            outOfBounds = true;
                            free = true;
                        } else if (field.board[field.posisiton.y - 1][field.posisiton.x] === '#') {
                            field.nextDir();
                        } else {
                            free = true;
                        }
                        break;
                    }
                    case "RIGHT": {
                        if (field.posisiton.x + 1 > field.sizeX) {
                            outOfBounds = true;
                            free = true;
                        } else if (field.board[field.posisiton.y][field.posisiton.x + 1] === '#') {
                            field.nextDir();
                        } else {
                            free = true;
                        }
                        break;
                    }
                    case "DOWN": {
                        if (field.posisiton.y + 1 > field.sizeY) {
                            outOfBounds = true;
                            free = true;
                        } else if (field.board[field.posisiton.y + 1][field.posisiton.x] === '#') {
                            field.nextDir();
                        } else {
                            free = true;
                        }
                        break;
                    }
                    case "LEFT": {
                        if (field.posisiton.x - 1 < 0) {
                            outOfBounds = true;
                            free = true;
                        } else if (field.board[field.posisiton.y][field.posisiton.x - 1] === '#') {
                            field.nextDir();
                        } else {
                            free = true;
                        }
                        break;
                    }
                }
            }
            if (visited[field.posisiton.y][field.posisiton.x].visited && visited[field.posisiton.y][field.posisiton.x].direction === field.dir) {
                limit = true;
                break;
            }
            visited[field.posisiton.y][field.posisiton.x] = {visited: true, direction: field.dir}
            field.visited[field.posisiton.y][field.posisiton.x] = '?';
            field.move();
            if (!(field.posisiton.x < field.sizeX && field.posisiton.x >= 0 && field.posisiton.y < field.sizeY && field.posisiton.y >= 0)) {
                outOfBounds = true;
            }

        }
        if (limit) {
            board2.board[i][j] = "O"
            // let output = "";
            // field.visited.forEach(row => {
            //     row.forEach(char => output = output.concat(char))
            //     output = output.concat('\n');
            // })
            // writeFileSync(`out\\output${i}${j}.txt`,output);
            obsCounter++;
        }
    }
}
console.log(obsCounter);
path.splice(0, 1);
// let obsCounter = 0;
// for (const point of path) {
//     const field = new Board(content);
//     if (field.posisiton.x === point.x && field.posisiton.y === point.y) {
//         continue;
//     }
//     field.board[point.y][point.x] = '#'
//     field.visited[point.y][point.x] = '#'
//     const visited: Helper[][] = Array(field.sizeY + 1).fill(undefined).map(() => Array(field.sizeX + 1).fill({
//         visited: false,
//         direction: undefined
//     }))
//     let limit = false;
//     let outOfBounds = false;
//     while (!outOfBounds) {
//         let free = false;
//         while (!free) {
//             switch (field.dir) {
//                 case "UP": {
//                     if (field.posisiton.y - 1 < 0) {
//                         outOfBounds = true;
//                         free = true;
//                     } else if (field.board[field.posisiton.y - 1][field.posisiton.x] === '#') {
//                         field.nextDir();
//                     } else {
//                         free = true;
//                     }
//                     break;
//                 }
//                 case "RIGHT": {
//                     if (field.posisiton.x + 1 > field.sizeX) {
//                         outOfBounds = true;
//                         free = true;
//                     } else if (field.board[field.posisiton.y][field.posisiton.x + 1] === '#') {
//                         field.nextDir();
//                     } else {
//                         free = true;
//                     }
//                     break;
//                 }
//                 case "DOWN": {
//                     if (field.posisiton.y + 1 > field.sizeY) {
//                         outOfBounds = true;
//                         free = true;
//                     } else if (field.board[field.posisiton.y + 1][field.posisiton.x] === '#') {
//                         field.nextDir();
//                     } else {
//                         free = true;
//                     }
//                     break;
//                 }
//                 case "LEFT": {
//                     if (field.posisiton.x - 1 < 0) {
//                         outOfBounds = true;
//                         free = true;
//                     } else if (field.board[field.posisiton.y][field.posisiton.x - 1] === '#') {
//                         field.nextDir();
//                     } else {
//                         free = true;
//                     }
//                     break;
//                 }
//             }
//         }
//         if (visited[field.posisiton.y][field.posisiton.x].visited && visited[field.posisiton.y][field.posisiton.x].direction === field.dir) {
//             limit = true;
//             break;
//         }
//         visited[field.posisiton.y][field.posisiton.x] = {visited: true, direction: field.dir}
//         field.visited[field.posisiton.y][field.posisiton.x] = '?';
//         field.move();
//         if (!(field.posisiton.x < field.sizeX && field.posisiton.x >= 0 && field.posisiton.y < field.sizeY && field.posisiton.y >= 0)) {
//             outOfBounds = true;
//         }
//
//     }
//     if (limit) {
//         obsCounter++;
//     }
// }
// console.log(obsCounter);