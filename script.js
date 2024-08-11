const question = [
    {
        question: "Which is the largest animal in the world?",
        answer: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "What is the capital of France?",
        answer: [
            { text: "Lyon", correct: false },
            { text: "Marseille", correct: false },
            { text: "Paris", correct: true },
            { text: "Nice", correct: false },
        ]
    },
    {
        question: "In which year did World War II end?",
        answer: [
            { text: "1943", correct: false },
            { text: "1955", correct: false },
            { text: "1954", correct: false },
            { text: "1945", correct: true },
        ]
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        answer: [
            { text: "Mars", correct: true },
            { text: "Earth", correct: false },
            { text: "Moon", correct: false },
            { text: "Sun", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button"); // Fixed the variable name
const nextButton = document.getElementById("next-btn");
const highScoreElement = document.getElementById("high-score");

let currentQuestionIndex = 0;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    answerButton.innerHTML = "";
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    disableButtons();

    if (currentQuestionIndex === question.length - 1) {
        updateHighScore();
        showScore();
    } else {
        nextButton.style.display = "block";
    }
}

function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore); 
        highScoreElement.innerText = `High Score: ${highScore}`;
    }
}

function disableButtons() {
    Array.from(answerButton.children).forEach(button => {
        button.disabled = true;
    });
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < question.length) {
        showQuestion();
        nextButton.style.display = "none";
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function resetState() {
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";
    questionElement.innerHTML = "";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < question.length) {
        nextQuestion();
    } else {
        startQuiz();
    }
});

startQuiz();
highScoreElement.innerText = `High Score: ${highScore}`;
 