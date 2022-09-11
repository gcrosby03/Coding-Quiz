var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var progressText = document.querySelector('#progress-text');
var scoreText = document.querySelector('#score');
var progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestion = []

let questions = [
    {
        question: 'What is 2+2',
        choice1: '2',
        choice2: '4',
        choice3: '7',
        choice4: '6',
        answer: 2,
    },
    {
        question: 'What is 2+2',
        choice1: '2',
        choice2: '4',
        choice3: '7',
        choice4: '6',
        answer: 2,
    },
    {
        question: 'What is 2+2',
        choice1: '2',
        choice2: '4',
        choice3: '7',
        choice4: '6',
        answer: 2,
    },
    {
        question: 'What is 2+2',
        choice1: '2',
        choice2: '4',
        choice3: '7',
        choice4: '6',
        answer: 2,
    },
    {
        question: 'What is 2+2',
        choice1: '2',
        choice2: '4',
        choice3: '7',
        choice4: '6',
        answer: 2,
    }
]

const SCORE_POINTS = 20;
const MAX_QUESTIONS = 5;

function startQuiz() {
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions]
    getNewQuestion()
}

function getNewQuestion() {
    if (availableQuestion.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return endQuiz()
    }
    questionCounter++
    progressText.innerHTML = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    var questionsIndex = Math.floor(Math.random() * availableQuestion.length)
    currentQuestion = availableQuestion[questionsIndex]
    question.innerHTML = currentQuestion.question

    choices.forEach(choice => {
        var number = choice.dataset['number']
        choice.innerHTML = currentQuestion['choice' + number]
    })

    availableQuestion.splice(questionsIndex, 1)
    acceptingAnswers = true
}

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

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
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

window.onload = function () {
    var fiveMinutes = 60 * 5,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};

function endQuiz() {
    window.location = "./end.html";
}

