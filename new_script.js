'use strict';

//! Selecting DOM elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const winningScoreInput = document.getElementById('winning-score');
const winnerPlayerEl = document.querySelector('.winner-player');
const leaderboardPopup = document.getElementById('leaderboard-popup');
const leaderboardList = document.getElementById('leaderboard-list');

const diceEl = document.querySelector('#dice--1');
const diceEl2 = document.querySelector('#dice--2');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const restartBtnEl = document.querySelector('#restart');
const leadersBtnEl = document.querySelector('#leaderboard');

//$ Starting conditions
let scores, currentScore, activePlayer, playing;

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  diceEl2.classList.add('hidden');

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  winnerPlayerEl.textContent = '';
  btnRoll.disabled = false;
  btnHold.disabled = false;
}

//* Listeners for different events 
window.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('player-modal');
  const overlay = document.querySelector('.overlay');
  const startBtn = document.getElementById('start-game-btn');

  const player1Name = document.getElementById('name--0');
  const player2Name = document.getElementById('name--1');
  const finalScoreInput = document.querySelector('.final-score');

  // Show modal
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');

  // Start game handler
  startBtn.addEventListener('click', () => {
    const name1 = player1Input.value.trim() || 'Player 1';
    const name2 = player2Input.value.trim() || 'Player 2';
    const winningScore = winningScoreInput.value.trim();

    player1Name.textContent = name1;
    player2Name.textContent = name2;
    if (winningScore) finalScoreInput.value = winningScore;
    finalScoreInput.innerHTML = `Winning Score: <span style='font-size:1.4em'>${
      winningScore || 100
    }</span>`;

    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    init(); // Initialize the game
  });
});

//* Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (!playing) return; // Prevent rolling if the game is over

  // 1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  const dice2 = Math.trunc(Math.random() * 6) + 1;

  // 2. Display the dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  diceEl2.classList.remove('hidden');
  diceEl2.src = `dice-${dice2}.png`;

  // 3. Check for rolled 1: if true, switch to next player
  if (dice !== 1 || dice2 !== 1) {
    currentScore += dice + dice2;

    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    // Switch to next player
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  if (!playing) return; // Prevent rolling if the game is over

  let winningScore = document.querySelector('.final-score').value;
  winningScore ? (winningScore = parseInt(winningScore)) : (winningScore = 100);

  scores[activePlayer] += currentScore;
  const playerOne =
    player1Input.value.trim() === '' ? 'Player 1' : player1Input.value.trim();
  const playerTwo =
    player2Input.value.trim() === '' ? 'Player 2' : player2Input.value.trim();
  const winnerPlayer = activePlayer === 0 ? playerOne : playerTwo;
  if (scores[activePlayer] >= winningScore) {
    winner(winnerPlayer);
    playing = false;
    diceEl.classList.add('hidden');
    diceEl2.classList.add('hidden');
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
restartBtnEl.addEventListener('click', function () {
  window.location.reload();
  init();
});

leadersBtnEl.addEventListener('click', () => {
  const isHidden = leaderboardPopup.classList.contains('hidden');

  if (isHidden) {
    renderLeaderboardPopup();
    leaderboardPopup.classList.remove('hidden');
  } else {
    leaderboardPopup.classList.add('hidden');
  }
});

function switchPlayer() {
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  activePlayerClassToggle();
}

function activePlayerClassToggle() {
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

function winner(winnerPlayer) {
  winnerPlayerEl.textContent = `Player ${winnerPlayer} Wins!`;
  diceEl.classList.add('hidden');

  storeWinner(winnerPlayer);

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  diceEl.classList.add('hidden');
  btnRoll.disabled = true;
  btnHold.disabled = true;
}

//! store winner record in a local storage
function storeWinner(winnerName) {
  const key = `wins:${winnerName}`;
  const currentWins = localStorage.getItem(key);

  if (currentWins) {
    localStorage.setItem(key, parseInt(currentWins, 10) + 1);
  } else {
    localStorage.setItem(key, 1);
  }
}

//* get all winner stats from local storage
function getSortedWinners() {
  console.log(Object.keys(localStorage).filter(key => key.startsWith('wins:')));
  const keys = Object.keys(localStorage).filter(key => key.startsWith('wins:'));
  if (keys.length === 0) {
    return [{ name: 'No winners yet', wins: 0 }];
  }

  const winners = keys
    .map(key => ({
      name: key.replace('wins:', ''),
      wins: parseInt(localStorage.getItem(key), 10),
    }))
    .sort((a, b) => b.wins - a.wins); // Sort descending

  return winners;
}

function renderLeaderboardPopup() {
  const winners = getSortedWinners();
  leaderboardList.innerHTML = winners
    .map((w, i) => `<li>${++i}. ${w.name}: ${w.wins}</li>`)
    .join('');
}


//! Keyboard controls for the game and global events
document.addEventListener('keydown', function (e) {
  if (!playing && e.key?.toLowerCase() !== 'q') return; // ignore if game is over unless Q

  switch (e.key) {
    case 'Enter':
      document.querySelector('.btn--roll')?.click();
      break;
    case 'Escape':
      leaderboardPopup.classList.add('hidden');
      break;
    case 'w':
    case 'W':
      document.querySelector('.btn--hold')?.click();
      break;
    case 'r':
    case 'R':
      init();
      break;
    case 'q':
    case 'Q':
      document.querySelector('.btn--new')?.click();
      break;
    case 'r':
    case 'R':
      document.querySelector('#restart')?.click();
      break;
  }
});

// Hide on outside click
document.addEventListener('click', (event) => {
  const target = event.target

  const clickedOutside = !leaderboardPopup.contains(target) && !leadersBtnEl.contains(target);

  if (clickedOutside) {
    leaderboardPopup.classList.add('hidden');
  }
});