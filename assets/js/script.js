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
        question: "question 1 text",
        answers: [
            '1',
            '2',
            '3',
            '4'
        ],
        correct: 1
    },
    {
        question: "question 2 text",
        answers: [
            '1',
            '2',
            '3',
            '4'
        ],
        correct: 2
    },
    {
        question: "question 3 text",
        answers: [
            '1',
            '2',
            '3',
            '4'
        ],
        correct: 4
    },
    {
        question: "question 4 text",
        answers: [
            '1',
            '2',
            '3',
            '4'
        ],
        correct: 3
    },
    {
        question: "question 5 text",
        answers: [
            '1',
            '2',
            '3',
            '4'
        ],
        correct: 2
    }
]

// create timer function for remaining time
const countdown = function() {
    timeLeft = localStorage.getItem("timeLeft")
    let timeInterval = setInterval(function() { // starts the timer
        if (questionList.length > 1) {
            if (timeLeft > 1) {
                // Set  the `textContent` of `timerEl` to show the remaining seconds
                timerEl.textContent = `${timeLeft} seconds remaining.`;
                timeLeft--;
                saveTimeLeft(timeLeft); // save to localStorage after update
            } else if (timeLeft === 1) {
                timerEl.textContent = `${timeLeft} second remaining.`;
                timeLeft--;
                saveTimeLeft(timeLeft);
            } else { // time left is 0
                timerEl.textContent = `time's up!!`;
                alert("time is up!");
                saveTimeLeft(timeLeft);
                clearInterval(timeInterval);
                submitScore();
            }
        } else { // after the last question gets answered
            timerEl.textContent = `quiz finished!!`;
            saveTimeLeft(timeLeft);
            clearInterval(timeInterval);
            submitScore();
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
    answers.forEach(function(index) {
        let answerButton = document.createElement("button");
        answerButton.textContent = questionList[0].answers[index - 1];
        answerEl.appendChild(answerButton);
        if (questionList.length > 1) {
            answerButton.addEventListener("click", function(e) {
                e.preventDefault();
                answerList = Array.from(answerEl.children)
                let targetEl = e.target;
                let correctAnswer = questionList[0].correct;
                // using object property passed in as index to compare :) ty troy
                if (targetEl.textContent === questionList[0].answers[correctAnswer]) {
                    resultEl.textContent = 'correct!';
                } else {
                    resultEl.textContent = 'WRONG!!';
                }
                setTimeout(function() {
                    nextRound(e);
                }, 1000);
            })
        } else {
            answerButton.addEventListener("click", function(e) {
                answerList = Array.from(answerEl.children)
                let targetEl = e.target;
                let correctAnswer = questionList[0].correct;
                // using object property passed in as index to compare :) ty troy
                if (targetEl.textContent === questionList[0].answers[correctAnswer]) {
                    resultEl.textContent = 'correct!';
                } else {
                    resultEl.textContent = 'WRONG!!';
                }
                e.preventDefault();
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
    // calculate user score here using e.target, comparing to answerList (the buttons)
    answerList = Array.from(answerEl.children)
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