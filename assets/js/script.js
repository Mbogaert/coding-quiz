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

// functions
function timer() {
    var timeLeft = 90;

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
}

function startQuestions() {
    timer();
    mainQuiz.innerHTML = "";
}


// function enterHighScore() {}

// event listeners (DOM)

startBtn.onclick = startQuestions; 