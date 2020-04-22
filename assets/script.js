// Grab elements and assign to variables
var startBtn = document.querySelector("#start-button");
var timeRem = document.querySelector("#time-rem");
var gamePage = document.querySelector("#game-page");
var viewHigh = document.querySelector("#view-hs");
var startPage = document.querySelector("#start-page");
var scoresPage = document.querySelector("#scores-page");
var timeDisplay = document.querySelector("#timer");
var gameOverHeader = document.querySelector("#game-over");
var finalScoreHeader = document.querySelector("#final-score");
var input = document.querySelector("#name-input");

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

// Variables
var count = 0;
var timeLeft = 60; 
var score = 0; 

// Create HTML element for questions
var qDiv = document.createElement("h2");
qDiv.id = "q";
qDiv.className = "mb-4";
gamePage.appendChild(qDiv);
var br = document.createElement("br");
qDiv.appendChild(br);

// Start button function 
function startQuiz(event) {
  event.preventDefault();

  startPage.style.display = "none";
  gamePage.style.display = "block";

  startTimer();
  renderQuestion();

}
startBtn.addEventListener("click", startQuiz);

// View High Scores link function
viewHigh.addEventListener("click", function(event) {
  event.preventDefault();

  startPage.style.display = "none";
  gamePage.style.display = "none";
  timeDisplay.style.display = "none";
  viewHigh.style.display = "none";
  scoresPage.style.display = "block";
})

// Function to render questions
function renderQuestion() {

  if (timeLeft > 0) {
    // If there are still questions left, render next question
    if (count < questions.length) {
      qDiv.textContent = questions[count].question;
      createButtons();
    }
    // Else, show scores page
    else {
      gameOverHeader.textContent = "Game over!";
      finalScoreHeader.textContent = "Your final score is: " + score + "/3";
      startPage.style.display = "none";
      gamePage.style.display = "none";
      timeDisplay.style.display = "none";
      viewHigh.style.display = "none";
      scoresPage.style.display = "block";
    }
  }
  else if (timeLeft === 0) {
    gameOverHeader.textContent = "Game over!";
    finalScoreHeader.textContent = "Your final score is: " + score + "/3";
    startPage.style.display = "none";
    gamePage.style.display = "none";
    timeDisplay.style.display = "none";
    viewHigh.style.display = "none";
    scoresPage.style.display = "block";
  }
}

// Function to render buttons for questions
function createButtons() {
  var btnDiv = document.createElement("div");
  btnDiv.className = "mt-5";
  qDiv.appendChild(btnDiv);

  var btnA = document.createElement("button");
  btnA.textContent = questions[count].answers.a;
  btnA.id = "a";
  btnA.className = "btn btn-info";
  btnDiv.appendChild(btnA);

  var btnB = document.createElement("button");
  btnB.textContent = questions[count].answers.b;
  btnB.id = "b";
  btnB.className = "btn btn-info mx-3";
  btnDiv.appendChild(btnB);

  var btnC = document.createElement("button");
  btnC.textContent = questions[count].answers.c;
  btnC.id = "c";
  btnC.className = "btn btn-info";
  btnDiv.appendChild(btnC);
}

// Function to handle button click for answers
function handleClick(event) {
  event.preventDefault();

  if (event.target.matches("button")) {
    var currentId = event.target.id;

    if (currentId === questions[count].correctAnswer) {
      count++;
      score++;
      renderQuestion();
    }
    else {
      timeLeft -= 10;
    }
  }
}
gamePage.addEventListener("click", handleClick);

// Timer function
function startTimer() {
  
  var timer = setInterval(function(){
  timeLeft--;
  timeRem.textContent = timeLeft;
  if(timeLeft === 0)
    clearInterval(timer);
  },1000);
}
