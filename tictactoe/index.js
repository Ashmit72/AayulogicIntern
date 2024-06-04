const arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const box = document.querySelectorAll(".box");

let count = 0; 
let play = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}


arr.forEach((innerArray, i) => {
  innerArray.forEach((item, j) => {
    const index = i * arr.length + j;
    if (index < box.length) {
      box[index].addEventListener("click", () => {
        if (box[index].innerHTML === "O" || box[index].innerHTML === "X") {
          return;
        }
        play = count % 2 === 0;
        box[index].innerText = play ? "O" : "X";
        count++;

        const winningCombination = getWinner();
        if (winningCombination) {
          console.log('Winning combination:', winningCombination);
           if(arraysEqual(winningCombination,[0,3,6])){
            document.querySelector("#line-vertical").style.display="block"
           }
           else if (arraysEqual(winningCombination,[6,7,8])) {
            document.querySelector("#line-horizantal").style.display="block"
           }
           else if (arraysEqual(winningCombination,[0,4,8])) {
            document.querySelector("#line-diagonal-1").style.display="block"
           }
           else if (arraysEqual(winningCombination,[2,4,6])) {
            document.querySelector("#line-diagonal-2").style.display="block"
           }
           else if (arraysEqual(winningCombination,[3,4,5])) {
            document.querySelector("#line-horizantal").style.display="block"
            document.querySelector("#line-horizantal").style.bottom="400px"
           }
           else if (arraysEqual(winningCombination,[0,1,2])) {
            document.querySelector("#line-horizantal").style.display="block"
            document.querySelector("#line-horizantal").style.bottom="690px"
           }
           else if (arraysEqual(winningCombination,[1,4,7])) {
            document.querySelector("#line-vertical").style.display="block"
            document.querySelector("#line-vertical").style.left="490px"
           }
           else if (arraysEqual(winningCombination,[2,5,8])) {
            document.querySelector("#line-vertical").style.display="block"
            document.querySelector("#line-vertical").style.left="790px"
           }
          setTimeout(() => {
            alert(play ? "O wins!" : "X wins!");
          }, 100);
          disableBoard();
        } else if (count === 9) {
          setTimeout(() => {
            alert("It's a draw!");
          }, 100);
          disableBoard();
        }
      });
    }
  });
});

function getWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (box[a].innerText && box[a].innerText === box[b].innerText && box[a].innerText === box[c].innerText) {
      return combination;
    }
  }
  return null;
}

function disableBoard() {
  box.forEach(b => {
    b.style.pointerEvents = "none"; 
  });
}
