'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

//initiating global variables
let score, currentScore, activePlayer, playing;


//Starting Conditions
const init = function () {

    //assigning global variables
    playing = true;
    score = [0, 0]
    currentScore = 0;
    activePlayer = 0;

    //Setting all scores to 0
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current0El.textContent = 0;

    //Hidding dice and assisgning active player and removing winner player if one exists
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};
//Initializes game
init();

//Switches player at the end of each turn
const switchPlayer = function () {
    console.log('switch player reached');
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};



//Rolling dice functionality
btnRoll.addEventListener('click', function () {
    //1. Choose Random number between 1 - 6
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);

        //2. display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //3. Check if rolle 1: if ture, switch to next player
        if (dice !== 1) {
            //Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else {
            //switch to next player
            switchPlayer();
        }
    }


});

btnHold.addEventListener('click', function () {
    if (playing) {
        console.log('Hold Button');
        //1. Add current score to active players score
        score[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];
        //2. Check score is >=100
        if (score[activePlayer] >= 100) {
            //Finish game
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            //Reset Game
            playing = false;
            diceEl.classList.add('hidden');
        } else {
            //Switch to next player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', function () {
    init();
});

