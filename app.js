let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newgame-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // player X , player O

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}


boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // box.innerText = "HR";
    if (turnO) {
      // player O
      box.innerText = "O";
      turnO = false;
      box.style.backgroundColor = "black";
    } else {
      // player X
      box.innerText = "X";
      turnO = true;
      box.style.backgroundColor = "green";
    }
    box.disabled = true;
    
    checkWinner();
  });
});

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
} 
const enableBoxes = () => {
  for(let box of boxes) {
      box.disabled = false;
      box.innerText = "";
      box.style.backgroundColor = "#ffffc7";
  }
} 


const showWinner = (winner) => {
  msg.innerText= `congratulations, winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
}

const showDraw = (winner) => {
  msg.innerText= "The Match Was Draw"
  msgContainer.classList.remove("hide");
  disableBoxes();
}

const checkWinner = () => {
  let winnerFound = false;
  for (let pattern of winPatterns) {
    // console.log(pattern[0], pattern[1], pattern[2]);
    // console.log(
    //   boxes[pattern[0]].innerText,
    //   boxes[pattern[1]].innerText,
    //   boxes[pattern[2]].innerText
    // );

    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if(pos1Val != ""  && pos2Val != ""  && pos3Val != ""){
        if(pos1Val === pos2Val && pos2Val === pos3Val){
            showWinner(pos1Val);
            winnerFound = true;
            break;
        }
    }
  }
  if (!winnerFound) {
    let allFilled = true;
    boxes.forEach((box) => {
      if (box.innerText === "") {
        allFilled = false;
      }
    });
    
    if (allFilled) {
      showDraw();
    }
  }
};


newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);