let card = [];
const selectedNumbers = [];
let exit = false;
let nextTurn = true;
let attempt = 1;
let line = true;
let founded = 0;
let index = 0;
let bingo = false;

const ranking = [
  {
    player: "Pepe",
    points: 20,
  },
  {
    player: "Ernesto",
    points: 18,
  },
  {
    player: "Fidel",
    points: 13,
  },
];

let newPLayer = {
  player: "",
  points: 0,
};

const player = () => {
  const playerName = prompt("Enter your name");
  console.log(playerName);
  if (playerName === "" || playerName === null) {
    player();
  } else {
    alert(`Welcome to the bingo game ${playerName}`);
    rankingExplanation();
    newPLayer.player = playerName;
  }
};

const createCard = (card, bingo, nextTurn, attempt) => {
  for (let index = 0; card.length < 15; index++) {
    const element = generateRandomNumber();
    if (!card.includes(element)) {
      card.push(element);
    }
  }
  orderNumber(card);
  showCard(card);
  let selectCard = confirmCard();
  if (selectCard) {
    do {
      selectNumber();
    } while (!exit);
  } else {
    card = [];
    createCard(card);
  }
};

const selectNumber = () => {
  let number = generateRandomNumber();
  if (!selectedNumbers.includes(number)) {
    selectedNumbers.push(number);
    alert(`The number is : ${selectedNumbers[index]}`);
    findNumber(selectedNumbers[index]);
    index++;
  }
};

const generateRandomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 90) + 1;
  return randomNumber;
};

const findNumber = (number) => {
  if (!card.includes(number)) {
    alert(
      `Sorry, you don't have the number: ${number}\n This is yor try number: ${attempt}`
    );
  } else {
    for (let index = 0; index < card.length; index++) {
      let element = card[index];
      if (number === element) {
        card[index] = "x";
        founded += 1;
        alert(`Congratulations, you got the number: ${number}`);
      }
    }
  }
  if (founded >= 15) {
    alert(`Bingooooo!!!`);
    bingo = true;
    nextTurn = false;
    alert(`You have completed the card in ${attempt} attempts`);
    console.log(playerPoints(attempt));
    let play = confirm(`Do you want to play again?`);
    if (play) {
      card = [];
      bingo = false;
      newturn = true;
      founded = 0;
      exit = false;
      attempt = 1;
      createCard(card, bingo, exit, founded, nextTurn, attempt);
    } else {
      alert(`Goodbye!!!`);
      exit = true;
    }
  }
  if (founded >= 5 && line) {
    checkLine(card);
  }
  showCard(card);

  if (!bingo) {
    keepPlaying = confirm(`Another number?`);
    if (!keepPlaying) {
      nextTurn = false;
      exit = true;
      alert(`You have left the Bingo Game!!!\n See you soon ...`);
    } else {
      attempt += 1;
    }
  }
};

const confirmCard = () => {
  const iWantThisCard = confirm(`Do you want this card?`);
  return iWantThisCard;
};

const showCard = (card) => {
  alert(`This is your card : ${card}`);
};

const orderNumber = (card) => {
  const sortedArray = card.sort(function (a, b) {
    return a - b;
  });
  return sortedArray;
};

const checkLine = (card) => {
  for (let index = 0; index < card.length; index++) {
    if (
      card[0] === "x" &&
      card[1] === "x" &&
      card[2] === "x" &&
      card[3] === "x" &&
      card[4] === "x"
    ) {
      alert(`First Row!!`);
      line = false;
      break;
    }
    if (
      card[5] === "x" &&
      card[6] === "x" &&
      card[7] === "x" &&
      card[8] === "x" &&
      card[9] === "x"
    ) {
      alert(`Second Row!!`);
      line = false;
      break;
    }
    if (
      card[10] === "x" &&
      card[11] === "x" &&
      card[12] === "x" &&
      card[13] === "x" &&
      card[14] === "x"
    ) {
      alert(`Third Row!!`);
      line = false;
      break;
    }
  }
  return line;
};

const rankingExplanation = () => {
  alert(
    `La puntuación consiste en 100 puntos por obtener bingo menos el número de intento que has necesitado para completar tu cartón.\n Participarás del ranking solamente si completas tu cartón.\n A jugar!!!`
  );
};

const playerPoints = (attempt) => {
  newPLayer.points = 100 - attempt;
  ranking.push(newPLayer);
  const rankingSorted = ranking.sort(function (a, b) {
    return b.points - a.points;
  });
  return rankingSorted;
};

const startGame = () => {
  player();
  createCard(card, bingo, exit, founded, nextTurn, attempt);
};

startGame();
