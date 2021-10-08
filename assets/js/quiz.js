var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.answer-text'));
var scoreText = document.querySelector('#score');


let currentQuestion = {}
let acceptingAnswers = true
let score = 0 
let questionCounter = 0
let availableQuestions =[]

let questions = [
    {
        question: 'What color is the sky?', 
        choice1: 'red',
        choice2: 'green',
        choice3: 'blue',
        choice4: 'yellow',
        answer: 3,
    },
    {
        question: 'What is 5+37?', 
        choice1: '45',
        choice2: '54',
        choice3: '66',
        choice4: '42',
        answer: 4,
    },
    {
        question: 'How many pieces in a dozen?', 
        choice1: '4',
        choice2: '12',
        choice3: '15',
        choice4: '6',
        answer: 2,
    },
    {
        question: 'How many states in the USA?', 
        choice1: '52',
        choice2: '51',
        choice3: '50',
        choice4: '49',
        answer: 3,
    }
]

const MAX_QUESTIONS = 4
const SCORE_POINTS = 100

startQuiz = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }


questionCounter++


const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
currentQuestion = availableQuestions[questionsIndex]
question.innerText = currentQuestion.question

choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
})

//availableQuestions.splice(questionsIndex, 1)

acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore()
        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
}

startQuiz()