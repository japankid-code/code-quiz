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
// create list of questionObjects
    // answers will be a list inside the object, use questionObj[i].answers[i] to ref
let questionObjs = [{}, {}, {}, {}, {}];
// create timer function for remaining time
let remainingTime = function() {};

// create intro function that displays the rules using questionObj[0] properties
    //pressing start will run playGame()

// create playGame() containing game logic
    // if there is time remaing, or (questionObj[i] !== undefined) there are questions left
    // fill in question prompt and answer buttons from questionObj
    // while generating buttons for each answer, increment on data-type-id
    for (let i = 0; i < questionObj.answers.length; i++) {}

    // on correct answer, value of data-type-id=n === questionObj[i].answers[n], continue

    //on wrong answer, subtract from the time remaining

// create a buttonHandler() to preventdefault on all buttons

// create event listener
    // add function to delegate clicks to buttons by data-type-id
