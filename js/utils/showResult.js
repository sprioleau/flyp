export default function showResult({
	isCorrect,
	sounds,
	symbolElements,
	nextButtonElement,
}) {
	const message = isCorrect ? "Correct!" : "Incorrect. Try again.";

	if (isCorrect) {
		sounds.correct.play();
		nextButtonElement.style.opacity = 1;
		nextButtonElement.style.pointerEvents = "all";

		symbolElements.forEach((symbol) => {
			symbol.style.pointerEvents = "none";
			symbol.classList.add("faded");
		});
	} else {
		sounds.incorrect.play();
	}

	result.style.opacity = 1;

	result.innerText = message;
}
