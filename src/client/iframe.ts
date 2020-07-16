/* eslint-disable import/first */
import './polyfills';
import ReactDOM from 'react-dom';
import renderIframe, { ExamplesMap } from './utils/renderIframe';

// eslint-disable-next-line compat/compat
const url = new URL(location.href);
const file = url.searchParams.get('file') || undefined;
const exampleIndexRaw = url.searchParams.get('exampleIndex');
const exampleIndex = typeof exampleIndexRaw === 'string' ? parseInt(exampleIndexRaw) : undefined;

const render = () => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-unresolved
	const examples: ExamplesMap = require(`!!../loaders/iframe-loader!./iframe.js`);

	console.log(examples);
	ReactDOM.render(renderIframe({ examples, file, exampleIndex }), document.getElementById('root'));
};

/* istanbul ignore if */
if (module.hot) {
	module.hot.accept('!!../loaders/iframe-loader!./iframe.js', () => {
		console.log('HOT!');
		render();
	});
}

render();
