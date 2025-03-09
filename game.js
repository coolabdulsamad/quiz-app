const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// ✅ Manually Added Questions (No API)
let questions = [
    {
        question: "What is the capital of France?",
        choice1: "London",
        choice2: "Berlin",
        choice3: "Paris",
        choice4: "Madrid",
        answer: 3
    },
    {
        question: "Which programming language is used for web development?",
        choice1: "Python",
        choice2: "Java",
        choice3: "C++",
        choice4: "JavaScript",
        answer: 4
    },
    {
        question: "What is 5 + 3?",
        choice1: "5",
        choice2: "8",
        choice3: "10",
        choice4: "15",
        answer: 2
    },
     // ✅ Added New Questions for branch 1
     {
        question: "What is the largest planet in our solar system?",
        choice1: "Earth",
        choice2: "Mars",
        choice3: "Jupiter",
        choice4: "Venus",
        answer: 3
    },
    {
        question: "What is the square root of 64?",
        choice1: "6",
        choice2: "8",
        choice3: "10",
        choice4: "12",
        answer: 2
    },
    // ✅ Added More Questions for branch 2
    {
        question: "Which continent is the largest by land area?",
        choice1: "Africa",
        choice2: "Asia",
        choice3: "Europe",
        choice4: "North America",
        answer: 2
    },
    {
        question: "Who painted the Mona Lisa?",
        choice1: "Vincent van Gogh",
        choice2: "Pablo Picasso",
        choice3: "Leonardo da Vinci",
        choice4: "Claude Monet",
        answer: 3
    },
    {
        question: "What gas do plants absorb from the atmosphere?",
        choice1: "Oxygen",
        choice2: "Carbon Dioxide",
        choice3: "Nitrogen",
        choice4: "Hydrogen",
        answer: 2
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        choice1: "Gold",
        choice2: "Oxygen",
        choice3: "Silver",
        choice4: "Iron",
        answer: 2
    },
    {
        question: "What is the boiling point of water in Celsius?",
        choice1: "50°C",
        choice2: "75°C",
        choice3: "100°C",
        choice4: "150°C",
        answer: 3
    }
];

// ✅ Start the Game (Fix: Ensure Loader is Removed)
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];

    // 🔥 Fix: Make sure the game is visible & loader is hidden
    game.classList.remove('hidden');
    loader.style.display = "none";  

    getNewQuestion();
};

// ✅ Get Next Question
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= questions.length) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('./end.html'); // Go to end page
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${questions.length}`;
    progressBarFull.style.width = `${(questionCounter / questions.length) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

// ✅ Handle Answer Selection
choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(10);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

// ✅ Update Score
incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

// ✅ Fix: Start Game when page loads
window.onload = () => {
    startGame();
};
