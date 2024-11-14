let boxes = document.querySelectorAll(".box")
let msg = document.querySelector("#msg")
let newBtn = document.querySelector("#new-btn")
let resetBtn = document.querySelector("#reset-btn")
let gameMode = document.querySelector("#game-mode")
let msgBox = document.querySelector(".msg-box");

let winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let turnO = true ;
let countBtn = 0 ;
let isSinglePlayer = true ; 

gameMode.addEventListener("change",(event)=>{
    isSinglePlayer = event.target.value === "single";
    resetGame()
})

boxes.forEach((box) =>{
    box.addEventListener("click",()=>{
        playerMove(box);
            if(isSinglePlayer && countBtn < 9 && !turnO){
                setTimeout(computerMove,500)
            }
     })
})

let playerMove = (box)=>{
       if(turnO){
        box.innerHTML = "O"
        turnO = false 
        box.classList.add("addColor1")
       }else {
        box.innerHTML = "X"
        turnO = true
       }  
       countBtn ++ ;
       box.disabled = true 
       let isWinner = checkWinner()
       if(!isWinner && countBtn === 9){
        msg.innerText = "Game was Drawn , Try Again"
        msgBox.classList.remove("hide");
        disabledBoxes()
       }
}
let computerMove = ()=>{
    let emptyBoxes = Array.from(boxes).filter((box)=>box.innerHTML === "")
    if(emptyBoxes.length > 0){
        let randomBox = emptyBoxes[Math.floor(Math.random()*emptyBoxes.length)]
        randomBox.innerHTML = "X";
        randomBox.disabled = true ;
        turnO = true ;
        countBtn++ ;
        checkWinner()
    }
}

let checkWinner = ()=>{
    for(let pattern of winPatterns){
        let pos1 = boxes[pattern[0]].innerText
        let pos2 = boxes[pattern[1]].innerText
        let pos3 = boxes[pattern[2]].innerText
    if(pos1 !== "" && pos2 !== "" && pos3 !== ""){
        if(pos1 === pos2 && pos2 === pos3){ 
        showWinner(pos1)
        return true;
        }
     }
  }
  return false ;
}

let showWinner = (winner)=>{
    msg.innerHTML = `Congratulations! Winner is ${winner}`
    msgBox.classList.remove("hide")
    disabledBoxes()
}

const disabledBoxes = ()=>{
    for(let box of boxes){
        box.disabled = true 
    }
}
const enabledBoxes = ()=>{
    for(let box of boxes){
        box.disabled = false ;
        box.innerHTML = "";
        box.classList.remove("addColor1")
    }
}

let resetGame = ()=>{
    turnO = true ;
    countBtn = 0
    enabledBoxes();
    msgBox.classList.add("hide");
}

resetBtn.addEventListener("click",resetGame)
newBtn.addEventListener("click",resetGame)