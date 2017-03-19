/* Winning Logic
  [ 0 , 1 , 2 ]
  [ 3 , 4 , 5 ]
  [ 6 , 7 , 8 ]
  Top row => [ 0 , 1 , 2 ] x 3
  1st col => [ 0 , 3, 6 ] x 3
  cross => [ 0, 4, 8 ] x 2
*/


var grid = []
var winningLogic = [
  [ 0, 1, 2 ], [ 3, 4, 5 ], [ 6, 7, 8 ], // horizontal
  [ 0, 3, 6 ], [ 1, 4, 7 ], [ 2, 5, 8 ], // vertical
  [ 0, 4, 8 ], [ 2, 4, 6 ]               // cross
]

initiate()

function initiate () {
  var i = 0
  while (i < 9) {
    grid[ i ] = 0
    i++
  }
}

function getGameProgress() {
  return grid.filter(ele => ele === 1 || ele === 2).length
}

function isPlayer1Turn (arr) {
  return getGameProgress % 2 === 0
}

function isEqualArrays (array1, array2) {
  for (var i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false
    }
  }
  return true
}

function restart () {
  //
}

function playTurn (index) {
  /* It should take one parameter which is a zero-based index to your grid, indicating where the current player's token should be played.
  It should return a boolean value to indicate whether the move was allowed or not - true if it was successful, false otherwise e.g. if the square is already taken or the game is over.
  */
  // index => player move
  // if index is already filled, return false
  // if gameo0ver, return false
  // else fill the index in with playerID and return true
  console.log(grid)
  if (grid[ index ] !== 0) {
    return false
  } else {
    grid[ index ] = isPlayer1Turn(grid) ? 1 : 2
    return true
  }
}

function isGameOver () {
  /*
  * if the game is not started yet, return false
  */

  if (grid.indexOf(1) === -1) {
    return false
  } else {
    return whoWon()
  }
}

function whoWon () {
  /*
  It should return 0 if the game is not yet finished. Else it should return either 1 or 2 depending on which player one. It should return 3 if the game is a draw.
  */
  if (getGameProgress < 5) {
    return 0
  } else {
    // if current grid has one of the wining logic, return playerID who won.
    // simulation = [0, 3, 1, 4, 2]
    // grid = [1,1,1,2,2]
    // length of player moves >= 3
    // get the index of player moves and put into an array
    // if the array is in winningLogic, player1 is winner
    // repeat the same for next player

    return false
  }
}
