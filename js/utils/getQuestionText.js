export default function getQuestionText(symbol) {
	const symbolIsLetter = /[A-Z]/g.test(symbol);
	return `Select ${symbolIsLetter ? "letter" : "number"} ${symbol}.`;
}
