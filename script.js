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
            let cellObject = createCellObject(i, player);
            cells.push(cellObject); // push each cell object to array
            gameContainerElement.appendChild(createCellElement(cellObject));
        }
        restartBtn.addEventListener('click', restartGame);
        statusText.textContent = `${player ? 'X' : 'O'}'s turn`;
    };
    initializeGame();
})();

const cellElements = document.querySelectorAll('.cell');


function cellClicked() {

}

function updateCell() {

}

function changePlayer() {

}

function checkWinner() {

}

function restartGame() {

}