const gameContainerElement = document.getElementById('game-container');
const restartBtn = document.getElementById('reset-button');
const statusText = document.querySelector('.status-text');

// create game container
const gameContainer = (function () {
    let cells = []; // array containing cell objects;
    let player = true; // true denotes X's turn, false denotes O's turn
    let running = false; // denotes game state
    let win = false;
    const winConditions = [
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
    function createCellObject(index) {
        return {
            index,
            text: '',
            getText() {
                return this.text;
            },
            setText(text) {
                this.text = text;
            },
        }
    }

    // create cell DOM element
    function createCellElement(cellObject) {
        let cell = document.createElement('div');
        cell.setAttribute('class', 'cell');
        cell.setAttribute('index', cellObject.index);
        return cell;
    }
    // populate game container grid by 9 cells
    function initializeGame() {
        for (let i = 0; i < 9; i++) {
            let cellObject = createCellObject(i, player); // create a cell object with an index and turn initialized to true
            cells.push(cellObject); // push each cell object to array
            let cellElement = createCellElement(cellObject);
            cellElement.addEventListener('click', cellClicked); // every cell element clicked will invoke the cellClicked function
            gameContainerElement.appendChild(cellElement) // create cell DOM element corresponding to cell object
        }
        running = true // start game
        restartBtn.addEventListener('click', restartGame); // add eventListener to restart button
        statusText.textContent = `${player ? 'X' : 'O'}'s turn`
    };
    initializeGame();

    function cellClicked() {
        let cellIndex = this.getAttribute('index');
        // check if cell object at that index has a text
        if (cells[cellIndex].text != '' || running == false) {
            return;
        }
        updateCell(this, cellIndex); // else call updateCell()
        checkTie(); // check tie upon clicking
        checkWinner(); // check winner upon clicking
    }

    function updateCell(cellElement, cellIndex) {
        // update cell object's text
        cells[cellIndex].setText(`${player ? 'X' : 'O'}`);

        // update cell DOM object text
        cellElement.textContent = cells[cellIndex].getText();
        changePlayer(); // change player upon clicking
    }

    function changePlayer() {
        player = player ? false : true; // toggle between x and o
        // update status text
        statusText.textContent = `${player ? 'X' : 'O'}'s turn`
    }

    function checkWinner() {
        // check each winning condition
        for (let i = 0; i < winConditions.length; i++) {
            let condition = winConditions[i];

            const firstCell = cells[condition[0]];
            const secondCell = cells[condition[1]];
            const thirdCell = cells[condition[2]];

            // check if atleast one cell is empty
            const cellsEmptyCondition = () => {
                let emptyCondition = false;
                for (let j = 0; j < condition.length; j++) {
                    let currentCell = cells[condition[j]];
                    if (currentCell.getText() == '') {
                        emptyCondition = true;
                        break;
                    }
                }
                return emptyCondition;
            }

            // if all of the cells have content
            if (!cellsEmptyCondition()) {
                if (firstCell.getText() == secondCell.getText() && secondCell.getText() == thirdCell.getText()) {
                    statusText.textContent = `${firstCell.getText()} is the winner!`;
                    win = true;
                    running = false; // stop the game when someone has won
                } else {
                    continue;
                }
            }
        }
    }

    function checkTie() {
        let tie = win ? false : true;
        cells.forEach(cell => {
            if (cell.getText().length == 0 || cell.getText() == '') {
                tie = false;
                return;
            }
        })
        if (tie) {
            statusText.textContent = 'Game is a tie!';
            running = false;
        }
    }
    const cellElements = document.querySelectorAll('.cell');

    // remove text content and set running to true 
    function restartGame() {
        cells.forEach(cell => {
            cell.setText('');
        })
        cellElements.forEach(cellElement => {
            let cellIndex = cellElement.getAttribute('index');
            cellElement.textContent = cells[cellIndex].getText();
        })
        running = true;
        statusText.textContent = `${player ? 'X' : 'O'}'s turn`
    }
})();
