var question = document.querySelector('#question');
var choices = Array.from(document.querySelector('.choice-text'));
var progressText = document.querySelector('#progressText');
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