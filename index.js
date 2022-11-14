const boxes = document.querySelectorAll(".box");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;


function startGame(){
    boxes.forEach(box => box.addEventListener("click", boxClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}
startGame();

function boxClicked(){
    const boxIndex = this.getAttribute("boxIndex");

    if(options[boxIndex] != "" || !running){
        return;
    }

    updateBox(this, boxIndex);
    checkWinner();
}
function updateBox(box, index){
    options[index] = currentPlayer;
    box.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = currentPlayer == "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const box1 = options[condition[0]];
        const box2 = options[condition[1]];
        const box3 = options[condition[2]];

        if(box1 != "" && box1 === box2 && box1 === box3){
            roundWon = true;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
    }
    else{
        changePlayer();
    }
}
function restartGame(){
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = "Let's play again!";
    boxes.forEach(box => box.innerText = '');
}