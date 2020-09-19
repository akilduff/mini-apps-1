// === Counter of X's versus O's ===
var totalXWins = 0;
var totalOWins = 0;
var turnCounter = true;
var clickCounter = 0;

function turn() {
  if (turnCounter) {
    turnCounter = !turnCounter
    return "X"
  } else {
    turnCounter = !turnCounter
    return "O"
  }
}

document.getElementById("board").addEventListener('click', function (e) {
  marker = turn()
  e.target.innerHTML = marker;
  e.target.setAttribute('class', marker)
})

// === Winning scenarios ===

document.onclick = (() => {
  var Xs = document.getElementsByClassName("X")
  var xArray = [];
  for (var key in Xs) {
    if (typeof Xs[key] === 'object') {
      xArray.push(Number(Xs[key].id));
    }
  }

  var Os = document.getElementsByClassName("O")
  var oArray = [];
  for (var key in Os) {
    if (typeof Os[key] === 'object') {
      oArray.push(Number(Os[key].id));
    }
  }

  var winningLayouts = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]
  ]
  for (var i = 0; i < winningLayouts.length; i++) {
    if (winningLayouts[i].every(box => xArray.includes(box))) {
      document.getElementById("result").innerHTML = "X WINS!";
      totalXWins++
      document.getElementById("titles").innerHTML = `X has ${totalXWins} wins, O has ${totalOWins} wins`;
      turnCounter = true
    }
    if (winningLayouts[i].every(box => oArray.includes(box))) {
      document.getElementById("result").innerHTML = "O WINS!";
      totalOWins++
      document.getElementById("titles").innerHTML = `X has ${totalXWins} wins, O has ${totalOWins} wins`;
      turnCounter = false
    }
  }
  clickCounter++

  if (clickCounter === 9) {
    document.getElementById("result").innerHTML = "ITS A DRAW"
  }
})


// === Reset Gameboard ===

document.getElementById('reset').onclick = function changeContent() {
  var button = document.querySelectorAll("button");
  button.forEach((button) => {
    button.innerHTML = " "
    button.setAttribute("class", "grid-item")
  })
  document.getElementById("result").innerHTML = "Let's get it started"
  clickCounter = -1
  xArray = [];
  oArray = [];
}