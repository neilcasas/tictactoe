const mainContainer = document.querySelector('.main-container');

// get player 1 and player 2 names
let player1, player2 = '';

// create input area container
const inputArea = (function () {
    const inputContainer = document.createElement('div');
    inputContainer.setAttribute('class', '.input-container');
    mainContainer.appendChild(inputContainer);
    inputContainer.innerHTML = `<label for="player1">Player 1 name: </label>
            <input type="text" class="player1">
            <label for="player2">Player 2 name: </label>
            <input type="text" class="player2">
            <button class="start-button">Start Game</button>`;
    const startBtn = document.querySelector('.start-button');
    startBtn.addEventListener('click', () => {
        player1 = document.querySelector('.player1').value.trim();
        player2 = document.querySelector('.player2').value.trim();
        mainContainer.removeChild(inputContainer);
        playArea();
    })
})
inputArea();

// create game container
const playArea = (function () {

    // create play area element
    const playAreaElement = document.createElement('div');
    playAreaElement.setAttribute('class', 'play-area');
    mainContainer.appendChild(playAreaElement);

    // create game container element
    const gameContainerElement = document.createElement('div');
    gameContainerElement.setAttribute('id', 'game-container');
    playAreaElement.appendChild(gameContainerElement);
    let cells = []; // array containing cell objects;
    let turn = true; // true denotes X's turn, false denotes O's turn
    let running = false; // denotes game state
    let win = false; // whether someone won or not

    // create status text element
    const statusText = document.createElement('div');
    statusText.setAttribute('class', 'status-text');
    playAreaElement.appendChild(statusText);

    // create restart button 
    const restartBtn = document.createElement('button');
    restartBtn.setAttribute('class', 'reset-button');
    restartBtn.textContent = 'Reset';
    playAreaElement.appendChild(restartBtn);

    // create new game button
    const newGameBtn = document.createElement('button');
    newGameBtn.setAttribute('class', 'new-game-button');
    newGameBtn.textContent = 'New Game';
    newGameBtn.addEventListener('click', newGame);
    playAreaElement.appendChild(newGameBtn);

    // win conditions for tictactoe game
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
            let cellObject = createCellObject(i, turn); // create a cell object with an index and turn initialized to true
            cells.push(cellObject); // push each cell object to array
            let cellElement = createCellElement(cellObject);
            cellElement.addEventListener('click', cellClicked); // every cell element clicked will invoke the cellClicked function
            gameContainerElement.appendChild(cellElement) // create cell DOM element corresponding to cell object
        }
        running = true // start game
        restartBtn.addEventListener('click', restartRound); // add eventListener to restart button
        statusText.textContent = `${turn ? player1 : player2}'s turn`
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
        cells[cellIndex].setText(`${turn ? 'X' : 'O'}`);

        // update cell DOM object text
        cellElement.textContent = cells[cellIndex].getText();
        changePlayer(); // change player upon clicking
    }

    function changePlayer() {
        turn = turn ? false : true; // toggle between x and o
        // update status text
        statusText.textContent = `${turn ? player1 : player2}'s turn`
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
                    statusText.textContent = `${firstCell.getText() == 'X' ? player1 : player2}` + " is the winner!";
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
            // check one cell has no text, making tie condition false
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
    function restartRound() {
        cells.forEach(cell => {
            cell.setText('');
        })
        cellElements.forEach(cellElement => {
            let cellIndex = cellElement.getAttribute('index');
            cellElement.textContent = cells[cellIndex].getText();
        })
        running = true;
        statusText.textContent = `${turn ? player1 : player2}'s turn`
    }

    function newGame() {
        mainContainer.removeChild(playAreaElement);
        inputArea();
    }
});