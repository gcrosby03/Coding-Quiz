var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var progressText = document.querySelector('#progress-text');
var scoreText = document.querySelector('#score');
var progressBarFull = document.querySelector('#progressBarFull');
var timer = 0;

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestion = []

let questions = [
    {
        question: 'What does HTML stand for?',
        choice1: 'Home Tool Markup Language',
        choice2: 'Hyper Text Markup Language',
        choice3: 'Hyperlinks and Text Markup Language',
        choice4: 'Hyper Text Marking Language',
        answer: 2
    },
    {
        question: 'Choose the correct HTML element for the largest heading:',
        choice1: '<head>',
        choice2: '<heading>',
        choice3: '<h1>',
        choice4: '<h6>',
        answer: 3
    },
    {
        question: 'What is the correct HTML element for inserting a line break?',
        choice1: '<break>',
        choice2: '<br>',
        choice3: '<lb>',
        choice4: '<breakpoint>',
        answer: 2
    },
    {
        question: 'How can you make a numbered list?',
        choice1: '<ul>',
        choice2: '<ol>',
        choice3: '<list>',
        choice4: '<dl>',
        answer: 2
    },
    {
        question: 'Which character is used to indicate an end tag?',
        choice1: '^',
        choice2: '/',
        choice3: '*',
        choice4: '<',
        answer: 2
    }
];

const SCORE_POINTS = 20;
const MAX_QUESTIONS = 5;

// Created a function to start the quiz
function startQuiz() {
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions]
    getNewQuestion()
}

// This is how we get a new question and chooses a random order of the questions
function getNewQuestion() {
    if (availableQuestion.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return endQuiz()
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    var questionsIndex = Math.floor(Math.random() * availableQuestion.length)
    currentQuestion = availableQuestion[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        var number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestion.splice(questionsIndex, 1)
    acceptingAnswers = true
}

// This we are listening for a "click" on a choice. Then either turn green or red depending on answer choice
// we then increment the score, and decrement time if answered incorrectly, then call for a new question
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        var selectedChoice = e.target
        var selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        
        else {
            decrementTime()
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
});

incrementScore = num => {
    score += num
    scoreText.innerHTML = score
}

startQuiz()

//This function will start the timer when started the quiz and will end and go back to home if time runs out
function startTimer(duration, display) {
   timer = duration;
   var minutes;
   var seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
            endQuiz();
            clearInterval(end);
        }
    }, 1000);
}

function decrementTime() {
 timer -= 60;
}

window.onload = function () {
    var fiveMinutes = 60 * 5,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};

function endQuiz() {
    window.location = "./end.html";
}

