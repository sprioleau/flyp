export default function loadSounds() {
	const sounds = {};

	const correctSound = new Audio("sounds/correct-chime.mp3");
	const incorrectSound = new Audio("sounds/incorrect-chime.mp3");

	correctSound.addEventListener("canplaythrough", () => {
		sounds.correct = correctSound;
	});

	incorrectSound.addEventListener("canplaythrough", () => {
		sounds.incorrect = incorrectSound;
	});

	return sounds;
}
