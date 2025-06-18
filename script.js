const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false }
        ]
    },
    {
        question: "Which country has the most natural lakes?",
        answers: [
            { text: "Russia", correct: false },
            { text: "Canada", correct: true },
            { text: "Brazil", correct: false },
            { text: "USA", correct: false }
        ]
    },
    {
        question: "Which is the deepest point on Earth?",
        answers: [
            { text: "Mariana Trench", correct: true },
            { text: "Tonga Trench", correct: false },
            { text: "Java Trench", correct: false },
            { text: "Puerto Rico Trench", correct: false }
        ]
    },
    {
        question: "What is the rarest blood type in humans?",
        answers: [
            { text: "A-", correct: false },
            { text: "B-", correct: false },
            { text: "AB-", correct: true },
            { text: "O-", correct: false }
        ]
    },
    {
        question: "Which Nobel Prize category was introduced last?",
        answers: [
            { text: "Economics", correct: true },
            { text: "Peace", correct: false },
            { text: "Literature", correct: false },
            { text: "Medicine", correct: false }
        ]
    },
    {
        question: "Which is the oldest known written language?",
        answers: [
            { text: "Latin", correct: false },
            { text: "Sanskrit", correct: false },
            { text: "Cuneiform", correct: true },
            { text: "Greek", correct: false }
        ]
    },
    {
        question: "What is the second most spoken language in the world by native speakers?",
        answers: [
            { text: "English", correct: false },
            { text: "Hindi", correct: false },
            { text: "Spanish", correct: true },
            { text: "Arabic", correct: false }
        ]
    },
    {
        question: "Which scientist proposed the heliocentric model of the solar system?",
        answers: [
            { text: "Ptolemy", correct: false },
            { text: "Copernicus", correct: true },
            { text: "Kepler", correct: false },
            { text: "Galileo", correct: false }
        ]
    },
    {
        question: "Which country was formerly known as Abyssinia?",
        answers: [
            { text: "Sudan", correct: false },
            { text: "Ethiopia", correct: true },
            { text: "Somalia", correct: false },
            { text: "Libya", correct: false }
        ]
    }
]


const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
let timer;
let timeLeft = 10;
const timerElement = document.getElementById('timer');
const exitButton = document.getElementById('exit-btn');


let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function autoSelectAnswer() {
    const buttons = Array.from(answerButtons.children);
    buttons.forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

function startTimer() {
    timeLeft = 10;
    timerElement.innerHTML = `Time left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerHTML = `Time left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            autoSelectAnswer();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function selectAnswer(e) {
    stopTimer();
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score += 1;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct == "true") {
            button.classList.add("correct")
        }
        button.disabled = true;
    })
    nextButton.style.display = 'block';
}

function showQuestion() {
    resetButton();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
    startTimer(); // ⏳ Start the timer
}


function resetButton() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showScore() {
    resetButton();
    stopTimer();

    const passed = score >= questions.length / 2;

    if (passed) {
        questionElement.innerHTML = `🎉 You scored ${score} out of ${questions.length}!`;
        nextButton.style.display = 'none';
        exitButton.style.display = 'block'; // Show Exit button
    } else {
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}. Try again!`;
        nextButton.innerHTML = "🔁 Try Again";
        nextButton.style.display = 'block';
        exitButton.style.display = 'none';
    }
}



exitButton.addEventListener("click", () => {
    // Option 1: Redirect to another page
    window.location.href = "https://www.google.com"; // Replace with your destination

    // Option 2 (unreliable): Try to close tab
    // window.close();
});

function handleNextButton() {
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();
