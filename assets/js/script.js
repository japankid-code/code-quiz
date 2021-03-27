// clicking the start button starts the timer and presents a question
// answering the question correctly leads to another question
// wrong answers subtract from the time remaining
// if all questions are answered or timer reaches 0:
// quiz is finished
// prompt to enter in initials and save score in a list
// user scores are stored in local storage for the high score list

// let all the elements and variables we'll need to use
// dont forget to add classes in html
let questionSection = document.getElementById("question")
let questionEl = document.getElementById("question-text");
let answerEl = document.getElementById("answer-form")
let timerEl = document.getElementById("time-left")
let descriptionP = document.getElementById("description");
let readyButton = document.getElementById("ready");

let userScores = [];

function emptyChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// create list of questions
    // answers will be a list inside the object, use questionList[i].answers[i] to ref
let questionList = [
    {
        question: "question 1 text",
        answers: [
            '1',
            '2',
            '3',
            '4'
        ],
        correct: 1,
        num: 1
    },
    {
        question: "question 2 text",
        answers: [
            '1',
            '2',
            '3',
            '4'
        ],
        correct: 2,
        num: 2
    },
    {
        question: "question 3 text",
        answers: [
            '1',
            '2',
            '3',
            '4'
        ],
        correct: 4,
        num: 3
    },
    {
        question: "question 4 text",
        answers: [
            '1',
            '2',
            '3',
            '4'
        ],
        correct: 3,
        num: 4
    },
    {
        question: "question 5 text",
        answers: [
            '1',
            '2',
            '3',
            '4'
        ],
        correct: 2,
        num: 5
    }
]

// create timer function for remaining time
const countdown = function() {
    timeLeft = localStorage.getItem("timeLeft")
    let timeInterval = setInterval(function() { // starts the timer
        if (questionList.length > 0) {
            if (timeLeft > 1) {
                // Set  the `textContent` of `timerEl` to show the remaining seconds
                timerEl.textContent = `${timeLeft} seconds remaining.`;
                timeLeft--;
                saveTimeLeft(timeLeft); // save to localStorage after update
            } else if (timeLeft === 1) {
                timerEl.textContent = `${timeLeft} second remaining.`;
                timeLeft--;
                saveTimeLeft(timeLeft);
            } else {
                timerEl.textContent = `time's up!!`;
                saveTimeLeft(timeLeft);
                clearInterval(timeInterval);
            }
            return timeLeft;
        } else {
            timerEl.textContent = `time's up!!`;
            saveTimeLeft(timeLeft);
            clearInterval(timeInterval);
            submitScore();
        }
    }, 1000); // runs once per second
    return timeLeft;
}
// create intro function that displays the rules using questionList[0] properties
    //pressing start will run startGame()

const renderQuestion = function() {
    questionEl.textContent = questionList[0].question;
    emptyChildren(answerEl);
    // generate buttons for each answer in answers
    let answers = questionList[0].answers;
    answers.forEach(function(index) {
        let answerButton = document.createElement("button");
        answerButton.textContent = questionList[0].answers[index - 1];
        answerEl.appendChild(answerButton);
        if (questionList.length === 1) {
            answerButton.addEventListener("click", submitScore);
        } else {
            answerButton.addEventListener("click", nextRound)
        }
    });
}

// create startGame() containing game logic
const startGame = function(e) {
    answerEl.removeEventListener("submit", startGame);
    // fill in first prompt and answer buttons from questionList
    renderQuestion(e);
}

const nextRound = function(e) {
    let targetEl = e.target;
    // calculate user score here using e.target, comparing to answerList (the buttons)
    answerList = Array.from(answerEl.children)
    let correctAnswer = questionList[0].correct;
    // using object property passed in as index to compare :) ty troy
    if (targetEl.textContent === questionList[0].answers[correctAnswer]) {
        console.log
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
        console.log(userScores);
        console.log(currentScore);
        userScores.push(currentScore);
        localStorage.setItem("localScores", JSON.stringify(userScores));
    });
    questionSection.append(submitP, submitForm);
}

const loadScores = function() {
    userScores = JSON.parse(localStorage.getItem("localScores"));
}

const saveTimeLeft = function(value) {
    localStorage.setItem("timeLeft", value);
}

const timeSkip = function() {
    let timeLeft = localStorage.getItem("timeLeft");
    timeLeft -= 10;
    // debugger;
    console.log(timeLeft);
    saveTimeLeft(timeLeft);
    return timeLeft;
}

// create a buttonHandler() to preventdefault on all buttons
const buttonHandler = function(e) {
    e.preventDefault();
    let timeLeft = 63;
    localStorage.setItem("timeLeft", timeLeft);
    descriptionP.remove();
    countdown(timeLeft);
    startGame(e);
}

// create event listener
    // add function to delegate clicks to buttons by data-type-id
readyButton.addEventListener("click", buttonHandler);
loadScores();