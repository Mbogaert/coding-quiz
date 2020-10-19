"use strict";

// variables
var timerEl = document.getElementById("timer");
var startBtn = document.getElementById("start");
var mainQuiz = document.querySelector("main");
var highScoreBtn = document.getElementById("highScore");
var presentQuestion = 0;
var timeLeft = 90;
var score = 0;
// the answer choices as buttons
var firstBtn = document.createElement("button");
firstBtn.value = firstBtn.innerText;  // create the first answer button, set the value of the button to the text
var secondBtn = document.createElement("button");
secondBtn.value = secondBtn.innerText;
var thirdBtn = document.createElement("button");
thirdBtn.value = thirdBtn.innerText;
var fourthBtn = document.createElement("button");
fourthBtn.value = fourthBtn.innerText;
var returnBtn = document.createElement("button");
returnBtn.type = ("button");
returnBtn.id = "return";
returnBtn.innerText = "Return";

// arrays
var questionsArr = [
    {
        question: "QUESTION #1",
        answersArr: ["A1", "A2", "A3", "A4"],
        correct: "A1"
    },
    {
        question: "QUESTION #2",
        answersArr: ["B1", "B2", "B3", "B4"],
        correct: "B2"
    },
    {
        question: "QUESTION #3",
        answersArr: ["C1", "C2", "C3", "C4"],
        correct: "C3"
    },
    {
        question: "QUESTION #4",
        answersArr: ["D1", "D2", "D3", "D4"],
        correct: "D4"
    }
    // will add more questions later maybe
];


// functions
var startQuiz = function () {
    mainQuiz.innerHTML = "";
    timer();
    startQuestions();
}

function timer() {

    // use the set interval method to call a function to be executed every 1000 milliseconds (1 second)\
    var timeInterval = setInterval(function () {
        if (timeLeft >= 0) {
            timerEl.textContent = timeLeft;
            timeLeft = timeLeft - 1; // timeLeft -= 1; (is the same) and timer--;
        }

        if (timeLeft === 0) {
            timerEl.textContent = '';
            clearInterval(timeInterval);
            gameOver();
        }
    }, 1000);
};

function startQuestions() {
    // creating the questions 
    if (presentQuestion < questionsArr.length) {
        var showQuestion = document.createElement("ol");
        showQuestion.className = "question";
        showQuestion.innerText = questionsArr[presentQuestion].question;

        // creating the answers 
        var firstAnswer = document.createElement("li");
        firstBtn.innerText = questionsArr[presentQuestion].answersArr[0];
        firstBtn.value = questionsArr[presentQuestion].answersArr[0];
        firstAnswer.appendChild(firstBtn);

        var secondAnswer = document.createElement("li");
        secondBtn.innerText = questionsArr[presentQuestion].answersArr[1];
        secondBtn.value = questionsArr[presentQuestion].answersArr[1];
        secondAnswer.appendChild(secondBtn);

        var thirdAnswer = document.createElement("li");
        thirdBtn.innerText = questionsArr[presentQuestion].answersArr[2];
        thirdBtn.value = questionsArr[presentQuestion].answersArr[2];
        thirdAnswer.appendChild(thirdBtn);

        var fourthAnswer = document.createElement("li");
        fourthBtn.innerText = questionsArr[presentQuestion].answersArr[3];
        fourthBtn.value = questionsArr[presentQuestion].answersArr[3];
        fourthAnswer.appendChild(fourthBtn);

        // appending the questions onto the page
        mainQuiz.appendChild(showQuestion);
        mainQuiz.appendChild(firstBtn);
        mainQuiz.appendChild(secondBtn);
        mainQuiz.appendChild(thirdBtn);
        mainQuiz.appendChild(fourthBtn);

        firstBtn.addEventListener("click", checkAnswer);
        secondBtn.addEventListener("click", checkAnswer);
        thirdBtn.addEventListener("click", checkAnswer);
        fourthBtn.addEventListener("click", checkAnswer);
    }
    else {
        gameOver();
    }
};

function checkAnswer() {
    // removes the text
    mainQuiz.innerHTML = "";

    // checks answer
    if (questionsArr[presentQuestion].correct === this.innerText) {
        score = score + 1;
        presentQuestion = presentQuestion + 1;
        startQuestions();
    }
    else {
        timeLeft = timeLeft - 10;
        presentQuestion = presentQuestion + 1;
        startQuestions();
    };
};

function gameOver() {
    // reset the page to have nothing on the main area
    timeLeft = 0;
    mainQuiz.innerHTML = "";

    var endMessage = document.createElement("p");
    endMessage.innerText = "You have reached the end of the quiz.";
    var playerScore = document.createElement("p");
    playerScore.innerText = "Your score is " + score + ".";
    var input = document.createElement("input");
    input.id = "initials";
    input.placeholder = "Initials here";
    var form = document.createElement("form");

    var enterScoreBtn = document.createElement("button");
    enterScoreBtn.type = ("submit");
    enterScoreBtn.id = "enterScore";
    enterScoreBtn.innerText = "Submit Score";

    mainQuiz.appendChild(endMessage);
    mainQuiz.appendChild(playerScore);
    mainQuiz.appendChild(form);
    form.appendChild(input);
    mainQuiz.appendChild(enterScoreBtn);
    mainQuiz.appendChild(returnBtn);

    enterScoreBtn.addEventListener("click", function (event) {
        saveScoreInitials();
    });

    returnBtn.addEventListener("click", function (event) {
        location.reload();
    })
};

// checks to make sure the array exists and if not creates one
var existingScores = JSON.parse(localStorage.getItem("scores"))
if (existingScores === null) {
    existingScores = [];
};

function saveScoreInitials() {
    var initials = document.querySelector("#initials").value;

    var newScore = { initials: initials, score: score };

    // updates the array 
    existingScores.push(newScore);

    // updates to local Storage (puts it back)
    localStorage.setItem("scores", JSON.stringify(existingScores));
    location.reload();
}

function viewScores() {
    timeLeft = 0;
    mainQuiz.innerHTML = "";

    var highScoreList = document.createElement("ol");
    highScoreList.id = "scoreList";

    // get localStorage
    existingScores = localStorage.getItem("scores");

    if (existingScores === null) {
        existingScores = [];
        return false;
    };

    // convert from stringified version to an array of the object
    existingScores = JSON.parse(existingScores);

    for (var i = 0; i < existingScores.length; i++) {
        var scoreItemEl = document.createElement("li");
        scoreItemEl.textContent = existingScores[i].initials, existingScores[i].score;
        highScoreList.appendChild(scoreItemEl);
    };

    mainQuiz.appendChild(highScoreList);

    // mainQuiz.appendChild() // append the High Score List
    mainQuiz.appendChild(returnBtn);

    returnBtn.addEventListener("click", function (event) {
        location.reload();
    });
}


startBtn.addEventListener("click", startQuiz);

highScoreBtn.addEventListener("click", viewScores);
