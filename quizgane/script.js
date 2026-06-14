const questions = [
  {
    question: "who developed java?",
    options: ["james gosling", "larry ellison", "bill gates", "steve jobs"],
    answer: "james gosling",
  },
  {
    question: "which keyword is used for create the object?",
    options: ["new", "create", "make", "build"],
    answer: "new",
  },
  {
    question: "which method is the entry point of a java program?",
    options: ["main()", "start()", "run()", "init()"],
    answer: "main()",
  },
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionElement = document.getElementById("question");
const optionsE1 = document.getElementById("options");
const timerE1 = document.getElementById("timer");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progressE1 = document.getElementById("progress");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const scoreE1 = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");
const toggleThemeBtn = document.getElementById("toggle-theme");

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  showQuestion();
  updateProgress();
  quizBox.classList.remove("hidden");
  resultBox.classList.add("hidden");
}

function showQuestion() {
  resetState();

  const q = questions[currentQuestion];

  questionElement.innerText = q.question;

  q.options.forEach((option) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.classList.add("slide-option");

    li.addEventListener("click", () => {
      selectAnswer(li, q.answer);
    });

    optionsE1.appendChild(li);
  });

  prevBtn.disabled = currentQuestion === 0;
  nextBtn.disabled = true;

  resetTimer();
}

function selectAnswer(selectedLi, correctAnswer) {
  const options = optionsE1.querySelectorAll("li");

  options.forEach((option) => {
    option.classList.add("disabled");

    if (option.textContent === correctAnswer) {
      option.classList.add("correct");
    } else if (option === selectedLi && option.textContent !== correctAnswer) {
      option.classList.add("wrong");
    }
  });

  if (selectedLi.textContent === correctAnswer) {
    score++;
  }

  selectedLi.classList.add("selected");

  nextBtn.disabled = false;

  stopTimer();
}

function resetState() {
  clearInterval(timer);

  timeLeft = 15;

  timerE1.textContent = `Time Left: ${timeLeft}s`;

  optionsE1.innerHTML = "";
}

function resetTimer() {
  clearInterval(timer);

  timeLeft = 15;

  timerE1.textContent = `Time Left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;

    timerE1.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      autoselect();
    }
  }, 1000);
}

function autoselect() {
  const q = questions[currentQuestion];

  const options = optionsE1.querySelectorAll("li");

  options.forEach((option) => {
    option.classList.add("disabled");

    if (option.textContent === q.answer) {
      option.classList.add("correct");
    }
  });

  nextBtn.disabled = false;
}

function stopTimer() {
  clearInterval(timer);
}

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");

  scoreE1.textContent = `Your Score: ${score} / ${questions.length}`;
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
    updateProgress();
  } else {
    showResult();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
    updateProgress();
  }
});

restartBtn.addEventListener("click", () => {
  startQuiz();
});

toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

function updateProgress() {
  const progressPercent = ((currentQuestion + 1) / questions.length) * 100;

  progressE1.style.width = `${progressPercent}%`;
}

startQuiz();
