// clicking the start button starts the timer and presents a question
// answering the question correctly leads to another question
// wrong answers subtract from the time remaining
// if all questions are answered or timer reaches 0:
// quiz is finished
// prompt to enter in initials and save score in a list
// user scores are stored in local storage for the high score list

// let all the elements and variables we'll need to use
// dont forget to add classes in html
let questionEl = document.getElementById("question-text");
let answerEl = document.getElementById("answer-form")
let timerEl = document.getElementById("time-left")
let descriptionP = document.getElementById("description");

let timeLeft = 80;

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
    },
    {
        question: "question 2 text",
        answers: [
            '1',
            '2',
            '3',
            '4'
        ],
    },
    {
        question: "question 3 text",
        answers: [
            '1',
            '2',
            '3',
            '4'
        ],
    },
    {
        question: "question 4 text",
        answers: [
            '1',
            '2',
            '3',
            '4'
        ],
    },
    {
        question: "question 5 text",
        answers: [
            '1',
            '2',
            '3',
            '4'
        ],
    }
]

// create timer function for remaining time
let countdown = function(timeLeft) {
    let timeInterval = setInterval(function() {
      // As long as the `timeLeft` is greater than 1
        if (timeLeft > 1) {
            // Set the `textContent` of `timerEl` to show the remaining seconds
            timerEl.textContent = `${timeLeft} seconds remaining.`;
            timeLeft--;
            return timeLeft;
        } else if (timeLeft === 1) {
            timerEl.textContent = `${timeLeft} second remaining.`;
            timeLeft--;
            return timeLeft;
        } else {
            timerEl.textContent = '';
            clearInterval(timeInterval);
            return timeLeft;
        }
    }, 1000); // runs once per second
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
        answerButton.addEventListener("click", nextRound)
    });
    
}

// create startGame() containing game logic
let startGame = function() {
    countdown(timeLeft);
    answerEl.removeEventListener("submit", startGame);
    // fill in first prompt and answer buttons from questionList
    questionMaker();
}

let nextRound = function(e) {
    // calculate user score here using e.target, comparing to answerList (the button)
    answerList = Array.from(answerEl.children)
    console.log(e.target)
    questionList.shift();
    questionMaker(questionList);
}

// create a buttonHandler() to preventdefault on all buttons
var buttonHandler = function(e) {
    descriptionP.remove();
    e.preventDefault();
    startGame();
}

// create event listener
    // add function to delegate clicks to buttons by data-type-id
answerEl.addEventListener("submit", buttonHandler);
