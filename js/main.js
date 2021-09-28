let table = document.getElementById('grid-table');
for (let i = 0; i <= 40; i++) {

    table.innerHTML += `<tr id="${i}"></tr>`;

    for (let e = 0; e <= 60; e++) {
        let row = document.getElementById(i.toString());

        row.innerHTML += 
        `
            <td
                id="${i + '.' + e}"
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