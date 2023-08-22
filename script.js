const gameContainer = document.getElementById("game");
let flippedCards = [];
let canFlip = true;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("card", color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  const clickedCard = event.target;

  if (!canFlip || flippedCards.includes(clickedCard) || flippedCards.length >= 2) {
    return;
  }

  clickedCard.style.backgroundColor = clickedCard.classList[1]; 

  flippedCards.push(clickedCard);

  if (flippedCards.length === 2) {
    canFlip = false;
    setTimeout(checkForMatch, 700); 
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;

  if (card1.classList[1] === card2.classList[1]) { 
    card1.removeEventListener("click", handleCardClick);
    card2.removeEventListener("click", handleCardClick);
    flippedCards = [];
  } else {
    card1.style.backgroundColor = "";
    card2.style.backgroundColor = "";
    flippedCards = [];
  }

  canFlip = true;
}

createDivsForColors(shuffledColors);

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetGame);

function resetGame() {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => card.style.backgroundColor = "");
  flippedCards = [];

  shuffledColors = shuffle(COLORS);
  gameContainer.innerHTML = "";
  createDivsForColors(shuffledColors);
}