// clicking the start button starts the timer and presents a question
// answering the question correctly leads to another question
// wrong answers subtract from the time remaining
// if all questions are answered or timer reaches 0:
// quiz is finished
// prompt to enter in initials and save score in a list
// user scores are stored in local storage for the high score list

// let all the elements we'll need to use
let questionText = document.querySelector("#question-text")
// create questionObj in an object
    // answers will be a list, use questionObj[i].answers[i] to ref
let questionObj = {};
// create timer function for remaining time
let remainingTime = function() {};
// create a buttonHandler() to preventdefault on all buttons

// create playGame() containing game logic
    // fill in question prompt and answer buttons from questionObj

    // while generating buttons for each answer, increment on data-type-id
    for (let i = 0; i < questionObj.answers.length; i++) {}

// create event listener
    // add function to delegate clicks to buttons by data-type-id