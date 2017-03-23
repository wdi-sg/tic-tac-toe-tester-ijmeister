$(document).ready(function () {
  initiate()
  // alert(grid)
  $('.box').on('click', function () {
    // console.log($(this).attr('id').slice(3))
    var clickedIdx = $(this).attr('id').slice(3) - 1
    if (isPlayer1Turn()) {
      if(playTurn( clickedIdx )) {
        $(this).text('O')
        $('#message').text('Player 2\'s Turn [X]'  )
      } else {
        alert('invalid move')
        return false
      }
      // index = box id which user clicks

    } else {
      if( playTurn( clickedIdx ) ) {
        $(this).text('X')
        $('#message').text('Player 1\'s Turn [O]'  )
      } else {
        alert('invalid move')
        return false
      }
    }
    var winner = whoWon()
    if( winner !== 0) {
        $('#message').text('Player ' + winner + ' Wins! Click Restart!')
    }
    // console.log(whoWon())
    // console.log(isGameOver())
    // if isGameOver ()
    // show who who
  })

  $('#restartBtn').on('click', function () {
    $('.box').each(function( index ) {
      $(this).text('')
    })
    restart()
  })
})
