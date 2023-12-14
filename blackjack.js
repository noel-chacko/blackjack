let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    let cardValue = randomNumber;
    if (randomNumber > 10) {
        cardValue = 10;
    } else if (randomNumber === 1) {
        cardValue = 11;
    }

    let imageName = randomNumber + ".png"; // image name based on card number

    return {
        value: cardValue,
        image: imageName
    };
}

function startGame() {
    isAlive = true;
    hasBlackJack = false;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard.value + secondCard.value;
    renderGame();
}


function renderGame() {
    cardsEl.innerHTML = ""; 
    sumEl.textContent = "Sum: " + sum;

    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];

        // create a div for each card
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("card-container");

    
        let cardImage = document.createElement("img");
        cardImage.src = "images/" + card.image;
        cardImage.alt = "Card";
        cardDiv.appendChild(cardImage);

        let cardValueP = document.createElement("p");
        cardValueP.textContent = card.value;
        cardValueP.classList.add("card-value");
        cardDiv.appendChild(cardValueP);

        cardsEl.appendChild(cardDiv);
    }

    if (sum <= 20) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You've got Blackjack!";
        hasBlackJack = true;
    } else {
        message = "You're out of the game!";
        isAlive = false;
    }
    messageEl.textContent = message;
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard();
        sum += card.value;
        cards.push(card);
        renderGame();        
    }
}

