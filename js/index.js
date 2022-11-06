import questionOptions from "./questionOptions.js"

const [symbol1, symbol2] = document.querySelectorAll(".symbol");
const result = document.getElementById("result");
const questionElement = document.getElementById("question");
const speakIcon = document.getElementById("speak-icon");
const nextButton = document.getElementById("next-button");

let previousQuestionId = undefined;
let currentQuestionId = undefined;
let question = new SpeechSynthesisUtterance();

const sounds = loadSounds();

addListeners();
showQuestion();

function getRandomQuestion(options) {
  return options[Math.floor(Math.random() * options.length)]
}

function showResult(isCorrect) {
  const message = isCorrect ? "Correct!" : "Incorrect. Try again.";
  
  if (isCorrect) {
    sounds.correct.play();
    nextButton.style.display = "block";
    [symbol1, symbol2].forEach((symbol) => {
      symbol.style.pointerEvents = "none";
      symbol.classList.add("faded");
    })
  } else {
    sounds.incorrect.play();
  }

  previousQuestionId = currentQuestionId;

  result.style.display = "block";
  
  result.innerText = message;
}

function isLetter(symbol) {
  return /[A-Z]/g.test(symbol)
}

function loadSounds() {
  const sounds = {};
  
  const correctSound = new Audio("sounds/correct-chime.mp3");
  const incorrectSound = new Audio("sounds/incorrect-chime.mp3");
  
  correctSound.addEventListener("canplaythrough", () => {
    sounds.correct = correctSound;
  })
  
  incorrectSound.addEventListener("canplaythrough", () => {
    sounds.incorrect = incorrectSound;
  })

  return sounds;
}

function addListeners() {
  [symbol1, symbol2].forEach((symbol) => {
    symbol.addEventListener("click", (e) => {
      showResult(e.target.dataset?.correct === "true");
    })
  })

  speakIcon.addEventListener("click", () => {
    readQuestion();
  })

  nextButton.addEventListener("click", () => {
    nextButton.style.display = "none";
    result.style.display = "none";
    showQuestion()
  })
}

function getQuestionText(symbol) {
  return `Select ${isLetter(symbol) ? "letter" : "number"} ${symbol}.`;
}

function showQuestion() {
  let questionData = getRandomQuestion(questionOptions);

  while (questionData.id === previousQuestionId) {
    questionData = getRandomQuestion(questionOptions);
  }

  currentQuestionId = questionData.id;

  question.text = getQuestionText(questionData.correct.symbol);
  questionElement.innerText = question.text;

  [symbol1, symbol2].forEach((symbol) => {
    symbol.classList.remove("flipped");
    symbol.classList.remove("faded");
    symbol.dataset.correct = false;
    symbol.style.pointerEvents = "all";
  })

  if (Math.random() - 0.5 > 0) {
    symbol1.innerText = questionData.correct.symbol;
    symbol1.dataset.correct = true;
    symbol2.innerText = questionData.incorrect.symbol;
    if (questionData.incorrect.flipped) symbol2.classList.add("flipped")
  } else {
    symbol1.innerText = questionData.incorrect.symbol;
    symbol2.innerText = questionData.correct.symbol;
    symbol2.dataset.correct = true;
    if (questionData.incorrect.flipped) symbol1.classList.add("flipped")
  }

  readQuestion()
}

function readQuestion() {
  speechSynthesis.speak(question)
}