
// Checking if the game has been started or not.
var started = false;

// setting game level to 0.
var level = 0;
// if the key has been pressed setting started to true and calling nextSequence function.
$(document).keypress(function(event){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence()
    started = true;
  }
});

// Empty array of user clicked pattern.
var userClickedPattern = [];
// Empty array of game pattern
var gamePattern = [];

// Array of colors of button.
var buttonColors = ["red","blue","green","yellow"];

$(".btn").on("click",handler);

function handler(){
  // Storing id of button clicked in userChosenColor variable.
  var userChosenColor = event.target.id;

  // Adding userChosenColor to the array of user Clicked Pattern.
  userClickedPattern.push(userChosenColor);

  // Playing sound of corrosponding button when clicked.
  playSound(userChosenColor);

  animatePress(userChosenColor);

  // checking answer with last index of user clicked pattern.
  checkAnswer(userClickedPattern.length-1);
}

// Next sequence function.
function nextSequence(){

  // once nextSequence is called again resting the userClickedPattern to empty.
  userClickedPattern = [];

  // generating random number between 0-3.
  var randomNumber = Math.floor(Math.random()*4);
  console.log(randomNumber);

  // Selecting random colors from buttonColors array using randomNumber.
  var randomChosenColor = buttonColors[randomNumber];
  console.log(randomChosenColor);

  // Adding randomly chosen Color to the array of game pattern.
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);

  // Selecting button with same id as randomChosenColor and animating flash to it.
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  // playing sound of randomly chosen color.
  playSound(randomChosenColor);

  // Increasing level by 1 every time nextSequence is called.
  level++;

  $("#level-title").text("Level " + level);

}

// Playing sound function
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

// function of animating pressed.
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel){

  // checking if the most recent user answer is the same as the game pattern.
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");
    //If the user got the most recent answer right then checking that they have finished their sequence with another if statement.
    if(gamePattern.length===userClickedPattern.length){
      // if the user has finished sequence then calling nextSequence after 1000milliseconds.
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else{
    console.log("wrong");
    // playing wrong sound if user click wrong button.
    playSound("wrong");

    // adding game-over class to body for 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    // changing title to game over.
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // calling startOver because user has clicked wrong button.
    startOver();
  }
}

// function startOver
function startOver(){
  level = 0;
  gamePattern = [];
  started = !started;
}
