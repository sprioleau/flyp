import readQuestion from "./readQuestion.js";
import showQuestion from "./showQuestion.js";
import showResult from "./showResult.js";

export default function addListeners({
	symbolElements,
	speakIconElement,
	nextButtonElement,
	questionElement,
	resultElement,
	question,
	sounds,
}) {
	symbolElements.forEach((symbol) => {
		symbol.addEventListener("click", (e) => {
			showResult({
				isCorrect: e.target.dataset?.correct === "true",
				sounds,
				symbolElements,
				nextButtonElement,
			});
		});
	});

	speakIconElement.addEventListener("click", () => {
		readQuestion({ question });
	});

	nextButtonElement.addEventListener("click", () => {
		nextButtonElement.style.opacity = 0;
		nextButtonElement.style.pointerEvents = "none";
		resultElement.style.opacity = 0;

		showQuestion({ symbolElements, questionElement, question });
	});

	showQuestion({ symbolElements, questionElement, question });
}
