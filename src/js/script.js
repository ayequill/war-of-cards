let deckId;
let str;
const cardsHolder = document.getElementById("cards");
const newGameBtn = document.getElementById("btn");
const drawBtn = document.getElementById("drawBtn");
const scoreBoard = document.querySelector("h2");
const remainingCardsContainer = document.querySelector("h3");
const scores = document.querySelectorAll("p");
let playerScore = 0;
let cpuScore = 0;
console.log(scores);

async function fetchApi() {
  // Fetch new game from API
  const response = await fetch(
    "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  const data = await response.json();

  // render remaining card at the start of the game
  remainingCardsContainer.textContent = `Remaining cards: ${data.remaining}`;

  //   return deck id to keep track of game
  return (deckId = data.deck_id);
}

async function drawCard() {
  const response = await fetch(
    `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
  );
  const deck = await response.json();
  //   render remaining cards and update it
  remainingCardsContainer.textContent = `Remaining cards: ${deck.remaining}`;

  // render each card image
  cardsHolder.children[0].innerHTML = `<img class="animate__animated animate__flipInX" src='${deck.cards[0].image}'>`;
  cardsHolder.children[1].innerHTML = `<img class="animate__animated animate__flipInX" src='${deck.cards[1].image}'>`;

  //   disable border after rendering images
  cardsHolder.children[0].style.border = "none";
  cardsHolder.children[1].style.border = "none";

  // check who won the round and render
  scoreBoard.textContent = determineCardWinner(deck.cards[0], deck.cards[1]);

  // if there are no cards disable draw button and render who won the game
  if (deck.remaining === 0) {
    if (playerScore < cpuScore) {
      scoreBoard.textContent = "CPU Won";
    } else if (cpuScore < playerScore) {
      scoreBoard.textContent = "Player Won";
    } else scoreBoard.textContent = "war";
    drawBtn.disabled = true;
  }

  // up each rounds score
  scores[0].textContent = `Computer: ${cpuScore}`;
  scores[1].textContent = `Me: ${playerScore}`;
}

newGameBtn.addEventListener("click", () => {
  fetchApi();
  playerScore = 0;
  cpuScore = 0;
  scores.forEach((score) => (score.textContent = ""));
});

drawBtn.addEventListener("click", () => {
  if (deckId) {
    drawCard();
  } else {
    fetchApi();
    drawCard();
  }
});

function determineCardWinner(firstCard, secondCard) {
  //  an array to use as a counter for my cards since not all of them are numbers
  const valueOptions = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];

  const card1ValueIndex = valueOptions.indexOf(firstCard.value);
  const card2ValueIndex = valueOptions.indexOf(secondCard.value);
  console.log(card1ValueIndex);
  console.log(card2ValueIndex);

  if (card1ValueIndex < card2ValueIndex) {
    console.log("secondCard won");
    playerScore++;
    return `You won!`;
  } else if (card1ValueIndex > card2ValueIndex) {
    console.log("firstCard won");
    cpuScore++;
    return `Computer won!`;
  } else return `War!`;
}
