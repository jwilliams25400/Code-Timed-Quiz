// DOM
var quizEl = document.getElementById("quiz-container");
var results = document.getElementById("results");
var scoreEl = document.getElementById("your-score");
var countDown = document.getElementById("timer");
var startBtn = document.getElementById("beginbtn");
var quizPage = document.getElementById("main");
var finishBtn = document.getElementById("playclearbtn");
var submitBtn = document.getElementById("submit");
var userScoreDisplay = document.getElementById("user-hs");
var rankContainer = document.getElementById("league-leader-container");
var ranksEl = document.getElementById("ranks");
var nameEl = document.getElementById("initials");
var displayName = document.getElementById("leader-initials");
var doneEl = document.getElementById("game-over");
var questionsEl = document.getElementById("questions");

//global variables
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Sports Questions
var sportsQuestionsArr = [
  {
    question: "which NBA player has won the most championship rings?",
    optionA: "Kareem Abdul-Jabbar",
    optionB: "Bill Russell",
    optionC: "Michael Jordan",
    optionD: "Magic Johnson",
    answer: "b",
  },

  {
    question: "which NHL player has the most goals?",
    optionA: "Mike Gartner",
    optionB: "Brendan Shananhan",
    optionC: "Wayne Gretzky",
    optionD: "Mark Recchi",
    answer: "c",
  },

  {
    question: "which NBL player has the most Home Runs?",
    optionA: "Alex ARod Rodriguez",
    optionB: "Ken Griffey Jr",
    optionC: "Babe Ruth",
    optionD: "Barry Bonds",
    answer: "d",
  },

  {
    question: "which NBA player has won the most championship rings?",
    optionA: "Kareem Abdul-Jabbar",
    optionB: "Bill Russell",
    optionC: "Michael Jordan",
    optionD: "Magic Johnson",
    answer: "b",
  },

  {
    question: "which WNBA player has won the most points?",
    optionA: "Lisa Leslie",
    optionB: "Candice pondexter",
    optionC: "Diana Taurasi",
    optionD: "Tamika Catchings",
    answer: "c",
  },

  {
    question: "which Soccer player has the most goals?",
    optionA: "Cristiano Ronaldo",
    optionB: "Lionel Messi",
    optionC: "Ferenc Puskas",
    optionD: "Romario",
    answer: "a",
  },

  {
    question: "which NFL player has the most yards?",
    optionA: "Emmitt Smith",
    optionB: "Jerry Rice",
    optionC: "Walter Payton",
    optionD: "Barry Sanders",
    answer: "b",
  },

  {
    question: "what is the nost points scored by one player in an NBA game?",
    optionA: "65",
    optionB: "79",
    optionC: "60",
    optionD: "100",
    answer: "d",
  },
];

var timeLeft = 30;
var timeInterval;
var curr = 0;
var correct;
var score = 0;
var lastQuestionIndex = sportsQuestionsArr.length;

// this function is intended circle through array of sport questions
function getSportsQuestion() {
  doneEl.style.display = "none";
  if (curr === lastQuestionIndex) {
    // for (var i = 0; i < sportsQuestionsArr.length; i++)
    return showScore();
  }
  // var currentQuestion = sportsQuestionsArr[currentQuestion];
  questionsEl.innerHTML = "<p>" + sportsQuestionsArr[curr].question + "</p>";
  buttonA.innerHTML = sportsQuestionsArr[curr].optionA;
  buttonB.innerHTML = sportsQuestionsArr[curr].optionB;
  buttonC.innerHTML = sportsQuestionsArr[curr].optionC;
  buttonD.innerHTML = sportsQuestionsArr[curr].optionD;
}

// start the quiz and the timer with same button
function beginQuiz() {
  doneEl.style.display = "none";
  quizPage.style.display = "none";
  getSportsQuestion();

  var timeLeft = 30;
  timeInterval = setInterval(function () {
    timeLeft--;
    countDown.textContent = "Remaining time: " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(timeInterval);
      alert("Time is Out, Try again");
      showScore();
    }
  }, 1000);
  quizEl.style.display = "block";
}

//end of quiz or time ran out
function showScore() {
  quizEl.style.display = "none";
  doneEl.style.display = "flex";
  clearInterval(timeInterval);
  nameEl.value = "";
  scoreEl.innerHTML = "Not bad, you scored " + score * 12.5 + "%";
}

//sumbit button show array or highscore with most recent users high score

if (submitBtn) // added if statement 
  {submitBtn.addEventListener("click", function highscores(event) {
    event.preventDefault
  if (nameEl.value === "") {
    alert("Enter Initials and live on forever!!!");
    return false;
  } else {
    // variables only used for user score
    var savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];
    var currentPlayer = nameEl.value.trim();
    var userHighscore = {
      name: currentPlayer,
      score: score,
    };
    doneEl.style.display = "none";
    // rankContainer.style.display = "flex";
    // ranksEl.style.display = "block";
    // finishBtn.style.display = "flex";

    savedScores.push(userHighscore);
    console.log(savedScores);
    localStorage.setItem("savedScores", JSON.stringify(savedScores));
    // generateHighscores();
  
  }
});
// clears high score and uses local storage to make new list of high scores
function generateHighscores() {
  displayName.innerHTML = "";
  userScoreDisplay.innerHTML = "";
  var highScores = JSON.parse(localStorage.getItem("savedScores")) || [];
  console.log(highScores)//Changed captailization 
  for (i = 0; i < highScores.length; i++) {
    var newInitials = document.createElement("li");
    var newScores = document.createElement("li");
    displayName.appendChild(newInitials);
    userScoreDisplay.appendChild(newScores);
  }
}

// clear local storage
function clearLocal() {
  window.localStorage.clear();
  displayName.textContent = "";
  userScoreDisplay.textContent = "";
}

// reset all variables
function playAgain() {
  rankContainer.style.display = "none";
  doneEl.style.display = "none";
  quizEl.style.display = "flex";
  timeLeft = 30;
  score = 0;
  currentQuestion = 0;
}

// check is response is correct
function checkAnswer(answer) {
  correct = sportsQuestionsArr[curr].answer;
  console.log(correct);
  console.log(answer);
  if (answer === correct) {
    score++;
  }
  console.log(score);
  curr++;
  getSportsQuestion();
}
 if(startBtn) //added if statement 
startBtn.addEventListener("click", beginQuiz);
