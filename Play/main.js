let WordToGuess;

async function extractData(random){
  const response = await fetch("./words.txt");
  const data = await response.text();
  const words = data.split("\r\n");
  WordToGuess = words[random].split("")
}

function GenRandom(multiplier){
  let random = Math.floor((Math.random() * multiplier));
  return random;
}

function InputHandler(){
  console.log(WordToGuess)
  window.addEventListener("keypress", e => {
    WordToGuess.forEach(element =>  {
      if(element == e.key){
        console.log("correct key!");
      }
      else{                         //this code executes every 8 times, because
        console.log("wrong key!"); //you are using forEach for every element of the array so
      }                           //every element that is wrong, the code is executed. this must be fixed
    })                           //but right now, it's time for a break
  })
}

extractData(GenRandom(276))
  .then(InputHandler)
  .catch(() => console.log())