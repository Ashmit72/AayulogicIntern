const wordValue = "LOPHOPHORUS";
const lettersToShow = Math.round((Math.random() * wordValue.length) / 2);
// console.log(lettersToShow);
const wordDisplay = document.querySelector("#word-value");
wordDisplay.innerText = wordValue.substring(0, lettersToShow).toUpperCase() + "_".repeat(wordValue.length - lettersToShow);

// const restartButton=document.querySelector("#restart-form")
// // console.log(restartButton);
// restartButton.addEventListener('submit',(event)=>{
//     // event.preventDefault()
//    location.reload(true)
//    log(this)
// })

const buttons = document.querySelectorAll("button");
let hangStatus
let error=0
buttons.forEach((button) => {
 
  button.addEventListener("click", () => {
    const guessedLetter = button.innerText;
    if (wordValue.includes(guessedLetter.toUpperCase())) {
      console.log("Correct guess!");
      hangStatus=true;
      const currentWordDisplay = wordDisplay.innerText.split('');
      for (let i = 0; i < wordValue.length; i++) {
        if (wordValue[i] === guessedLetter.toUpperCase()) {
          currentWordDisplay[i] = guessedLetter.toUpperCase();
        }
      }
      wordDisplay.innerText = currentWordDisplay.join('');
      if (wordDisplay.innerText === wordValue) {
        console.log("Congratulations! You've guessed the word!");
      }
    } else {
      hangStatus=false
      console.log("Incorrect guess.");
      error++
      console.log(error);
    }
    button.disabled = true;
   console.log(hangStatus);
   switch(error){
    case 1:
        console.log("Head!");
        const head=document.querySelector(".head")
        head.style.display="block"
        break
    case 2:
        console.log("Body!");
        const body=document.querySelector(".body")
        body.style.display="block"
        break
    case 3:
        console.log("left hand!");
        const hands=document.querySelector(".hands")
        hands.style.display="block"
        break
    case 4:
        console.log("Right leg!");
        const right=document.querySelector("#right")
        right.style.display="block"
        break
    case 5:
        console.log("left leg!");
        const left=document.querySelector("#left")
        left.style.display="block"
         buttons.forEach(button=>button.style.display="none")
         const message=document.querySelector("#message")
         message.style.display="block"
    default:
    //   console.log("Invalid Choice");
    break
}
  });
});


