"use strict";

// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score

// variables
var timerEl = document.getElementById("timer");
var startBtn = document.getElementById("start");
var mainQuiz = document.querySelector("main");
var presentQuestion = 0;
var timeLeft = 90;
// the answer choices as buttons
var firstBtn = document.createElement("button");
firstBtn.value = firstBtn.innerText;  // create the first answer button, set the value of the button to the text
var secondBtn = document.createElement("button");
secondBtn.value = secondBtn.innerText;
var thirdBtn = document.createElement("button");
thirdBtn.value = thirdBtn.innerText;
var fourthBtn = document.createElement("button");
fourthBtn.value = fourthBtn.innerText;

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
var startQuiz = function() {
    mainQuiz.innerHTML = "";
    timer();
    startQuestions();
}

function startQuestions() {
    // creating the questions 
    if (presentQuestion < questionsArr.length) {
        var showQuestion = document.createElement("ul");
        showQuestion.className = "question";
        showQuestion.innerText = questionsArr[presentQuestion].question;

        // creating the answers 
        var firstAnswer = document.createElement("li");
        firstBtn.innerText = questionsArr[presentQuestion].answersArr[0];
        firstBtn.value = questionsArr[presentQuestion].answersArr[0];
        firstAnswer.appendChild(firstBtn);

        var secondAnswer = document.createElement("li");
        secondBtn.textContent = questionsArr[presentQuestion].answersArr[1];
        secondAnswer.appendChild(secondBtn);

        var thirdAnswer = document.createElement("li");
        thirdBtn.textContent = questionsArr[presentQuestion].answersArr[2];
        thirdAnswer.appendChild(thirdBtn);

        var fourthAnswer = document.createElement("li");
        fourthBtn.textContent = questionsArr[presentQuestion].answersArr[3];
        fourthAnswer.appendChild(fourthBtn);

        // appending the questions onto the page
        mainQuiz.appendChild(showQuestion);
        mainQuiz.appendChild(firstBtn);
        mainQuiz.appendChild(secondBtn);
        mainQuiz.appendChild(thirdBtn);
        mainQuiz.appendChild(fourthBtn);
    };
};

// function enterHighScore() {}


startBtn.addEventListener("click", startQuiz);

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
            // enterHighScore();
        }
    }, 1000);
};
