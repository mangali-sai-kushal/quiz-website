const questions = [
  {
      question: "What is the capital of Andhra pradesh?",
      answers: ["Amaravathi", "kurnool", "kadapa", "nandyala"],
      correct: 0
  },
  {
      question: "Which planet is known as the Red Planet?",
      answers: ["Earth", "Jupiter", "Mars", "Saturn"],
      correct: 2
  },
  {
      question: "Who wrote 'Salaar'?",
      answers: ["ss rajamouli", "prasanth neel", "nag ashwin", "siva"],
      correct: 1
  },
  {
    question:"what is javasccript?",
    answers:["scripting language","used to style web pages","database","it is same like java"],
    correct:0
  },
  {
    question:"what is css?",
    answers:["scripting language","used to style web pages","database","it is same like java"],
    correct:1
  }
];

let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById('question');
const answerListEl = document.getElementById('answer-list');
const nextButton = document.getElementById('next-btn');
const feedbackEl = document.getElementById('feedback');
const resultEl = document.getElementById('result');
const finalScoreEl = document.getElementById('final-score');
const progressEl = document.getElementById('progress');
const restartButton = document.getElementById('restart-btn');

function startQuiz() {
  resultEl.classList.add('hide');
  currentQuestionIndex = 0;
  score = 0;
  nextButton.classList.add('hide');
  feedbackEl.classList.add('hide');
  showQuestion();
  updateProgress();
}

function showQuestion() {
  const currentQuestion = questions[currentIndex];
  questionEl.innerText = currentQuestion.question;
  answerListEl.innerHTML = '';
  currentQuestion.answers.forEach((answer, index) => {
      const answerButton = document.createElement('li');
      answerButton.innerText = answer;
      answerButton.addEventListener('click', () => selectAnswer(index));
      answerListEl.appendChild(answerButton);
  });
}

function selectAnswer(selectedIndex) {
  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedIndex === currentQuestion.correct;

  answerListEl.childNodes.forEach((answerButton, index) => {
      if (index === currentQuestion.correct) {
          answerButton.classList.add('correct');
      } else {
          answerButton.classList.add('wrong');
      }
  });

  if (isCorrect) {
      score++;
      feedbackEl.innerText = "Correct! go ahead";
  } else {
      feedbackEl.innerText = ` Oops Wrong! The correct answer is ${currentQuestion.answers[currentQuestion.correct]}`;
  }
  feedbackEl.classList.remove('hide');
  nextButton.classList.remove('hide');
}

function updateProgress() {
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;
  progressEl.style.width = `${progressPercent}%`;
}

nextButton.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex < questions.length) {
      nextButton.classList.add('hide');
      feedbackEl.classList.add('hide');
      showQuestion();
      updateProgress();
  } else {
      endQuiz();
  }
});

function endQuiz() {
  resultEl.classList.remove('hide');
  finalScoreEl.innerText = `${score} / ${questions.length}`;
}

restartButton.addEventListener('click', startQuiz);


startQuiz();
