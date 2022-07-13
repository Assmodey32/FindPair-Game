let array = [];
let flippedCards = [];
let cardLeft;

let timeLeftIntervalId;

function generateCardValues(boardSize) {
  let values = [];
  for (let i = 1; i <= boardSize / 2; i++) {
    values.push(i);
    values.push(i);
  }
  return values;
}
// https://stackoverflow.com/a/2450976
function fisherYatesShuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }

  return array;
}

function createCard(value) {
  let card = document.createElement('div');
  card.classList.add('memory-card');
  card.style.userSelect = 'none';
  card.textContent = value;

  // card.addEventListener('click', pushCard(card));
  card.addEventListener('click', function () {
    pushCard(card);
  });
  // card.addEventListener('click', (e) => {
  //   console.log(e.target);
  // });
  return card;
}

function pushCard(card) {

  if (flippedCards.includes(card))
    return;

  if (flippedCards.length === 2) {
    return;
  }
  updateCardFlippedInfo();
  card.classList.add('memory-card-flipped');
  flippedCards.push(card);
  if (flippedCards.length === 2) {
    setTimeout(gameLogic, 1500);
  }
}

function updateCardFlippedInfo() {
  const element = document.getElementById('cards-flipped-number');
  element.textContent = parseInt(element.textContent) + 1;
}

function updateCardLeftInfo() {
  const element = document.getElementById('cards-left-number');
  element.textContent = cardLeft;
}

function gameLogic() {
  console.log(`Game logic was called at ${new Date()}`);
  if (!flippedCards || flippedCards.length !== 2) return;

  flippedCards[0].classList.toggle('memory-card-flipped');
  flippedCards[1].classList.toggle('memory-card-flipped');

  if (flippedCards[0].textContent === flippedCards[1].textContent) {
    flippedCards[0].classList.add('memory-card-matched');
    flippedCards[1].classList.add('memory-card-matched');
    flippedCards[0].removeEventListener('click', pushCard());
    flippedCards[1].removeEventListener('click', pushCard());
    cardLeft -= 2;
    updateCardLeftInfo();
  }
  flippedCards = [];
}

function createBoard(rows, columns) {
  let board = document.createElement('div');
  board.style.display = 'grid';
  board.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  board.style.gap = '10px';

  array = generateCardValues(rows * columns);
  array = fisherYatesShuffle(array);

  for (let i = 0; i < rows * columns; i++) {
    let card = createCard(array[i]);
    board.appendChild(card);
  }

  cardLeft = rows * columns;

  return board;
}