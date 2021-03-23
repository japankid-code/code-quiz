// clicking the start button starts the timer and presents a question
// answering the question correctly leads to another question
// wrong answers subtract from the time remaining
// if all questions are answered or timer reaches 0:
// quiz is finished
// prompt to enter in initials and save score in a list
// user scores are stored in local storage for the high score list

// let all the elements and variables we'll need to use
// dont forget to add classes in html
let questionEl = document.querySelector("#question-text");
let answerEl = document.querySelector("#answer-form")
let timerEl = document.querySelector("#time-left")

let timeLeft = 80;

function emptyChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// create list of questionListects
    // answers will be a list inside the object, use questionList[i].answers[i] to ref
let questionList = [
    {
        question: "Welcome to the code quiz!",
        answers: [
            "Try to answer the coding question within the time limit. Wrong answers subtract from your score!",
            "ready"
        ],
    },
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
let countdown = function() {
    var timeLeft = 80;
    var timeInterval = setInterval(function() {
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
    //pressing start will run playGame()
let intro = function(e) {
    questionEl.textContent = questionList[0].question;
    emptyChildren(answerEl);
    answerP = document.createElement("p");
    answerP.textContent = questionList[0].answers[0];
    readyButton = document.createElement("button");
    readyButton.textContent = questionList[0].answers[1];
    answerEl.appendChild(answerP);
    answerEl.appendChild(readyButton);
    playGame(e);
}

// create playGame() containing game logic
let playGame = function(e) {
    // fill in question prompt and answer buttons from questionList
    // generate question text content `${questionList[q].question}`
    if (timeLeft > 0) {
        for (let q = 1; q < questionList.length; q++) {
            console.log(q);
            // if there is time remaing, or there are questions left
            if (questionList[q] === undefined) {
                console.log("no more questions");
                // generate buttons for each answer in answers
            } else {
                for (let a = 0; a < questionList[q].answers.length; a++) {
                    console.log(a);
                    // textContent `${questionList[q].answers[a]}`
                    // need something that will wait for a click after generating all this stuff
                    // accepting click event target's id value to determine correctness
                    // while generating buttons for each answer, increment on data-type-id
                }
            }
            // on correct answer, value of event target's 
                // data-type-id=n === questionList[i].answers[n], continue
            //on wrong answer, subtract from the time remaining
        }
    }
}
// create a buttonHandler() to preventdefault on all buttons
var buttonHandler = function(e) {
    e.preventDefault();
    console.log(e.target);
    intro(e);
}

// create event listener
    // add function to delegate clicks to buttons by data-type-id
answerEl.addEventListener("click", buttonHandler)

intro();