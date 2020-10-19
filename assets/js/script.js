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
firstBtn.className = "styleBtn";
var secondBtn = document.createElement("button");
secondBtn.value = secondBtn.innerText;
secondBtn.className = "styleBtn";
var thirdBtn = document.createElement("button");
thirdBtn.value = thirdBtn.innerText;
thirdBtn.className = "styleBtn";
var fourthBtn = document.createElement("button");
fourthBtn.value = fourthBtn.innerText;
fourthBtn.className = "styleBtn";
var returnBtn = document.createElement("button");
returnBtn.type = ("button");
returnBtn.id = "return";
returnBtn.innerText = "Return";
returnBtn.className = "styleBtn";

// arrays
var questionsArr = [
    {
        question: "What does HTML stand for",
        answersArr: ["Hyper Trainer Marking Language", "Hyper Text Marketing Language", "Hyper Text Markup Language", "Hyper Text Markup Leveler"],
        correct: "Hyper Text Markup Language"
    },
    {
        question: "During program development, software requirements specify",
        answersArr: ["How the program will accomplish the task", "What the task is that the program must perform", "How to divide the task into subtasks", "How to test the program when it is done"],
        correct: "What the task is that the program must perform"
    },
    {
        question: "Sal needs to execute a section of code ten times within a program. Compare the selection structures below and select which one meets the needs identified.",
        answersArr: ["If-Else", "For", "While", "If"],
        correct: "For"
    },
    {
        question: "A loop that never ends is referred to as a(n)_________.",
        answersArr: ["While loop", "Infinite loop", "Recursive loop", "Loopty Loop"],
        correct: "Infinite loop"
    },
    {
        question: "Which command will stop an infinite loop?",
        answersArr: ["Alt - C", "Shift - C", "Esc", "Ctrl - C"],
        correct: "Ctrl - C"
    }
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
        var showQuestion = document.createElement("h1");
        showQuestion.className = "question";
        showQuestion.innerText = questionsArr[presentQuestion].question;

        // creating the answers 
        var firstAnswer = document.createElement("li");
        firstBtn.innerText = questionsArr[presentQuestion].answersArr[0];
        firstAnswer.appendChild(firstBtn);

        var secondAnswer = document.createElement("li");
        secondBtn.innerText = questionsArr[presentQuestion].answersArr[1]; 
        secondAnswer.appendChild(secondBtn);

        var thirdAnswer = document.createElement("li");
        thirdBtn.innerText = questionsArr[presentQuestion].answersArr[2];
        thirdAnswer.appendChild(thirdBtn);

        var fourthAnswer = document.createElement("li");
        fourthBtn.innerText = questionsArr[presentQuestion].answersArr[3];
        fourthAnswer.appendChild(fourthBtn);

        // appending the questions onto the page
        mainQuiz.appendChild(showQuestion);
        mainQuiz.appendChild(firstAnswer);
        mainQuiz.appendChild(secondAnswer);
        mainQuiz.appendChild(thirdAnswer);
        mainQuiz.appendChild(fourthAnswer);

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
    enterScoreBtn.className = "styleBtn";

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
    viewScores();
}

function viewScores() {
    mainQuiz.innerHTML = "";
    timeLeft = 0; 


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
        scoreItemEl.className = "scoreItemEl";
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
