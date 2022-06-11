const container = document.getElementById('container')

function makeGrid(rows, cols) {
    container.style.setProperty('--grid-rows', rows)
    container.style.setProperty('--grid-cols', cols)
    for (let i = 0; i < (rows * cols); i += 1) {
        let cell = document.createElement('div')
        cell.innerText = ''
        container.appendChild(cell).className = 'grid-item'
    }
}

makeGrid(3, 3)

let selection = 'x'
let nextSelection = {'x':'o', 'o':'x'}



function makeDisplay(){
const gridItems = document.querySelectorAll('.grid-item')

gridItems.forEach(selected => {
    function listener() {
        selected.innerText = `${selection}`
        selection=nextSelection[selection]
        selected.removeEventListener('click', listener)
    }
    selected.addEventListener('click', listener)
    })
}

makeDisplay()