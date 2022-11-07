import questionOptions from "../questionOptions.js";
import getQuestionText from "./getQuestionText.js";
import getRandomQuestion from "./getRandomQuestion.js";
import readQuestion from "./readQuestion.js";

export default function showQuestion({
	symbolElements,
	questionElement,
	question,
}) {
	const [symbol1, symbol2] = symbolElements;
	let questionData = getRandomQuestion(questionOptions);

	while (recentQuestions.includes(questionData.id)) {
		questionData = getRandomQuestion(questionOptions);
	}

	question.text = getQuestionText(questionData.correct.symbol);
	questionElement.innerText = question.text;

	symbolElements.forEach((symbol) => {
		symbol.classList.remove("flipped");
		symbol.classList.remove("faded");
		symbol.dataset.correct = false;
		symbol.style.pointerEvents = "all";
	});

	if (Math.random() - 0.5 > 0) {
		symbol1.innerText = questionData.correct.symbol;
		symbol1.dataset.correct = true;
		symbol2.innerText = questionData.incorrect.symbol;
		if (questionData.incorrect.flipped) symbol2.classList.add("flipped");
	} else {
		symbol1.innerText = questionData.incorrect.symbol;
		symbol2.innerText = questionData.correct.symbol;
		symbol2.dataset.correct = true;
		if (questionData.incorrect.flipped) symbol1.classList.add("flipped");
	}

	readQuestion({
		question,
	});
}
