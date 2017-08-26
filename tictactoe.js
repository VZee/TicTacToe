//initially set player to x and pc to o
var player = "x";
var pc = "o";
var newGame = true;
var totalFilled = 0;
//to track who just did the last move and simplify win condition reporting
var turn;
var move;
//function to change which letter the player has selected
//only works if it's the start of a new game
function selected(sel){
  if(newGame){
    if(sel === "x"){
      document.getElementById("x").style.backgroundColor = "#4dffff";
      document.getElementById("x").style.color = "#303030";
      document.getElementById("o").style.backgroundColor = "#303030";
      document.getElementById("o").style.color = "#4dffff";
      player = "x";
      turn = "x";
      pc = "o";
    }
    else if(sel === "o"){
      document.getElementById("o").style.backgroundColor = "#4dffff";
      document.getElementById("o").style.color = "#303030";
      document.getElementById("x").style.backgroundColor = "#303030";
      document.getElementById("x").style.color = "#4dffff";
      player = "o";
      turn = "o";
      pc = "x";
    }
    newGame = false;
  }
}

//function to fill the selected square on the tic tac toe board
function fill(id){
  var wait = 0;
  if(id === "NULL"){
    while(id == "NULL"){
    //do nothing until the player selects a square
      wait++;
    }
  }
  else{
    if(document.getElementById(id).innerHTML === ""){
      document.getElementById(id).innerHTML = player;
      if(totalFilled === 0){document.getElementById("result").innerHTML = "";}
      totalFilled++;
      turn = player;
      isWin();
    }
  }
}

//function to see if the selected square leads to a win
function isWin(){
  if(totalFilled === 9){
    document.getElementById("result").style.paddingLeft = "80px";
    document.getElementById("result").innerHTML = "Cat's Game";
    reset();
  }
  else if(totalFilled < 3 && totalFilled !== 9){
    //if less than three squares are filled swap turns
    if(turn === player){pcTurn();}
    else{myTurn();}
  }
  else{
    //check to see if someone has won the game
    //horizontal win conditions
    if((document.getElementById("topLeft").innerHTML !== "" &&(document.getElementById("topLeft").innerHTML ===
  document.getElementById("topMid").innerHTML && document.getElementById("topMid").innerHTML ===
  document.getElementById("topRight").innerHTML)) || (document.getElementById("midLeft").innerHTML!== "" && (document.getElementById("midLeft").innerHTML ===
  document.getElementById("mid").innerHTML && document.getElementById("mid").innerHTML ===
  document.getElementById("midRight").innerHTML)) || (document.getElementById("botLeft").innerHTML !== ""&&(document.getElementById("botLeft").innerHTML ===
  document.getElementById("botMid").innerHTML && document.getElementById("botMid").innerHTML ===
  document.getElementById("botRight").innerHTML))){
    document.getElementById("result").style.paddingLeft = "60px";
    document.getElementById("result").innerHTML = turn + " Wins";
    reset();
    }
  //vertical win conditions
  else if((document.getElementById("topLeft").innerHTML!== "" &&(document.getElementById("topLeft").innerHTML ===
  document.getElementById("midLeft").innerHTML && document.getElementById("midLeft").innerHTML ===
  document.getElementById("botLeft").innerHTML)) || (document.getElementById("topMid").innerHTML!==""&&(document.getElementById("topMid").innerHTML ===
  document.getElementById("mid").innerHTML && document.getElementById("mid").innerHTML ===
  document.getElementById("botMid").innerHTML)) || (document.getElementById("topRight").innerHTML!=="" &&(document.getElementById("topRight").innerHTML ===
  document.getElementById("midRight").innerHTML && document.getElementById("midRight").innerHTML ===
  document.getElementById("botRight").innerHTML))){
    document.getElementById("result").style.paddingLeft = "80px";
    document.getElementById("result").innerHTML = turn + " Wins";
    reset();
    }
    //diagonal win condition
    else if((document.getElementById("topLeft").innerHTML !== "")&&document.getElementById("topLeft").innerHTML === document.getElementById("mid").innerHTML && document.getElementById("mid").innerHTML === document.getElementById("botRight").innerHTML){
    document.getElementById("result").style.paddingLeft = "80px";
    document.getElementById("result").innerHTML = turn + " Wins";
    reset();
    }
    //other diagonal win condition
    else if((document.getElementById("botLeft").innerHTML !=="") && document.getElementById("botLeft").innerHTML === document.getElementById("mid").innerHTML && document.getElementById("mid").innerHTML === document.getElementById("topRight").innerHTML){
    document.getElementById("result").style.paddingLeft = "80px";
    document.getElementById("result").innerHTML = turn + " Wins";
    reset();
  }
    //if no one has won the pc gets to go
    else{
      //swap turns
      if(turn === player){pcTurn();}
      else{myTurn();}
    }
  }
}

//after the player goes the computer gets a turn
function pcTurn(){
  //coded to easy difficulty
  if(document.getElementById("mid").innerHTML === ""){move = "mid";}
  else{
    var myArray = ["topLeft", "botRight", "topRight", "botLeft", "topMid", "midLeft", "midRight", "botMid"];
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    if(document.getElementById(rand).innerHTML === ""){move = rand;}
    else{
      while(document.getElementById(rand).innerHTML !== ""){
        rand = myArray[Math.floor(Math.random() * myArray.length)];
      }
      move = rand;
    }
  }

  document.getElementById(move).innerHTML = pc;
  totalFilled++;
  //see if the pc just won the game
  turn = pc;
  isWin();
}

//function that waits 5 seconds before the board is cleared after a game
function reset(){
  var myVar = setTimeout(timeForReset, 3000);
  myVar;
}

//reset the board for another game
function timeForReset(){

  newGame = true;
  totalFilled = 0;
  player = "x";
  pc = "o";

  document.getElementById("result").innerHTML = "";
  document.getElementById("x").style.backgroundColor = "#4dffff";
  document.getElementById("x").style.color = "#303030";
  document.getElementById("o").style.backgroundColor = "#303030";
  document.getElementById("o").style.color = "#4dffff";

  document.getElementById("topLeft").innerHTML = "";
  document.getElementById("topMid").innerHTML = "";
  document.getElementById("topRight").innerHTML = "";
  document.getElementById("midLeft").innerHTML = "";
  document.getElementById("mid").innerHTML = "";
  document.getElementById("midRight").innerHTML = "";
  document.getElementById("botLeft").innerHTML = "";
  document.getElementById("botMid").innerHTML = "";
  document.getElementById("botRight").innerHTML = "";
}
//document ready function to select which letter the player wants to have

$(document).ready(function(){
  myTurn();
})

function myTurn(){
  document.getElementById("x").onclick = function(){selected("x");}
  document.getElementById("o").onclick = function(){selected("o");}
  document.getElementById("topLeft").onclick = function(){fill("topLeft");}
  document.getElementById("topMid").onclick = function(){fill("topMid");}
  document.getElementById("topRight").onclick = function(){fill("topRight");}
  document.getElementById("midLeft").onclick = function(){fill("midLeft");}
  document.getElementById("mid").onclick = function(){fill("mid");}
  document.getElementById("midRight").onclick = function(){fill("midRight");}
  document.getElementById("botLeft").onclick = function(){fill("botLeft");}
  document.getElementById("botMid").onclick = function(){fill("botMid");}
  document.getElementById("botRight").onclick = function(){fill("botRight");}
}
