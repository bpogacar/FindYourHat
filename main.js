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

    // method to randomly generate a field with a specified height, width, and hole percentage
    static generateField(height, width, percentage) {
        return
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
const board = new Field([
    [pathCharacter, fieldCharacter, hole],
    [fieldCharacter, hole, fieldCharacter],
    [fieldCharacter, hat, fieldCharacter]
]);

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

