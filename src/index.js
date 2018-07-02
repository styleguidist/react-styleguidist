/* eslint-disable import/first */
import './polyfills';
import './styles';
import ReactDOM from 'react-dom';
import renderStyleguide from './utils/renderStyleguide';

// Examples code revision to rerender only code examples (not the whole page) when code changes
// eslint-disable-next-line no-unused-vars
let codeRevision = 0;

/** Scrolls to origin when current window location hash points to an isolated view. */
const scrollToOrigin = () => {
	if (window.location.hash.indexOf('#!/') === 0) {
		window.scrollTo(0, 0);
	}
};

const render = () => {
	// eslint-disable-next-line import/no-unresolved
	const styleguide = require('!!../loaders/styleguide-loader!./index.js');
	let containerId = 'rsg-root';

	if (document.getElementById('app')) {
		// eslint-disable-next-line no-console
		console.warn(
			"The use of 'app' element id in the template is deprecated. Please, update your template file to use 'rsg-root' as the container id."
		);
		containerId = 'app';
	}

	ReactDOM.render(renderStyleguide(styleguide, codeRevision), document.getElementById(containerId));
};

window.addEventListener('hashchange', render);
window.addEventListener('hashchange', scrollToOrigin);

/* istanbul ignore if */
if (module.hot) {
	module.hot.accept('!!../loaders/styleguide-loader!./index.js', () => {
		codeRevision += 1;
		render();
	});
}

render();
