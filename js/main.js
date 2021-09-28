// THANK YOU https://github.com/HungryTurtleCode/gameoflife

// ---------- GLOBAL VARIABLES ----------

const ROWS = 40;
const COLS = 60;
let message = document.getElementById('message');
let grid = buildGrid();

// ---------- FUNCTIONS AND EVENTS ----------

// Creating cells and grid filled with dead cells
function buildGrid() {

    let table = document.getElementById('grid-table');

    for (let row = 0; row < ROWS; row++) {
        table.innerHTML += `<tr id="${row}"></tr>`

        for (let col = 0; col < COLS; col++) {
            let rowElement = document.getElementById(row);

            rowElement.innerHTML +=
                `
                <td
                    id="${row + '.' + col}"
                    class="dead">
                </td>
            `;
        }
    }

    return new Array(ROWS).fill(0)
        .map(() => new Array(COLS).fill(0));
}

// Change cell class and value when user clicks on it
document.querySelectorAll('td').forEach((cell) => {
    cell.addEventListener('click', () => {
        let cellCoordinates = getCellCoordinates(cell.id);
        if (cell.classList.contains('dead')) {
            grid[cellCoordinates[0]][cellCoordinates[1]] = 1;
            cell.classList.replace('dead', 'live');
        }
        else {
            grid[cellCoordinates[0]][cellCoordinates[1]] = 0;
            cell.classList.replace('live', 'dead');
        }
    });
});

function getCellCoordinates(cell_id) {
    let dotPosition = Array.from(cell_id).indexOf('.');
    let row = cell_id.slice(0, dotPosition);
    let col = cell_id.slice(dotPosition + 1 - cell_id.length);
    return [row, col];
}

// Buttons events
document.getElementById('btn-start').addEventListener('click', startGame);
document.getElementById('btn-restart').addEventListener('click', restartGame);

function startGame() {
    if (document.getElementsByClassName('live').length != 0) {
        message.textContent = ''
        setTimeout(
            () => {
                grid = nextGen(grid);
                updateVisualGrid();
                startGame()
            }, 300
        )
    }
    else {
        message.textContent = 'All cells are dead.'
    }
}

function restartGame() {
    message.textContent = '';

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            grid[row][col] = 0
        }
    }
    
    Array.from(document.getElementsByClassName('live')).forEach((cell) => { 
        cell.classList.replace('live', 'dead');
    })
}

// Getting next grid
function nextGen(grid) {
    const nextGen = grid.map(arr => [...arr]);

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            const cell = grid[row][col];
            let numNeighbours = 0;
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    const x_cell = row + i;
                    const y_cell = col + j;

                    if (x_cell >= 0 && y_cell >= 0 && x_cell < ROWS && y_cell < COLS) {
                        const currentNeighbour = grid[row + i][col + j];
                        numNeighbours += currentNeighbour;
                    }
                }
            }

            // rules
            if (cell === 1 && numNeighbours < 2) {
                nextGen[row][col] = 0;
            } else if (cell === 1 && numNeighbours > 3) {
                nextGen[row][col] = 0;
            } else if (cell === 0 && numNeighbours === 3) {
                nextGen[row][col] = 1;
            }
        }
    }
    return nextGen;
}

// Updating table cells colors
function updateVisualGrid() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            let cell = document.getElementById(row + '.' + col);

            grid[row][col] == 0 ? cell.classList.replace('live', 'dead') : cell.classList.replace('dead', 'live');
        }
    }
}