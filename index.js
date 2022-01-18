// IDEA: Let user input how many points they want to play to.

// Create variables for the game state
let player1Score = 0;
let player2Score = 0;
let player1Turn = true;

// TODO: Let player choose the winning score. This must be set prior to playing the game.

// Create variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById("player1Dice");
const player2Dice = document.getElementById("player2Dice");
const player1Scoreboard = document.getElementById("player1Scoreboard");
const player2Scoreboard = document.getElementById("player2Scoreboard");
const message = document.getElementById("message");
const rollBtn = document.getElementById("rollBtn");
const riskBtn = document.getElementById("riskBtn");
const resetBtn = document.getElementById("resetBtn");
const gambleBtn = document.getElementById("gambleBtn");

function showResetButton() {
  rollBtn.style.display = "none";
  riskBtn.style.display = "none";
  gambleBtn.style.display = "none";
  resetBtn.style.display = "block";
}

/* Hook up a click event listener to the Roll Dice Button. */
rollBtn.addEventListener("click", function () {
  const randomNumber = Math.floor(Math.random() * 6) + 1;

  if (player1Turn) {
    player1Score += randomNumber;
    player1Scoreboard.textContent = player1Score;
    player1Dice.textContent = randomNumber;
    player1Dice.classList.remove("active");
    player2Dice.classList.add("active");
    message.textContent = "Player 2 Turn";
  } else {
    player2Score += randomNumber;
    player2Scoreboard.textContent = player2Score;
    player2Dice.textContent = randomNumber;
    player2Dice.classList.remove("active");
    player1Dice.classList.add("active");
    message.textContent = "Player 1 Turn";
  }

  if (player1Score >= 20) {
    message.textContent = "Player 1 Won 🥳";
    showResetButton();
  } else if (player2Score >= 20) {
    message.textContent = "Player 2 Won 🎉";
    showResetButton();
  }
  player1Turn = !player1Turn;
});

// RISK Button multiplies the dice by two, subtracts that amount, or adds/subtracts nothing.

riskBtn.addEventListener("click", function () {
  const randomNumber = Math.floor(Math.random() * 6) + 1;
  const riskCalc = [0, randomNumber * 2, -randomNumber];
  const riskNumber = riskCalc[Math.floor(Math.random() * 3)];

  if (player1Turn) {
    player1Score += riskNumber;
    player1Scoreboard.textContent = player1Score;
    player1Dice.textContent = randomNumber;
    player1Dice.classList.remove("active");
    player2Dice.classList.add("active");
    message.textContent = "Player 2 Turn";
  } else {
    player2Score += riskNumber;
    player2Scoreboard.textContent = player2Score;
    player2Dice.textContent = randomNumber;
    player2Dice.classList.remove("active");
    player1Dice.classList.add("active");
    message.textContent = "Player 1 Turn";
  }

  if (player1Score >= 20) {
    message.textContent = "Player 1 Won 🥳";
    showResetButton();
  } else if (player2Score >= 20) {
    message.textContent = "Player 2 Won 🎉";
    showResetButton();
  }
  player1Turn = !player1Turn;
});

// GAMBLE button: either doubles your score or resets your score to 0
//  If the return causes the entire gambleBtn to stop running, I might ahve to place zero1() and zero2() functions inside a different function zero() and define that outside this EventListener block, and call zero() in it's place. Test this first!
gambleBtn.addEventListener("click", function () {
  function zero1() {
    if (player1Score < 0) {
      return player1Score;
    } else {
      return 0;
    }
  }
  function zero2() {
    if (player2Score < 0) {
      return player2Score;
    } else {
      return 0;
    }
  }
  const gambleCalc = [zero1(), player1Score * 2];
  const gambleNumber = gambleCalc[Math.floor(Math.random() * 2)];
  const gambleCalc2 = [zero2(), player2Score * 2];
  const gambleNumber2 = gambleCalc2[Math.floor(Math.random() * 2)];
  // Can I put an IF statement within an IF statement? (I need to include IF the score is less than 0, to keep it there). Or put a function in place of [player1Score * 0]! Use return!

  if (player1Turn) {
    player1Score = gambleNumber;
    player1Scoreboard.textContent = player1Score;
    player1Dice.textContent = "--";
    player1Dice.classList.remove("active");
    player2Dice.classList.add("active");
    message.textContent = "Player 2 Turn";
  } else {
    player2Score = gambleNumber2;
    player2Scoreboard.textContent = player2Score;
    player2Dice.textContent = "--";
    player2Dice.classList.remove("active");
    player1Dice.classList.add("active");
    message.textContent = "Player 1 Turn";
  }

  if (player1Score >= 20) {
    message.textContent = "Player 1 Won 🥳";
    showResetButton();
  } else if (player2Score >= 20) {
    message.textContent = "Player 2 Won 🎉";
    showResetButton();
  }
  player1Turn = !player1Turn;
});

// Reset Button and Function

resetBtn.addEventListener("click", function () {
  reset();
});

function reset() {
  player1Score = 0;
  player2Score = 0;
  player1Turn = true;
  player1Scoreboard.textContent = 0;
  player2Scoreboard.textContent = 0;
  player1Dice.textContent = "-";
  player2Dice.textContent = "-";
  message.textContent = "Player 1 Turn";
  resetBtn.style.display = "none";
  rollBtn.style.display = "block";
  riskBtn.style.display = "block";
  gambleBtn.style.display = "block";
  player2Dice.classList.remove("active");
  player1Dice.classList.add("active");
}

// Win Reset Button and Function
