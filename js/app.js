/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//Declare variables
let cards = ['bicycle', 'bolt', 'bomb', 'diamond', 'leaf', 'cube', 'anchor', 'paper-plane-o'];
//Multiply cards variable
cards = cards.concat(cards);
let opened = [];
let matched = 0;
let moves = 0;
let cardsTotal = cards.length / 2;
let deck = $('.deck');
let scorePanel = $('.score-panel');
let numberMove = $('.moves');
let ratingStars = $('.fa-star');
let restart = $('.restart');
let delay = 400;
let currentTimer;
let minute = 0;
let second = 0;
let hour = 0;
let timer = $('.timer');

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Timer function

function initTime() {
    currentTimer = setInterval(function () {
            timer.text(`${minute} : ${second}`);
            timer.innerHTML = minute + second;
            second++;
            if (second == 60) {
                second = 0;
                minute++;
            } else if (minute == 60) {
                minute = 0;
                hour++;
            }
        }, 1000);

}

function resetTimer(timer) {
    if (timer) {
        clearInterval(timer);
    }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
