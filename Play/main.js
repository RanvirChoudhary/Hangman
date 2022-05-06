let WordToGuess;
let counter = 0;
const wordsGuessed = document.querySelectorAll(".letter");
const guessedWrong = document.querySelectorAll(".incorrect-guess");
const Image = document.getElementById("Picture")
// guessedWrong[0].textContent = "j"

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
      if (truth === true) {
        wordsGuessed[i].textContent = e.key;
      }
    }
    if (WordToGuess.includes(e.key) === false){
      guessedWrong[counter].textContent = e.key;
      Image.src = `../Assets/Stage${counter}.svg`
      counter++
    }
  });
}

extractData(GenRandom(276))
  .then(InputHandler)
  .catch(() => console.log());
