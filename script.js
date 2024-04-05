const gameContainer = (function () {
    const gameContainerElement = document.getElementById('game-container');

    // create single cell
    function createCell(index) {
        let cell = document.createElement('div');
        cell.setAttribute('class', 'cell');
        cell.setAttribute('index', index);
        cell.addEventListener('click', () => {
            cell.textContent = "X";
        })
        return cell;
    }

    // populate game container grid by 9 cells
    function populateGrid() {
        for (let i = 0; i < 9; i++) {
            gameContainerElement.appendChild(createCell(i));
        }
    };
    populateGrid();
})();

