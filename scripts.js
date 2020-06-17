const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard; 

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip'); 

    if (!hasFlippedCard) {
        //first click 
        hasFlippedCard = true;
        firstCard = this; 
    }   else {
        //second click
        hasFlippedCard = false;
        secondCard = this;
        //do cards match?
        if (firstCard.dataset.framework === 
            secondCard.dataset.framework) {
                //it's a match!
                firstCard.removeEventListener('click', flipCard);
                secondCard.removeEventListener('click', flipCard);
                //resetBoard();
            }   else {
                //not a match
                lockBoard = true;
                setTimeout(() => {
                    firstCard.classList.remove('flip');
                    secondCard.classList.remove('flip');
                    [hasFlippedCard, lockBoard] = [false, false];
                    [firstCard, secondCard] = [null, null];
                }, 1500);
            }

        
    }


}
function resetBoard() {
    counter = 0;
    document.querySelector(".memory-game").style.visibility = "visible";
    document.querySelector(".btn").style.visibility = "hidden";
    cards.forEach(function(card) {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard)
    })
    startTimer();
    shuffle();
} 


cards.forEach(card => card.addEventListener('click', flipCard)); 

var counter = 0;
var timeLeft = 10;

function startTimer() {
    var timer = select('#timer');
    timer.html(timeLeft - counter);


var interval = setInterval(timeIt, 1000);

    function timeIt() {
        counter++;
        timer.html(timeLeft - counter);
        if (counter == timeLeft) {
            clearInterval(interval);
            timer.html("Game Over")

            document.querySelector(".memory-game").style.visibility = "hidden";
            let button = document.querySelector(".btn");
            button.style.visibility = "visible";
            button.addEventListener("click", resetBoard)
            //alert('boom');
        }
        

    }
}

function setup() {
    noCanvas();
    startTimer();
}
function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    }); 
}
//shuffle();