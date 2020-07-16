/* ID, CSS code, media */
type Style = [string, string, string];

function createStyleTag([, css, media]: Style) {
	const styleElement = document.createElement('style');

	if (media) {
		styleElement.setAttribute('media', media);
	}

	styleElement.appendChild(document.createTextNode(css));

	return styleElement;
}

function appendToIframes(styleElement: HTMLStyleElement) {
	document.querySelectorAll<HTMLIFrameElement>('[data-rsg-iframe]').forEach(iframe => {
		console.log('🐟', iframe, iframe.contentWindow?.document.head);
		iframe.contentWindow?.document.head.appendChild(styleElement.cloneNode(true));
	});
}

export default function addStyles(styles: Style[]) {
	console.log('🦉 add styles', styles);
	styles.forEach(item => {
		appendToIframes(createStyleTag(item));
	});
}
