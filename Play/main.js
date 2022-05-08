let WordToGuess;
let counter = 0;
let WonOrLost = "Playing";
let letterBlacklist = [];
let BtnPlayAgainWin = document.getElementById("button-play-again-win");
let BtnPlayAgainLose = document.getElementById("button-play-again-lose");
let wordsGuessed = document.querySelectorAll(".letter");
let guessedWrong = document.querySelectorAll(".incorrect-guess");
const Image = document.getElementById("Picture");
const modalVictory = document.getElementById("modal-you-win");
const modalLoss = document.getElementById("modal-you-lose");
const WordRevealedH2Element = document.getElementById("word-revealed")

wordsGuessed = Array.from(wordsGuessed);
guessedWrong = Array.from(guessedWrong);

async function extractData(random) {
  const response = await fetch("./words.txt");
  const data = await response.text();
  const words = data.split("\r\n");
  WordToGuess = words[random].split("");
}

function GenRandom(multiplier) {
  let random = Math.floor(Math.random() * multiplier);
  return random;
}

function Main() {
  console.log(WordToGuess)
  window.addEventListener("keypress", (e) => {
    let keyPressed = e.key.toLowerCase()
    if (WonOrLost === "Playing") {
      let templateGuessed = [];
      for (let letter of WordToGuess) {
        if (letter === keyPressed) {
          templateGuessed.push(true);
        } else {
          templateGuessed.push(false);
        }
      }
      for (let i = 0; i < templateGuessed.length; i++) {
        const truth = templateGuessed[i];
        if (truth) {
          wordsGuessed[i].textContent = keyPressed;
        }
      }
      if (WordToGuess.includes(keyPressed) === false) {
        if (!letterBlacklist.includes(keyPressed) && isNaN(keyPressed)) {
          guessedWrong[counter].textContent = keyPressed;
          Image.src = `../Assets/Stage${counter}.svg`;
          letterBlacklist.push(keyPressed);
          counter++;
        }
      }
      if (wordsGuessed.every((element) => element.textContent !== "")) {
        modalVictory.classList.remove("hidden");
        WonOrLost = "Won";
      }
      if (counter === 8) {
        WordRevealedH2Element.textContent = `The Word was: '${WordToGuess.join("")}'`
        modalLoss.classList.remove("hidden");
        WonOrLost = "Lost";
      }
    }
  });
  BtnPlayAgainWin.addEventListener("click", (e) => {
    location.reload();
  });
  BtnPlayAgainLose.addEventListener("click", (e) => {
    location.reload();
  });
}

extractData(GenRandom(276))
  .then(Main)
  .catch(() => console.log());
