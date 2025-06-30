// 'use strict';

// // Selecting elements
// const player0El = document.querySelector('.player--0');
// const player1El = document.querySelector('.player--1');
// const score0El = document.querySelector('#score--0');
// const score1El = document.getElementById('score--1');
// const current0El = document.getElementById('current--0');
// const current1El = document.getElementById('current--1');

// const diceEl1 = document.getElementById('dice--1');
// const diceEl2 = document.getElementById('dice--2');
// const btnNew = document.querySelector('.btn--new');
// const btnRoll = document.querySelector('.btn--roll');
// const btnHold = document.querySelector('.btn--hold');

// // Starting Conditions
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl1.classList.add('hidden');
// diceEl2.classList.add('hidden');

// let scores, currentScore, activePlayer, playing;

// const init = () => {
//   scores = [0, 0];
//   currentScore = 0;
//   activePlayer = 0;
//   playing = true;

//   score0El.textContent = 0;
//   score1El.textContent = 0;
//   current0El.textContent = 0;
//   current1El.textContent = 0;
//   score0El.textContent = 0;
//   score1El.textContent = 0;

//   player0El.classList.remove('player--winner');
//   player1El.classList.remove('player--winner');
//   player0El.classList.add('player--active');
//   player1El.classList.remove('player--active');
//   diceEl1.classList.add('hidden');
//   diceEl2.classList.add('hidden');

//   document.getElementById(`name--1`).textContent = 'Player 2';
//   document.getElementById(`name--0`).textContent = 'Player 1';

//   document.querySelector('.final-score').textContent = 'Final Score';
// };

// init();

// const switchPlayer = () => {
//   document.getElementById(`current--${activePlayer}`).textContent = 0;
//   currentScore = 0;
//   activePlayer = activePlayer === 0 ? 1 : 0;
//   player0El.classList.toggle('player--active');
//   player1El.classList.toggle('player--active');
// };

// const winner = () => {
//   playing = false;
//   diceEl1.classList.add('hidden');
//   diceEl2.classList.add('hidden');
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.add('player--winner');
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.remove('player--active');
//   document.getElementById(`name--${activePlayer}`).textContent = 'Winner';
// };

// // Rolling dice functionality
// btnRoll.addEventListener('click', () => {
//   if (playing) {
//     // 1. Generating Radnom dice roll
//     const dice1 = Math.trunc(Math.random() * 6) + 1;
//     const dice2 = Math.trunc(Math.random() * 6) + 1;

//     // 2. Displaying the Dice
//     diceEl1.classList.remove('hidden');
//     diceEl2.classList.remove('hidden');
//     diceEl1.src = `dice-${dice1}.png`;
//     diceEl2.src = `dice-${dice2}.png`;

//     // 3. Check for rooled 1
//     if (dice1 !== 1 || dice2 !== 1) {
//       //add dice to the current score
//       currentScore += dice1 + dice2;
//       document.getElementById(
//         `current--${activePlayer}`
//       ).textContent = currentScore;
//     } else {
//       //switch to next player
//       switchPlayer();
//     }

//     if (dice1 === 6 && dice2 === 6) {
//       //Player wins the game
//       winner();
//     }
//   }
// });

// btnHold.addEventListener('click', () => {
//   if (playing) {
//     // 1. Add current score to active player's score
//     //scores[1] = scores[1] + currentScore'
//     scores[activePlayer] += currentScore;
//     document.getElementById(`score--${activePlayer}`).textContent =
//       scores[activePlayer];

//     var input = document.querySelector('.final-score').value;
//     var winningScore = input;

//     if (input) {
//       winningScore = input;
//     } else {
//       winningScore = 100;
//     }

//     // 2. Check if player's score > 100
//     if (scores[activePlayer] >= winningScore) {
//       // Finish the game
//       winner();
//     } else {
//       //Switch to the next player
//       switchPlayer();
//     }
//   }
// });

// btnNew.addEventListener('click', init);

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current1El.textContent = 0;
  current0El.textContent = 0;

  diceEl.classList.add('hidden');
  document.querySelector(`#name--${activePlayer}`).textContent = `Player ${
    activePlayer + 1
  }`;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player0El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};


// Rolling Dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Dispaly Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true, swith player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score of active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score >= 100
    if (scores[activePlayer] >= 20) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
      document.querySelector(`#name--${activePlayer}`).textContent = 'Winner';
    } else {
      // 3. Swith to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

