// Grab elements and assign to variables
var startBtn = document.querySelector("#start-button");
var timeRem = document.querySelector("#time-rem");
var gamePage = document.querySelector("#game-page");
var viewHigh = document.querySelector("#view-hs");
var startPage = document.querySelector("#start-page");
var scoresPage = document.querySelector("#scores-page");
var timeDisplay = document.querySelector("#timer");

// Begin with Start Page showing
startPage.style.display = "block";
gamePage.style.display = "none";
scoresPage.style.display = "none";

// Create questions array
var questions = [
    {
      question: "What does CSS stand for?",
      answers: {
        a: "Cool Style Selector",
        b: "Crazy Story Sim",
        c: "Cascading Style Sheets"
      },
      correctAnswer: "c"
    },
    {
      question: "How would you display an alert box in JavaScript?",
      answers: {
        a: "alert(msg);",
        b: "alertBox(msg);",
        c: "displayAlert(msg);"
      },
      correctAnswer: "a"
    },
    {
      question: "Which of the following is the name of a JavaScript file?",
      answers: {
        a: "code.java",
        b: "code.js",
        c: "script.javascript",
      },
      correctAnswer: "b"
    }
  ];

// Start button function - TBD
function startQuiz(event) {
  event.preventDefault();

  startPage.style.display = "none";
  gamePage.style.display = "block";

}

startBtn.addEventListener("click", startQuiz);

// View High Scores link function
viewHigh.addEventListener("click", function(event) {
  event.preventDefault();

  startPage.style.display = "none";
  gamePage.style.display = "none";
  timer.style.display = "none";
  viewHigh.style.display = "none";
  scoresPage.style.display = "block";
})
