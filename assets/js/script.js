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

// let timeLeft = 80;

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
let countdown = function() {
    timeLeft = localStorage.getItem("timeLeft")
    let timeInterval = setInterval(function() { // starts the timer
        if (timeLeft > 1) {
            // Set the `textContent` of `timerEl` to show the remaining seconds
            timerEl.textContent = `${timeLeft} seconds remaining.`;
            timeLeft--;
            saveTimeLeft(timeLeft); // save to localStorage after update
        } else if (timeLeft === 1) {
            timerEl.textContent = `${timeLeft} second remaining.`;
            timeLeft--;
            saveTimeLeft(timeLeft);
        } else {
            timerEl.textContent = '';
            clearInterval(timeInterval);
        }
        return timeLeft;
    }, 1000); // runs once per second
    return timeLeft;
}
// create intro function that displays the rules using questionList[0] properties
    //pressing start will run startGame()

let questionMaker = function(q) {
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
let startGame = function(e) {
    answerEl.removeEventListener("submit", startGame);
    // fill in first prompt and answer buttons from questionList
    questionMaker(e);
}

let nextRound = function(e) {
    let targetEl = e.target;
    // calculate user score here using e.target, comparing to answerList (the buttons)
    answerList = Array.from(answerEl.children)
    // checking the first question
    if (targetEl === answerList[1]) {
        console.log(answerList);
        questionList.shift();
        questionMaker(questionList);
    } else {
        timeLeft = timeSkip();
        questionList.shift();
        questionMaker(questionList);
    }
}

let submitScore = function(e) {
    emptyChildren(questionSection);
    questionSection.insertAdjacentHTML(
        `afterbegin`,
        `<p>add your initials here and submit the score!!</p>
        <button id="submit-score">submit score</button>
        </form>
        <div class="divider"></div>
        <em><span id="result">great work!</span></em>`
    );
}

let saveTimeLeft = function(value) {
    localStorage.setItem("timeLeft", value);
}

let timeSkip = function() {
    let timeLeft = localStorage.getItem("timeLeft");
    timeLeft -= 10;
    // debugger;
    console.log(timeLeft);
    saveTimeLeft(timeLeft);
    return timeLeft;
}

// create a buttonHandler() to preventdefault on all buttons
var buttonHandler = function(e) {
    e.preventDefault();
    let timeLeft = 100;
    localStorage.setItem("timeLeft", timeLeft);
    descriptionP.remove();
    countdown(timeLeft);
    startGame(e);
}

// create event listener
    // add function to delegate clicks to buttons by data-type-id
readyButton.addEventListener("click", buttonHandler);
