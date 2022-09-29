var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];


function makeSound(colour) {
  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();
}

function animatePress(colour) {
  $("#" + colour).addClass("pressed");
  setTimeout(function() {
    $("#" + colour).removeClass("pressed");
  }, 100)
}


function nextSequence() {
  level += 1;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(200).fadeIn(200);
  makeSound(randomChosenColour);

  userClickedPattern = [];

}

function checkAnswer(lastAnswerIndex) {
  if (userClickedPattern[lastAnswerIndex] === gamePattern[lastAnswerIndex]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 500);
    }
  } else {
    makeSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  $(document).keydown(function() {
    if (gamePattern.length == 0) {
      $("#level-title").text("Level " + level);
      nextSequence();
    }
  })
}

startOver();

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  makeSound(userChosenColour);
  var lastAnswerIndex = userClickedPattern.length - 1;
  checkAnswer(lastAnswerIndex);
})
