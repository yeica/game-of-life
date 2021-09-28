// Draw grid 40*60

let table = document.getElementById('grid-table');
for (let row = 1; row <= 40; row++) {

    table.innerHTML += `<tr id="${row}"></tr>`;

    for (let column = 1; column <= 60; column++) {
        let rowElement = document.getElementById(row.toString());

        rowElement.innerHTML += 
        `
            <td
                id="${row + '.' + column}"
                class="cell dead">
            </td>
        `;
    }
}

// Adding onclick event to cells to change their status
document.querySelectorAll('.cell').forEach((element) => {
    element.addEventListener('click', () => {
        if (element.classList.contains('dead')){
            element.classList.replace('dead', 'live');
        }
        else {
            element.classList.replace('live', 'dead');
        }
    });
});

// Starting - Pausing the game
let btnStartPause = document.getElementById('btn-start-pause');
btnStartPause.addEventListener('click', () => {
    btnStartPause.innerHTML = changeGameStatus();
    startGame();
});

// Game status
let gameStatus = 'PAUSED';
function changeGameStatus(){
    gameStatus = gameStatus == 'PAUSED' ? 'PLAYING' : 'PAUSED';
    if (gameStatus == 'PAUSED'){
        return '&#9658;';
    }

    return '| |';
}

// Starting Game
function startGame() {
    if (gameStatus === 'PLAYING') {
        document.querySelectorAll('.live').forEach((element) => {
            console.log('hola')
        })
    }
}

// Cleaning the cells
let btnRestart = document.getElementById('btn-restart');
btnRestart.addEventListener('click', cleanCells);

function cleanCells() {
    document.querySelectorAll('.live').forEach((element) => {
        element.classList.replace('live', 'dead');
    })
}


