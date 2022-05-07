let WordToGuess;
let counter = 0;
const wordsGuessed = document.querySelectorAll(".letter");
const guessedWrong = document.querySelectorAll(".incorrect-guess");
const Image = document.getElementById("Picture");
const modalVictory = document.getElementById("modal-you-win");
const modalLoss = document.getElementById("modal-you-lose");
let letterBlacklist = [];

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
  console.log(WordToGuess);
  window.addEventListener("keypress", (e) => {
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
    
  });
  
}

extractData(GenRandom(276))
  .then(InputHandler)
  .catch(() => console.log());
