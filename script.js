const mainContainerElement = document.querySelector('.main-container');
const mainContentElement = document.querySelector('.main-content');
const descAreaWrapper = document.querySelector('.desc-area-wrapper');

// get player 1 and player 2 names
let player1, player2 = '';
const descriptionArea = (function () {
    const descriptionAreaDiv = document.createElement('div');
    descriptionAreaDiv.setAttribute('class', 'description-area');
    descriptionAreaDiv.textContent = 'Tic-Tac-Toe is a two-player game played on a 3x3 grid. One player is assigned "X" and the other "O". Players take turns marking a square on the grid with their respective symbol. The goal is to form a horizontal, vertical, or diagonal line of three of your symbols. The first player to achieve this wins the game. If all squares are filled without a winner, the game ends in a draw.';
    descAreaWrapper.appendChild(descriptionAreaDiv);
    return descriptionAreaDiv;
})();

// create input area container
const inputArea = (function () {
    const inputContainer = document.createElement('div');
    inputContainer.setAttribute('class', 'input-container');
    mainContentElement.appendChild(inputContainer);
    inputContainer.innerHTML = `
            <div class ="player-input">
            <div class="player1-input">
            <label for="player1">Player 1 name</label>
            <input type="text" class="player1" id="player1" placeholder = "Player 1" maxlength = "10">
            </div>
            <div class = "player2-input">
            <label for="player2">Player 2 name </label>
            <input type="text" class="player2" id="player2" placeholder = "Player 2" maxlength = "10">
            </div>
            </div>`;

    // create wrapper div for start button
    const startBtnWrapper = document.createElement('div');
    startBtnWrapper.setAttribute('class', 'start-btn-wrapper');
    inputContainer.appendChild(startBtnWrapper);

    // create start button
    const startBtn = document.createElement('button');
    startBtn.setAttribute('class', 'start-button');
    startBtn.textContent = 'Start Game';
    startBtnWrapper.appendChild(startBtn);

    startBtn.addEventListener('click', () => {
        let player1Name = document.querySelector('.player1').value.trim();
        let player2Name = document.querySelector('.player2').value.trim();
        if (player1Name.length == 0 || player2Name.length == 0) {
            alert('Both players must have a name.')
        } else {
            player1 = player1Name;
            player2 = player2Name;
            mainContentElement.removeChild(inputContainer);
            descAreaWrapper.removeChild(descriptionArea);
            playArea();
        }
    })
})
inputArea();

// create game container
const playArea = (function () {

    let cells = []; // array containing cell objects;
    let turn = true; // true denotes X's turn, false denotes O's turn
    let running = false; // denotes game state
    let win = false; // whether someone won or not

    // create play area element
    const playAreaElement = document.createElement('div');
    playAreaElement.setAttribute('class', 'play-area');
    mainContentElement.appendChild(playAreaElement);

    // create game container element
    const gameContainerElement = document.createElement('div');
    gameContainerElement.setAttribute('id', 'game-container');
    playAreaElement.appendChild(gameContainerElement);

    // create game info div
    const gameInfoElement = document.createElement('div');
    gameInfoElement.setAttribute('class', 'game-info');
    playAreaElement.appendChild(gameInfoElement);

    // create status text element
    const statusText = document.createElement('div');
    statusText.setAttribute('class', 'status-text');
    gameInfoElement.appendChild(statusText);

    // create play area button wrapper
    const playAreaBtnWrapper = document.createElement('div');
    playAreaBtnWrapper.setAttribute('class', 'play-btn-wrapper');
    gameInfoElement.appendChild(playAreaBtnWrapper);

    // create restart button 
    const restartBtn = document.createElement('button');
    restartBtn.setAttribute('class', 'reset-button');
    restartBtn.textContent = 'Reset';
    playAreaBtnWrapper.appendChild(restartBtn);

    // create new game button
    const newGameBtn = document.createElement('button');
    newGameBtn.setAttribute('class', 'new-game-button');
    newGameBtn.textContent = 'New Game';
    newGameBtn.addEventListener('click', newGame);
    playAreaBtnWrapper.appendChild(newGameBtn);

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
                    winningCells(condition); // change cells to winning cell class
                    disableCellAnimation();
                    running = false; // stop the game when someone has won
                    return;
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
                enableCellAnimation();
                return;
            }
        })
        if (tie) {
            statusText.textContent = 'Game is a tie!';
            disableCellAnimation();
            running = false;
            return;
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
        enableCellAnimation();
        running = true;
        statusText.textContent = `${turn ? player1 : player2}'s turn`
    }

    function newGame() {
        mainContentElement.removeChild(playAreaElement);
        inputArea();
        descAreaWrapper.appendChild(descriptionArea);
    }

    function enableCellAnimation() {
        cellElements.forEach(cellElement => {
            cellElement.classList.remove('disabled');
            cellElement.classList.remove('winning');
        })
    }

    function disableCellAnimation() {
        cellElements.forEach(cellElement => {
            cellElement.classList.add('disabled');
        })
    }
    // add the winning class to the cells with the win
    function winningCells(winningCellIndices) {
        for (let i = 0; i < winningCellIndices.length; i++) {
            let element = document.querySelector(`.cell[index="${winningCellIndices[i]}"]`);
            element.classList.add('winning');
        }
    }
});

// create footer element
const footerElement = (function () {
    const footerDiv = document.createElement('div');
    footerDiv.setAttribute('class', 'footer');

    const gitHubIcon = document.createElement('img');
    gitHubIcon.setAttribute('src', 'github.svg');
    gitHubIcon.setAttribute('alt', 'github-icon');
    gitHubIcon.setAttribute('id', 'github-icon');
    footerDiv.appendChild(gitHubIcon);

    const footerText = document.createElement('a');
    footerText.setAttribute('href', 'https://github.com/neilcasas')
    footerText.textContent = 'Created by Neil Casas';
    footerDiv.appendChild(footerText);

    mainContainerElement.appendChild(footerDiv);
})();