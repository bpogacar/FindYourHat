const prompt = require('./node_modules/prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    // constructor for the field class that takes a 2D array and stores it
    constructor(field) {
        this.field = field;
        this.playerX = 0;
        this.playerY = 0;
    }

    // print method that prints out a string representation of the current state of the field
    print() {
        // for each row in the field, print it out as a string with no spaces between elements
        for (let i = 0 ; i < this.field.length ; i++) {
            console.log(this.field[i].join(""))
        };
    }

    // move the player to a new location, if a valid one return true, if invalid return false
    setLocation(x, y) {
        // check boundaries first
        if (x < 0 || y < 0 || x > this.field[0].length || y > this.field.length) {
            console.log("Whoops, looks like you moved out of bounds!");
            return false
        }

        // if its within the boundaries, determine outcome based on the tile its moving to
        switch (this.field[y][x]) {
            case hat:
                console.log("Congratulations, you found the hat");
                return false
            case hole:
                console.log("You landed in a hole and got stuck, better luck next time!");
                return false
            case pathCharacter:
                console.log("Uh oh, you already went that way!");
                return false
            default:
                this.playerX = x;
                this.playerY = y;
                this.field[y][x] = pathCharacter;
                return true;
        }
    }

    // method to randomly generate a field with a specified height, width
    generateField(height, width) {
        let needHat = true;
        let grid = [];
        for ( let i = 0 ; i < height ; i++ ) {
            grid[i] = [];
            for ( let j = 0 ; j < width ; j++ ) {
                if ( j == this.playerX && i == this.playerY ) {  // change default values of playerX and playerY to change start pos
                    grid[i][j] = pathCharacter;
                    continue;
                }
                let tile = this.randomTile(needHat);
                grid[i][j] = tile;
                if (tile == hat) {
                    needHat = false;
                }
            }
        }
        this.field = grid;
    }

    // method that randomly grabs a tile, it can only grab the hat if bool is true
    randomTile(needHat) {
        const tile = Math.floor(Math.random()*3);
        switch (tile) {
            case 0:
                return hole;
            case 1:
                return fieldCharacter;
            case 2:
                if (needHat) { return hat; }
                else { return fieldCharacter; }
        }
    }
}

// code for handling what happens when main.js is ran

// helper function for getting proper user input
const getInput = () => {
    // prompt user for directional input
    let direction = prompt('Which way would you like to move? ');  

    // ensure proper input
    while (direction != 'l' && direction != 'd' && direction != 'u' && direction != 'r') {
        direction = prompt('That is not a valid direction (Up = u, Down = d, Right = r, Left = l), please try another input. ');
    }

    return direction
}

// code should loop until the game is finished
let isOngoing = true;
// need to keep track of our current position, we start in the top left
let currX = 0;
let currY = 0;
// create the gameboard
const board = new Field([[]]);

const move = (direction) => {
    switch (direction) {
        case 'l':
            currX--;
            break;
        case 'r':
            currX++;
            break;
        case 'u':
            currY--;
            break;
        case 'd':
            currY++;
            break;
    }
}

// a method for gathering two integer inputs from the user and then generating the game board with them
const randomBoard = () => {
    let width;
    let height;
    let input;
    // get the width from the user
    console.log("Please specify the width you would like to play with.");
    input = prompt("> ");
    width = parseInt(input);

    while (isNaN(width)) {
        console.log("The width has to be a valid integer, please try again.");
        input = prompt("> ");
        width = parseInt(input);
    }

    // repeat the process for the height
    console.log("Please specify the height you would like to play with.");
    input = prompt("> ");
    height = parseInt(input);
    while (isNaN(height)) {
        console.log("The height has to be a valid integer, please try again.");
        input = prompt("> ");
        height = parseInt(input);
    }
    // generate game board
    board.generateField(height, width);
}

// ask the user for the dimensions of thier game board
randomBoard();

while(isOngoing) {
    // let the user view the current board
    board.print();

    // separate the board from the input question for visual clarity
    console.log("-------------");

    // get input from the user
    const direction = getInput();

    // make the move
    move(direction);

    // check validity of the move, if valid, keep going
    isOngoing = board.setLocation(currX, currY);

}

