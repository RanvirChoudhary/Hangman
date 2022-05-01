async function extractData(random){
  const response = await fetch("./words.txt");
  const data = await response.text();
  const array = data.split("\r\n");
  console.log( array[random] );
}

function GenRandom(){
  let random = ~~(Math.random() * 276);
  return random
}

function InputHandler(){
  window.addEventListener("keypress", event => {
    return event.key;
  })
}

extractData(GenRandom())

InputHandler()