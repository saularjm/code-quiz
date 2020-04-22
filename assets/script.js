// Grab elements and assign to variables
var startBtn = document.querySelector("#start-button");
var timeRem = document.querySelector("#time-rem");
var gamePage = document.querySelector("#game-page");
var viewHigh = document.querySelector("#view-hs");
var startPage = document.querySelector("#start-page");
var gameOverPage = document.querySelector("#gameover-page");
var timeDisplay = document.querySelector("#timer");
var gameOverHeader = document.querySelector("#game-over");
var finalScoreHeader = document.querySelector("#final-score");
var input = document.querySelector("#name-input");
var highScorePage = document.querySelector("#high-scores-page");
var submitScoreBtn = document.querySelector("#button-addon2");
var list = document.querySelector("#high-scores-list");
var restart = document.querySelector("#restart-button");

// Begin with Start Page showing
startPage.style.display = "block";
gamePage.style.display = "none";
gameOverPage.style.display = "none";
highScorePage.style.display = "none";

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

  count = 0;
  timeLeft = 60; 
  score = 0;

  startPage.style.display = "none";
  gamePage.style.display = "block";
  gameOverPage.style.display = "none";
  highScorePage.style.display = "none";
  timeDisplay.style.display = "initial";

  startTimer();
  renderQuestion();
}
startBtn.addEventListener("click", startQuiz);
restart.addEventListener("click", startQuiz);

// View High Scores link function
viewHigh.addEventListener("click", function(event) {
  event.preventDefault();

  startPage.style.display = "none";
  gamePage.style.display = "none";
  timeDisplay.style.display = "none";
  viewHigh.style.display = "none";
  gameOverPage.style.display = "none";
  highScorePage.style.display = "block";
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
      gameOverPage.style.display = "block";
      highScorePage.style.display = "none";
    }
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
  
  if(timeLeft <= 0) {
    clearInterval(timer);
    gameOverHeader.textContent = "Game over!";
    finalScoreHeader.textContent = "Your final score is: " + score + "/3";
    startPage.style.display = "none";
    gamePage.style.display = "none";
    timeDisplay.style.display = "none";
    viewHigh.style.display = "none";
    gameOverPage.style.display = "block";
    highScorePage.style.display = "none";
  }  
  },1000);
}

var highScores = [];

init();

function renderScores() {
  // Clear list element
  list.innerHTML = "";

  // Render a new li for each high score
  for (var i = 0; i < highScores.length; i++) {
    var hiSc = highScores[i];

    var li = document.createElement("li");
    li.textContent = hiSc;
    list.appendChild(li);
  }
}

function init() {
  // Check if there are high scores in localStorage
  // If so, parse the value from localStorage and assign it to the highScores variable
  if (localStorage.getItem("scores") !== null) {
    var storedScores = localStorage.getItem("scores");
    storedScores = JSON.parse(storedScores);
    highScores = storedScores;

    // Re-render the list
    renderScores();
  }
}

function storeScores() {
  // Stringify the highScores array and save it to the "scores" key in localStorage
  localStorage.setItem("scores",JSON.stringify(highScores));
}

// When score is submitted
submitScoreBtn.addEventListener("click", function(event) {
  event.preventDefault();

  // Display high scores page
  gameOverPage.style.display = "none";
  highScorePage.style.display = "block";

  var scoreText = input.value.trim() + " - " + score;

  // Return from function early if submitted scoreText is blank
  if (scoreText === "") {
    return;
  }

  // Add new scoreText to highScores array, clear the input
  highScores.push(scoreText);
  input.value = "";

  // Store updated high scores in localStorage, re-render the list
  storeScores();
  renderScores();
});


