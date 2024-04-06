const gameContainerElement = document.getElementById('game-container');
let cells = []; // array containing cells;
let turn = true; // true denotes X's turn, false denotes O's turn
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
    cell.addEventListener('click', () => {
        cellObject.setText(turn);
        cell.textContent = cellObject.text;
    })
    return cell;
}
// create game countainer
const gameContainer = (function () {
    // populate game container grid by 9 cells
    function populateGrid() {
        for (let i = 0; i < 9; i++) {
            let cellObject = createCellObject(i, turn);
            cells.push(cellObject); // push each cell object to array
            gameContainerElement.appendChild(createCellElement(cellObject));
        }
    };
    populateGrid();
})();