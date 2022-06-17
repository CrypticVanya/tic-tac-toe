const container = document.getElementById('container')
const statusDisplay = document.querySelector('.game-status')
let gameBoard = ['', '', '', '', '', '', '', '', ''] 
let gameActive = true
let currentPlayer = 'x'


function makeGrid(rows, cols) {
    container.style.setProperty('--grid-rows', rows)
    container.style.setProperty('--grid-cols', cols)
    for (let i = 0; i < (rows * cols); i += 1) {
        let cell = document.createElement('div')
        cell.innerText = ''
        container.appendChild(cell).className = 'grid-item'
        container.appendChild(cell).setAttribute('data-cell', i)
    }
}

makeGrid(3, 3)

//let winnerSelection = [box_1, box_2, box_3, box_4, box_5, box_6, box_7, box_8, box_9]


function winningMessage() {
    return `player ${currentPlayer} has won`
}

function drawMessage() {
    return `Game ended a draw`
}

function currentPlayerTurn() {
    return `it's ${currentPlayer}'s turn`
}

statusDisplay.innerHTML = currentPlayerTurn()



function changePlayer() {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x'
    statusDisplay.innerHTML = currentPlayerTurn() 
}



function handleSlots(clickedSlot, clickedSlotIndex) {
    gameBoard[clickedSlotIndex] = currentPlayer
    clickedSlot.innerHTML = currentPlayer
}



const winningSelection = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]



function results() {
    let hasWon = false
    for (let i = 0; i <= 7; i++) {
        const winner = winningSelection[i]
        let a = gameBoard[winner[0]]
        let b = gameBoard[winner[1]]
        let c = gameBoard[winner[2]]

        if (a === '' || b === '' || c === '') {
            continue;
        } 
        if (a === b && b === c) {
            hasWon = true
            break;
        } 
    }
    
    if (hasWon) {
            statusDisplay.innerHTML = winningMessage()
            gameActive = false
            return
        }

        let roundDraw = !gameBoard.includes("")
        if (roundDraw) {
            statusDisplay.innerHTML = drawMessage()
            gameActive = false
            return
        }
    changePlayer()
}

function listener(doesntClick) {
    const clickedSlot = doesntClick.target
    const clickedSlotIndex = parseInt(clickedSlot.getAttribute('data-cell'))

    if (gameBoard[clickedSlotIndex] !== "" || !gameActive) {
        return
    }

    handleSlots(clickedSlot, clickedSlotIndex)
    results()
}


document.querySelectorAll('.grid-item').forEach(selected => selected.addEventListener('click', listener))