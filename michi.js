const board = document.querySelector('#board')
const game_finished_element = document.querySelector('#game-finished')
const resetbutton = document.querySelector('#reset-button')
const winnerSymbol = document.querySelector('#winner')
let turn = true // true es para la X false para la O
let finished = false

const initial_matrix = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
]

let matrix = initial_matrix.map(row => [...row]);

const cells = document.querySelectorAll('.cell')

//Recorro todas las celdas para poder ir marcando y verificar si hay ganador
cells.forEach((cell, index) => {
  cell.addEventListener('click', function (event) {

    //Verifico que nop haya valor en el campo para  no sobreescribir
    if (cell.childNodes.length > 0) {
      return
    }

    const position = index + 1
    const tempRow = position / 3
    
    // Datos para la columna, para poder saber sobre que recuadro presiono 
    const n = Math.abs(tempRow)
    const decimal = n - Math.floor(n)
    const decimalOnString = decimal.toString()
    let column = 2

    if (decimalOnString.includes('.333')) {
      column = 0
    } else if (decimalOnString.includes('.666')) {
      column = 1
    }

    // Datos para la fila, para poder saber sobre que recuadro presiono
    let row = 0
    if (tempRow > 1 && tempRow <= 2) {
      row = 1
    } else if (tempRow > 2) {
      row = 2
    }

    //Asigno el marcador 'X' u 'O' al HTML y voy llenando la matriz
    const marker = getMarker(turn)
    event.target.innerHTML = marker
    matrix[row][column] = marker

    
    const has_winner = check(matrix)
    
    const allCellFilled = checkIfAllWasFilled()
    
    //si hay ganador o se lleno el tablero, reinicio y coloco el msj correspondiente.
    if (has_winner || allCellFilled) {
      winnerSymbol.innerHTML =  marker
      game_finished_element.classList.remove('d-none')
      board.classList.add('d-none')
      if (allCellFilled && !has_winner) {
        winnerSymbol.innerHTML = 'No hay ganador'
      }
    }
    
    turn = !turn
  });
})

//Verifica que simbolo colocar
function getMarker(value) {
  if (value) {
    return 'X'
  }
  return 'O'
}


//Evalua si hay un ganador, recorro la matrix para evaluar todas las combinaciones posibles
function check(temp_matrix) {
  for (let i = 0; i < 3; i++) {
    if (matrix[i][0] === matrix[i][1] && matrix[i][1] === matrix[i][2] && matrix[i][0] !== '') {
      return matrix[i][0];
    }
  }

  for (let j = 0; j < 3; j++) {
    if (matrix[0][j] === matrix[1][j] && matrix[1][j] === matrix[2][j] && matrix[0][j] !== '') {
      return matrix[0][j];
    }
  }

  if (matrix[0][0] === matrix[1][1] && matrix[1][1] === matrix[2][2] && matrix[0][0] !== '') {
    return matrix[0][0];
  }

  if (matrix[0][2] === matrix[1][1] && matrix[1][1] === matrix[2][0] && matrix[0][2] !== '') {
    return matrix[0][2];
  }

  return null;
}
 
//Verifica que no haya mas donde jugar
function checkIfAllWasFilled() {
  for (i = 0 ; i < 3; i++) {
    for (j = 0 ; j < 3 ; j++) {
      if (matrix[i][j] == '') return false
    }
  }
  return true
}


//Boton para reiniciar el tablero
resetbutton.addEventListener('click', function () {
  matrix = initial_matrix.map(row => [...row]);
  game_finished_element.classList.add('d-none')
  board.classList.remove('d-none')
  cells.forEach(cell => {
    cell.innerHTML = ''
  })
})