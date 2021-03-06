let questionSection = document.getElementById("question")
let questionEl = document.getElementById("question-text");
let answerEl = document.getElementById("answer-form")
let timerEl = document.getElementById("time-left")
let descriptionP = document.getElementById("description");
let readyButton = document.getElementById("ready");
let viewHighScore = document.getElementById("view-high-scores");
let resultEl = document.getElementById("result");

let userScores = [];

function emptyChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// create list of questions
let questionList = [
    {
        question: "Which is best to use when declaring a function expression in ES6?",
        answers: [
            'const',
            'let',
            'global',
            'var'
        ],
        correct: 0
    },
    {
        question: "Which HTML element do we put the JavaScript in?",
        answers: [
            '<javascript>',
            '<js>',
            '<svg>',
            '<script>'
        ],
        correct: 3
    },
    {
        question: "Javascript is a _____-side programming language.",
        answers: [
            'client',
            'server',
            'none',
            'both client and server'
        ],
        correct: 3
    },
    {
        question: `Which are the correct âifâ statements to execute certain code if âxâ is equal to 27?`,
        answers: [
            'if (x is 27)',
            'if (x === 52 / 2)',
            'if (x === 27)',
            'if x is 2:'
        ],
        correct: 2
    },
    {
        question: "Which is the correct way to write a setTimeout statement while carrying a parameter?",
        answers: [
            `setTimeout(doThis(e), 1000);`,
            'setTimeout(function() {doThis(e);}, 1000);',
            'setTimeout(doThis, 1000);',
            'setTimeout(doThis => {doThis(e);}, 1000);'
        ],
        correct: 1
    }
]

// create timer function for remaining time
const countdown = function() {
    timeLeft = localStorage.getItem("timeLeft")
    let timeInterval = setInterval(function() { // starts the timer
        if (timeLeft > 1) { // theres time left
            if (questionList.length > 0) { // and questions are left
                // Set  the `textContent` of `timerEl` to show the remaining seconds
                timerEl.textContent = `${timeLeft} seconds remaining.`;
                timeLeft--;
                saveTimeLeft(timeLeft); // save to localStorage after update
            } else if (questionList.length === 0) { // time left and all questions answered
                timerEl.textContent = `quiz finished!!`;
                saveTimeLeft(timeLeft);
                clearInterval(timeInterval);
                submitScore();
            }
        } else if (timeLeft === 1) { // one second left
            if (questionList.length > 0) { // and questions left
                timerEl.textContent = `${timeLeft} second remaining.`;
                timeLeft--;
                saveTimeLeft(timeLeft);
            }
        } else if (timeLeft === 0) { // no time left
            if (questionList.length > 0) { // and questions left
                timerEl.textContent = `time's up!!`;
                saveTimeLeft(timeLeft);
                clearInterval(timeInterval);
                if (questionList.length === 1) {submitScore();};
            }
        }
    }, 1000); // runs once per second
}

const saveTimeLeft = function(value) {
    localStorage.setItem("timeLeft", value);
}

const renderQuestion = function() {
    resultEl.textContent = '';
    questionEl.textContent = questionList[0].question;
    emptyChildren(answerEl);
    // generate buttons for each answer in answers
    let answers = questionList[0].answers;
    answers.forEach(function(answer, index) {
        let answerButton = document.createElement("button");
        answerButton.textContent = questionList[0].answers[index];
        answerEl.appendChild(answerButton);
        if (questionList.length > 1) {
            answerButton.addEventListener("click", function(e) {
                e.preventDefault();
                let targetEl = e.target;
                let correctIndex = questionList[0].correct;
                // using object property passed in as index to compare :) ty troy
                if (targetEl.textContent === questionList[0].answers[correctIndex]) {
                    resultEl.textContent = 'correct!';
                } else {
                    resultEl.textContent = 'WRONG!!';
                }
                let answers = Array.from(answerEl.children);
                answers.forEach(answer => answer.disabled = true);
                setTimeout(function() {
                    nextRound(e);
                }, 3000);
            })
        } else {
            answerButton.addEventListener("click", function(e) {
                e.preventDefault();
                let targetEl = e.target;
                let correctAnswer = questionList[0].correct;
                // using object property passed in as index to compare :) ty troy
                if (targetEl.textContent === questionList[0].answers[correctAnswer]) {
                    resultEl.textContent = 'correct!';
                } else {
                    resultEl.textContent = 'WRONG!!';
                }
                setTimeout(function() {
                    submitScore(e);
                }, 1000);
            });
        }
    });
    
}

