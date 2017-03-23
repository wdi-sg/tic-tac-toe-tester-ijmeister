/* Winning Logic
  [ 0 , 1 , 2 ]
  [ 3 , 4 , 5 ]
  [ 6 , 7 , 8 ]
  Top row => [ 0 , 1 , 2 ] x 3
  1st col => [ 0 , 3, 6 ] x 3
  cross => [ 0, 4, 8 ] x 2
*/

var grid = []
var winningLogics = [
  [ 0, 1, 2 ], [ 3, 4, 5 ], [ 6, 7, 8 ], // horizontal
  [ 0, 3, 6 ], [ 1, 4, 7 ], [ 2, 5, 8 ], // vertical
  [ 0, 4, 8 ], [ 2, 4, 6 ]               // cross
]

// initiate()

function initiate () {
  /*
  * set all values in grid to zeros
  * [ 0,0,0,0,0,0,0,0,0]
  */
  var i = 0
  while (i < 9) {
    grid[ i ] = 0
    i++
  }
}

function getGameProgress () {
  /*
  * count player moves so far
  */
  return grid.filter(ele => ele === 1 || ele === 2).length
}

function isPlayer1Turn () {
  /**
   * if number of moves is even, is player 1's turn'
   * for e.g. after 2 turns, player1's turn
   */
  return getGameProgress() % 2 === 0
}

function isEqualArrays (array1, array2) {
  /**
   * checks if two arrays have the same set of elements
   */
  for (var i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false
    }
  }
  return true
}

function arrayContainsArray (bigArray, smlArray) {
  /**
   * returns true if bigArray contains all elements in smlArray
   */
  for (var i = 0; i < smlArray.length; i++) {
    if (!bigArray.includes(smlArray[ i ])) {
      return false
    }
  }
  return true
}

function restart () {
  // reset the grid to all zeros
  initiate()
}

function playTurn (index) {
  /* It should take one parameter which is a zero-based index to your grid, indicating where the current player's token should be played.
  It should return a boolean value to indicate whether the move was allowed or not - true if it was successful, false otherwise e.g. if the square is already taken or the game is over.

  simulateGame [ 0, 3, 1, 4, 2 ] ==> grid = [ 1, 1, 1, 2, 2, 0, 0, 0, 0]
  */

  if (grid[ index ] !== 0 || isGameOver()) {
    return false
  } else {
    grid[ index ] = isPlayer1Turn() ? 1 : 2
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
    return whoWon() !== 0
  }
}

function whoWon () {
  /*
  It should return 0 if the game is not yet finished. Else it should return either 1 or 2 depending on which player one. It should return 3 if the game is a draw.
  */
  if (getGameProgress < 5) {
    return 0
  } else {
    // simulateGame [ 0, 3, 1, 4, 2 ] ==> grid = [ 1, 1, 1, 2, 2, 0, 0, 0, 0] => Player1 Wins
    // length of player moves >= 3
    // get the index of player moves and put into an array
    // if the array is in winningLogic, player1 is winner
    // repeat the same for next player

    if (grid.filter(ele => ele === 1).length >= 3) {
      if (checkifPlayerWin(1)) {
        return 1
      }
    }
    if (grid.filter(ele => ele === 2).length >= 3) {
      if (checkifPlayerWin(2)) {
        return 2
      }
    }
    if (getGameProgress() > 8) {
      return 3
    } else {
      return 0
    }
  }
}

function checkifPlayerWin (playerID) {
  /**
   * returns True if player wins based of existing moves in grid
   */
  // grid = [ 1, 1, 1, 2, 2, 0, 0, 0, 0] => [ 0 , 1 , 2 ]
  var playerMovesArray = grid.reduce(
    function (prev, ele, index) {
      if (ele === playerID) {
        prev.push(index)
      }
      return prev
    }, [])
  // console.log(playerMovesArray)
  if (isInWinningLogic(playerMovesArray)) {
    return true
  } else {
    // winning logic can occur in from turn 2 to turn 4 or turn 3 to turn 5
    // [5, 0, 1, 2]
    // [7. 8, 0, 1, 2]
    if (playerMovesArray.length > 3) {
      return isInWinningLogic(playerMovesArray.slice(1))
    }
    if (playerMovesArray.length > 4) {
      return isInWinningLogic(playerMovesArray.slice(2))
    }
    return false
  }
}

function isInWinningLogic_old (array1) {
  /**
   * compare player moves/index array with all the winning logics defined
   */
  for (var i = 0; i < winningLogics.length; i++) {
    var wLogic = winningLogics[i]
    if (isEqualArrays(array1, wLogic)) {
      // console.log("Matched with Winning Logic - " + i)
      return true
    } else {
      // only return false after going through all winning logics
      if (i === winningLogics.length - 1) {
        return false
      } else {
        continue
      }
    }
  }
}

function isInWinningLogic (array1) {
  /**
   * compare if winningLogic appears in the player moves array
   */
  for (var i = 0; i < winningLogics.length; i++) {
    var wLogic = winningLogics[i]
    if (arrayContainsArray(array1, wLogic)) {
       // console.log("Matched with Winning Logic - " + i)
      return true
    } else {
       // only return false after going through all winning logics
      if (i === winningLogics.length - 1) {
        return false
      } else {
        continue
      }
    }
  }
}
