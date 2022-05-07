let WordToGuess;
let counter = 0;
let WonOrLost = "Playing";
let letterBlacklist = [];
let BtnPlayAgain = document.getElementById("button-play-again")
let wordsGuessed = document.querySelectorAll(".letter");
let guessedWrong = document.querySelectorAll(".incorrect-guess");
const Image = document.getElementById("Picture");
const modalVictory = document.getElementById("modal-you-win");
const modalLoss = document.getElementById("modal-you-lose");

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

function InputHandler() {
  window.addEventListener("keypress", (e) => {
    if(WonOrLost === "Playing"){
      let templateGuessed = [];
      for (let letter of WordToGuess) {
        if (letter === e.key) {
          templateGuessed.push(true);
        } else {
          templateGuessed.push(false);
        }
      }
      for (let i = 0; i < templateGuessed.length; i++) {
        const truth = templateGuessed[i];
        if (truth) {
          wordsGuessed[i].textContent = e.key;
        }
      }
      if (WordToGuess.includes(e.key) === false) {
        if (!letterBlacklist.includes(e.key) && isNaN(e.key)) {
          guessedWrong[counter].textContent = e.key;
          Image.src = `../Assets/Stage${counter}.svg`;
          letterBlacklist.push(e.key);
          counter++;
        }
      }
      if (wordsGuessed.every(element => element.textContent !== "")) {
        modalVictory.classList.remove("hidden")
        WonOrLost = "Won"
      } 
      if (counter === 8) {
        modalLoss.classList.remove("hidden")
        console.log(counter)
        WonOrLost = "Lost"
      } 
    }
  });
  BtnPlayAgain.addEventListener("click", e => {
    location.reload()
  })
}

extractData(GenRandom(276))
  .then(InputHandler)
  .catch(() => console.log());