//contains scoring logic
const nextRound = function(e) {
    let targetEl = e.target;
    let correctAnswer = questionList[0].correct;
    // using object property passed in as index to compare :) ty troy
    if (targetEl.textContent === questionList[0].answers[correctAnswer]) {
        questionList.shift();
        renderQuestion(questionList);
    } else {
        timeLeft = timeSkip();
        questionList.shift();
        renderQuestion(questionList);
    }
}

const submitScore = function(e) {
    if (questionList.length === 1) {
        questionList.shift();
    }
    emptyChildren(questionSection);
    // fill in the submit form with 
    let submitP = document.createElement("h3");
    submitP.textContent = `Your score was ${localStorage.getItem("timeLeft")}!
                           add your initials here and submit the score!!`;
    let submitInput = document.createElement("input");
    submitInput.setAttribute("id", "user-initials");
    let submitButton = document.createElement("button");
    submitButton.setAttribute("id", "submit-score");
    submitButton.textContent = `submit score`;
    let submitForm = document.createElement("form");
    submitForm.append(submitInput, submitButton);
    submitButton.addEventListener("click", function(e) {
        e.preventDefault();
        let currentScore = {
            initials: submitInput.value,
            score: timeLeft,
        }
        userScores.push(currentScore);
        submitInput.value = '';
        localStorage.setItem("localScores", JSON.stringify(userScores));
        renderHighScores();
    });
    questionSection.append(submitP, submitForm);
}

const loadScores = function() {
    if (localStorage.getItem("localScores") === null) {
        localStorage.setItem("localScores", JSON.stringify(userScores));
    }
    userScores = JSON.parse(localStorage.getItem("localScores"));
}

const renderHighScores = function() {
    timeLeft = 0;
    saveTimeLeft(timeLeft);
    emptyChildren(questionSection);
    let heading = document.createElement("h2");
    heading.textContent = `HIGH SCORES`;
    let divider1 = document.createElement("div");
    divider1.setAttribute("class", "divider");
    let divider2 = document.createElement("div");
    divider2.setAttribute("class", "divider");
    // sort the scores using the score value
    userScores.sort((a,b) => (a.score > b.score) ? -1 : 1);
    localStorage.setItem("localScores", JSON.stringify(userScores));
    let allScores = document.createElement("div");
    allScores.setAttribute("id", "all-scores");
    userScores.forEach(function(userScore, index) {
        let individualScore = document.createElement("div");
        individualScore.setAttribute("class", "ind-score");
        let initials = document.createElement("p");
        initials.setAttribute("class", "initals");
        initials.textContent = userScores[index].initials;
        let score = document.createElement("p");
        score.setAttribute("class", "score");
        score.textContent = userScores[index].score;
        individualScore.append(initials, score);
        allScores.append(individualScore);
    })
    // started working on button to play again, cant quite get it working
    // let playAgain = document.createElement("button");
    // playAgain.setAttribute("id", "ready");
    // playAgain.textContent = "ready to try again?";
    // playAgain.addEventListener("click", function(e){startGame();});
    questionSection.append(heading, divider1, allScores, divider2);
}

const timeSkip = function() {
    // subtracts from the time left
    let timeLeft = localStorage.getItem("timeLeft");
    timeLeft -= 10;
    saveTimeLeft(timeLeft);
    return timeLeft;
}

// create a startGame()
const startGame = function(e) {
    if (e !== undefined) {
        e.preventDefault();
    }
    let timeLeft = 100;
    localStorage.setItem("timeLeft", timeLeft);
    descriptionP.remove();
    countdown(timeLeft);
    renderQuestion();
}

// create event listener
readyButton.addEventListener("click", startGame);
viewHighScore.addEventListener("click", renderHighScores);
loadScores();