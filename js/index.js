import varyBackgroundColor from "./utils/varyBackgroundColor.js";
import addListeners from "./utils/addListeners.js";
import loadSounds from "./utils/loadSounds.js";

const
  symbols = document.querySelectorAll(".symbol"),
  result = document.getElementById("result"),
  questionElement = document.getElementById("question"),
  speakIcon = document.getElementById("speak-icon"),
  nextButton = document.getElementById("next-button");

const
  question = new SpeechSynthesisUtterance(),
  sounds = loadSounds();
  
window.recentQuestions = [];

addListeners({
  symbolElements: symbols,
  speakIconElement: speakIcon,
  nextButtonElement: nextButton,
  questionElement,
  resultElement: result,
  question,
  sounds,
  recentQuestions,
});

varyBackgroundColor();
