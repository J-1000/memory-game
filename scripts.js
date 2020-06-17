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
                resetBoard();
            }   else {
                //not a match
                lockBoard = true;
                setTimeout(() => {
                    firstCard.classList.remove('flip');
                    secondCard.classList.remove('flip');
                    resetBoard();
                }, 1500);
            }
        function resetBoard() {
            [hasFlippedCard, lockBoard] = [false, false];
            [firstCard, secondCard] = [null, null];
        } 
        (function shuffle() {
            cards.forEach(card => {
                let randomPos = math.floor(math.random() * 12);
                card.style.order = randomPos;
            })(); 
        }

        )}


}

cards.forEach(card => card.addEventListener('click', flipCard)); 