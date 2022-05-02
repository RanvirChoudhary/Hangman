async function extractData(random){
  const response = await fetch("./words.txt");
  const data = await response.text();
  const words = data.split("\r\n");
  console.log(words[random].split(""));
  return words[random].split("");
}

function GenRandom(){
  let random = Math.floor((Math.random() * 276));
  return random;
}

// this contains() function is made so you can run the <arrayname>.some()
// function. but you need to debug code first to run this.
// read comment below to understand
function contains(event, array){
  for(i = 0; i === array.length; i++){
    event === array[i]
  }
}

// Turns out that you cant run this code 
// because whenever you call the array returned by
// extractData outside of it, the array still hasn't
// loaded yet, because extractData is an async function
// so you need to learn and understand async functions first,
// then you can get to debugging this code. 
// to recap, the problem is that you are trying to call the 
// array before it has been loaded by the async function extractData, so you
// "async" the calling of the function extractData to fix this problem, this line was paraphrased
// from what @Xetera said on the discord server "The Programmer's Hangout" on 1/5/22


function InputHandler(word){
  window.addEventListener("keypress", event => {
    // if(word.some(contains(event.key, word))){     <----|
    //   console.log("done")                              |---this code here is the ultimate goal but there needs to be some debugging done before this code can be implemented. read the above comment to understand the situation
    // }                                             <----|
  })
}

InputHandler(extractData(GenRandom()));