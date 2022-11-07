export default function varyBackgroundColor() {
	setInterval(() => {
		const backgroundColor = parseInt(
			getComputedStyle(document.documentElement).getPropertyValue("--hue")
		);
		document.documentElement.style.setProperty(
			"--hue",
			(backgroundColor + 5) % 360
		);
	}, 2000);
}
