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
        buttons.forEach(button=>button.style.display="none")
        const message=document.querySelector("#message")
        message.style.display="block"
        message.innerText="Congratulations You have Guessed The Word!"
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
        const handsleft=document.querySelector(".left-hand")
        handsleft.style.display="block"
        break
    case 4:
        console.log("Right leg!");
        const handsRight=document.querySelector(".right-hand")
        handsRight.style.display="block"
        break
    case 5:
        console.log("left leg!");
        const leftleg=document.querySelector(".left-leg")
        leftleg.style.display="block"
    case 6:
      const rightleg=document.querySelector(".right-leg")
      rightleg.style.display="block"
      buttons.forEach(button=>button.style.display="none")
      const message=document.querySelector("#message")
      message.style.display="block"
    default:
    //   console.log("Invalid Choice");
    break
}
  });
});


