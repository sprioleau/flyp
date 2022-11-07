export default function getRandomQuestion(options) {
	return options[Math.floor(Math.random() * options.length)];
}
