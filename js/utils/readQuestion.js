export default function readQuestion({ question }) {
	window.speechSynthesis.speak(question);
}
