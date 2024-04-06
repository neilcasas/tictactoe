const gameContainerElement = document.getElementById('game-container');
const restartBtn = document.getElementById('reset-button');
const statusText = document.querySelector('.status-text');
let cells = []; // array containing cell objects;
let player = true; // true denotes X's turn, false denotes O's turn
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// create cell object
function createCellObject(index, turn) {
    return {
        index,
        text: '',
        turn,
        getText() {
            return this.text;
        },
        setText(turn) {
            this.text = turn ? 'X' : 'O';
        },
        setTurn(turn) {
            this.turn = turn;
        }
    }
}

// create cell DOM element
function createCellElement(cellObject) {
    let cell = document.createElement('div');
    cell.setAttribute('class', 'cell');
    cell.setAttribute('index', cellObject.index);
    return cell;
}
// create game countainer
const gameContainer = (function () {
    // populate game container grid by 9 cells
    function initializeGame() {
        for (let i = 0; i < 9; i++) {
            let cellObject = createCellObject(i, player); // create a cell object with an index and turn initialized to true
            cells.push(cellObject); // push each cell object to array
            let cellElement = createCellElement(cellObject);
            cellElement.addEventListener('click', cellClicked); // every cell element clicked will invoke the cellClicked function
            gameContainerElement.appendChild(cellElement) // create cell DOM element corresponding to cell object
        }
        restartBtn.addEventListener('click', restartGame); // add eventListener to restart button
        statusText.textContent = `${player ? 'X' : 'O'}'s turn`; // initialize status text content
    };
    initializeGame();
})();

function cellClicked() {
    let cellIndex = this.getAttribute('index');
    // check if cell object at that index has a text
    if (cell[cellIndex].text != '') {
        return;
    }
    updateCell(); // else call updateCell()
}

function updateCell() {

}

function changePlayer() {

}

function checkWinner() {

}

function restartGame() {

}