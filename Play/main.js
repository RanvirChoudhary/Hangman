let WordToGuess;
const wordsGuessed = document.querySelectorAll(".letter");
const guessedWrong = document.querySelectorAll(".incorrect-guess");

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
        console.log(templateGuessed);
        // wordsGuessed[WordToGuess.indexOf(e.key)].textContent = e.key
      } else {
        //this code executes every 8 times, because
        //you are using forEach for every element of the array so
        //every element that is wrong, the code is executed. this must be fixed
        // turns out this code being executed more than one time proved to be in your favour lol
        templateGuessed.push(false);
        console.log(templateGuessed);
      }
    }
    for (let i = 0; i < templateGuessed.length; i++) {
      const truth = templateGuessed[i];
      if(truth === true){
        wordsGuessed[i].textContent = e.key
        console.log("hello")
      }
    }
  });
}

console.log(wordsGuessed);

extractData(GenRandom(276))
  .then(InputHandler)
  .catch(() => console.log());
