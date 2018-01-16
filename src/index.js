/* eslint-disable import/first */
import './polyfills';
import './styles';
import ReactDOM from 'react-dom';
import renderStyleguide from './utils/renderStyleguide';
import 'antd/dist/antd.css';
import './styles.scss';

// Examples code revision to rerender only code examples (not the whole page) when code changes
let codeRevision = 0;

const render = () => {
	// eslint-disable-next-line import/no-unresolved
	const styleguide = require('!!../loaders/styleguide-loader!./index.js');
	if (styleguide.config.useCustomScss) {
		try {
			require('../../../styleguide.scss');
		} catch(err) {
			console.log('no styleguide.scss found');
		}
	}
	ReactDOM.render(renderStyleguide(styleguide, codeRevision), document.getElementById('app'));
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
