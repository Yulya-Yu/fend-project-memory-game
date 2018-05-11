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

// Initialize the game

function initGame() {
    let symbols = shuffle(cards);
    deck.empty();
    matched = 0;
    moves = 0;
    numberMove.text('0');
    ratingStars.removeClass('fa-star-o').addClass('fa-star');
    for (var i = 0; i < symbols.length; i++) {
        deck.append($('<li class="card"><i class="fa fa-' + symbols[i] + '"></i></li>'))
    }

    gamePlay();

    resetTimer(timer);
    minute = 0;
    second = 0;
    timer.text(`${minute} : ${second}`);
    initTime();
    
};

// Rating setting function
function setRating(moves) {
    var rating;

    switch(true) {
    	case  moves > 20 && moves < 25:
    	ratingStars;
    	rating = 3;
    	break

    	case moves > 26 && moves < 31:
    	ratingStars.eq(1).removeClass('fa-star').addClass('fa-star-o');
        rating = 2;
        break

        case moves > 32:
        ratingStars.eq(0).removeClass('fa-star').addClass('fa-star-o');
        rating = 1;
    }
    return {
        score: rating 
    };
};

//Gameplay function

let gamePlay = function () {

    // This part creates cads flip
    deck.find('.card').on('click', function () {
        let flip = $(this)
        if (flip.hasClass('show')|| flip.hasClass('match')) { 
        	return true; 
        }

        let card = flip.context.innerHTML;
        flip.toggleClass('open show');
        opened.push(card);

        // This part compares opened cards
        if (opened.length > 1) {
            if (card === opened[0]) {
                deck.find('.open').toggleClass('match animated tada');
                setTimeout(function () {
                    deck.find('.match').removeClass('open show animated tada');
                }, delay);
                matched++;
            } else {
                deck.find('.open').toggleClass('nomatch animated shake');
                setTimeout(function () {
                    deck.find('.open').removeClass('animated shake');
                }, delay / 0.5);
                setTimeout(function () {
                    deck.find('.open').removeClass('open show nomatch animated shake');
                }, delay);
            }
            opened = [];
            moves++;
            setRating(moves);
            numberMove.html(moves);

        }

        // This part ends the game if all the cards are matched
        if (cardsTotal === matched) {
            setRating(moves);
            var score = setRating(moves).score;
            setTimeout(function () {
                end(moves, score);
            }, 1000);
        }
    });
};


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
