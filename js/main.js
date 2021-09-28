// Draw grid 40*60

let table = document.getElementById('grid-table');
for (let row = 0; row <= 40; row++) {

    table.innerHTML += `<tr id="${row}"></tr>`;

    for (let column = 0; column <= 60; column++) {
        let rowElement = document.getElementById(row.toString());

        rowElement.innerHTML += 
        `
            <td
                id="${row + '.' + column}"
                class="cell">
            </td>
        `;
    }
}

document.querySelectorAll('.cell').forEach((element) => {
    element.addEventListener('click', () => {
        element.style.backgroundColor = 'var(--fill-color)';
    });
});