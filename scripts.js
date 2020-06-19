const cards = document.querySelectorAll('.memory-card');
let interval;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard; 
let countMatch = 0;

function flipCard() {
    console.log(timer.innerHTML);
    if(!timer.innerHTML) {
        startTimer();
    }
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
                countMatch = document.querySelectorAll(".flip").length;
                console.log(countMatch);
                //resetBoard();
                if(countMatch >= 24) {
                    console.log("win");
                    clearInterval(interval);
                    timer.innerHTML = "";
                    timeLeft = 60;
                    document.querySelector(".memory-game").style.visibility = "hidden";
                    let button = document.querySelector(".btn");
                    let textSpan = document.querySelector(".text");
                    button.style.visibility = "visible";
                    textSpan.style.visibility = "visible";
                    textSpan.innerHTML = "Win";
                    button.addEventListener("click", resetBoard)

                }
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
    console.log(hasFlippedCard, lockBoard);
    [firstCard, secondCard] = [null, null];
    console.log(firstCard, secondCard);

    counter = 0;
    document.querySelector(".memory-game").style.visibility = "visible";
    document.querySelector(".btn").style.visibility = "hidden";
    document.querySelector(".text").style.visibility = "hidden";
    cards.forEach(function(card) {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard)
    })
    shuffle();
} 


cards.forEach(card => card.addEventListener('click', flipCard)); 

var counter = 0;
var timeLeft = 60;

function startTimer() {
    var timer = select('#timer');
    timer.html(timeLeft - counter);


interval = setInterval(timeIt, 1000);



    
    function timeIt() {
        counter++;
        timer.html(timeLeft - counter);
        if (counter == timeLeft) {
            clearInterval(interval);
            
            clearInterval(interval);
            timer.html("");
            timeLeft = 60;

            document.querySelector(".memory-game").style.visibility = "hidden";
            let button = document.querySelector(".btn");
            let textSpan = document.querySelector(".text");
            button.style.visibility = "visible";
            textSpan.style.visibility = "visible";
            textSpan.innerHTML = "Game Over";
            button.addEventListener("click", resetBoard)
            //alert('boom');
        }
        

    }
}

function setup() {
    noCanvas();
    //startTimer();
}
function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    }); 
}
//shuffle();

document.getElementById("timer").style.color = "white";