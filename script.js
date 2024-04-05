const gameContainer = (function () {
    const gameContainerElement = document.getElementById('game-container');
    let cells = []; // array containing cells;
    let turn = true; // true denotes X's turn, false denotes O's turn

    // create cell object
    function createCellObject(index, turn) {
        return {
            index,
            text: '',
            turn,
            displayText() {
                this.text = this.turn ? 'X' : 'O';
            }
        }
    }

    // create cell DOM element
    function createCellElement(cellObject) {
        let cell = document.createElement('div');
        cell.setAttribute('class', 'cell');
        cell.setAttribute('index', cellObject.index);
        cell.addEventListener('click', () => {
            cellObject.displayText();
            cell.innerHTML = cellObject.text;
        })
        return cell;
    }

    // populate game container grid by 9 cells
    function populateGrid() {
        for (let i = 0; i < 9; i++) {
            let cellObject = createCellObject(i, turn);
            cells.push(cellObject); // push each cell object to array
            gameContainerElement.appendChild(createCellElement(cellObject));
        }
    };
    populateGrid();

    // reset game
    const resetButton = document.getElementById()
})();

