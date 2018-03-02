/* eslint-disable import/first */

import './polyfills';
import './styles';
import ReactDOM from 'react-dom';
import renderStyleguide from './utils/renderStyleguide';
import { get } from 'lodash';

// Examples code revision to rerender only code examples (not the whole page) when code changes
// eslint-disable-next-line no-unused-vars
let codeRevision = 0;

const render = () => {
	// eslint-disable-next-line import/no-unresolved
	const styleguide = require('!!../loaders/styleguide-loader!./index.js');
	ReactDOM.render(renderStyleguide(styleguide, status), document.getElementById('app'));
	if (get(window, 'location.hash', '').startsWith('#!/')) {
		window.scrollTo(0, 0);
	}
};

window.addEventListener('hashchange', render);

/* istanbul ignore if */
if (module.hot) {
	module.hot.accept('!!../loaders/styleguide-loader!./index.js', () => {
		codeRevision += 1;
		render();
	});
}

render();
